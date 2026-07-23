import { getOpenAI, MODEL } from '@/lib/openai';
import { buildSystemPrompt } from '@/lib/chat-system-prompt';
import { chatKnowledge } from '@/data/chat-knowledge';
import { rateLimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // Rate limiting
    const headersList = await headers();
    const ip =
      headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      headersList.get('x-real-ip') ||
      'anonymous';

    const { success } = rateLimit(ip, 10, 60_000);
    if (!success) {
      return Response.json(
        { error: "You've sent several messages quickly. Please wait a moment." },
        { status: 429 }
      );
    }

    // Check API key
    const openai = getOpenAI();
    if (!openai) {
      return Response.json(
        { error: 'AI assistant is being configured.' },
        { status: 503 }
      );
    }

    // Parse and validate body
    const body = await req.json();
    const { message, history } = body;

    if (typeof message !== 'string' || message.trim().length === 0) {
      return Response.json(
        { error: 'Message is required.' },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return Response.json(
        { error: 'Message is too long. Maximum 1000 characters.' },
        { status: 400 }
      );
    }

    // Build messages
    const systemPrompt = buildSystemPrompt(chatKnowledge);
    const conversationHistory = Array.isArray(history)
      ? history
          .slice(-10)
          .filter(
            (m: { role: string; content: string }) =>
              (m.role === 'user' || m.role === 'assistant') &&
              typeof m.content === 'string'
          )
          .map((m: { role: string; content: string }) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content.slice(0, 1000),
          }))
      : [];

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...conversationHistory,
      { role: 'user' as const, content: message.trim() },
    ];

    // Call OpenAI
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 28000);

    const response = await openai.chat.completions.create(
      {
        model: MODEL,
        messages,
        max_tokens: 500,
        stream: true,
      },
      { signal: controller.signal }
    );

    clearTimeout(timeout);

    // Stream the response
    const stream = new ReadableStream({
      async start(streamController) {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              streamController.enqueue(new TextEncoder().encode(content));
            }
          }
        } catch {
          // Stream interrupted — close gracefully
        } finally {
          streamController.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('[Chat API Error]', error);
    return Response.json(
      { error: 'Something went wrong. Please try again or use the contact form.' },
      { status: 500 }
    );
  }
}
