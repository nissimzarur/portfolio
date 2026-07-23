import { rateLimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';

export const runtime = 'nodejs';

interface ContactPayload {
  intent: 'hiring' | 'project';
  name: string;
  email: string;
  company?: string;
  message: string;
  budget?: string;
  timeline?: string;
}

export async function POST(req: Request) {
  try {
    // Rate limiting: 5 submissions per hour per IP
    const headersList = await headers();
    const ip =
      headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      headersList.get('x-real-ip') ||
      'anonymous';

    const { success } = rateLimit(ip, 5, 60 * 60 * 1000);
    if (!success) {
      return Response.json(
        {
          success: false,
          errors: ['Too many submissions. Please try again later.'],
        },
        { status: 429 }
      );
    }

    const body: ContactPayload = await req.json();
    const errors: string[] = [];

    // Validation
    if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
      errors.push('Name is required.');
    } else if (body.name.trim().length > 100) {
      errors.push('Name must be under 100 characters.');
    }

    if (!body.email || typeof body.email !== 'string') {
      errors.push('Email is required.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
      errors.push('Invalid email format.');
    }

    if (!body.message || typeof body.message !== 'string' || body.message.trim().length === 0) {
      errors.push('Message is required.');
    } else if (body.message.trim().length > 2000) {
      errors.push('Message must be under 2000 characters.');
    }

    if (body.intent !== 'hiring' && body.intent !== 'project') {
      errors.push('Intent must be "hiring" or "project".');
    }

    if (errors.length > 0) {
      return Response.json({ success: false, errors }, { status: 400 });
    }

    // Log the submission (development fallback)
    // TODO: Replace with Resend, SendGrid, or similar email service for production
    console.log(
      `[Contact Form] Intent: ${body.intent} | Name: ${body.name.trim()} | Email: ${body.email.trim()} | Company: ${body.company?.trim() || 'N/A'} | Message: ${body.message.trim().substring(0, 100)}...`
    );

    return Response.json({
      success: true,
      message:
        'Message received! (Development mode — email delivery will be connected before launch.)',
    });
  } catch (error) {
    console.error('[Contact API Error]', error);
    return Response.json(
      {
        success: false,
        errors: ['Something went wrong. Please try again.'],
      },
      { status: 500 }
    );
  }
}
