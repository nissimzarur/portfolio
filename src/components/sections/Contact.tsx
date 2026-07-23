'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, Phone, MapPin, FileText, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { portfolioData } from '@/data/portfolio';
import { Button } from '@/components/ui/Button';
import { SectionContainer } from '@/components/ui/SectionContainer';
import { SplitText } from '@/components/animations/SplitText';
import { MagneticElement } from '@/components/animations/MagneticElement';

type Intent = 'hiring' | 'project';
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function Contact() {
  const searchParams = useSearchParams();
  const { personal } = portfolioData;
  const successRef = useRef<HTMLDivElement>(null);

  const [intent, setIntent] = useState<Intent>('hiring');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<string[]>([]);
  const [activeField, setActiveField] = useState<string | null>(null);

  useEffect(() => {
    const intentParam = searchParams.get('intent');
    if (intentParam === 'hiring' || intentParam === 'project') {
      setIntent(intentParam);
    }
  }, [searchParams]);

  // Success animation
  useEffect(() => {
    if (status === 'success' && successRef.current) {
      gsap.from(successRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
      });
    }
  }, [status]);

  const validate = (): string[] => {
    const errs: string[] = [];
    if (!name.trim()) errs.push('Name is required');
    if (!email.trim()) errs.push('Email is required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.push('Invalid email format');
    if (!message.trim()) errs.push('Message is required');
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intent,
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          message: message.trim(),
          budget: budget || undefined,
          timeline: timeline || undefined,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setCompany('');
        setMessage('');
        setBudget('');
        setTimeline('');
      } else {
        const data = await res.json().catch(() => ({}));
        setErrors(data.errors || ['Something went wrong. Please try again.']);
        setStatus('error');
      }
    } catch {
      setErrors(['Network error. Please try again or email me directly.']);
      setStatus('error');
    }
  };

  const subheading =
    intent === 'hiring'
      ? "I'd love to discuss how I can contribute to your team"
      : intent === 'project'
        ? "Tell me about your project and let's explore how I can help"
        : "Whether you're hiring or have a project in mind, I'd love to hear from you";

  const fieldGlowClass = (fieldName: string) =>
    activeField === fieldName
      ? 'form-input ring-1 ring-amber/50 shadow-[0_0_12px_rgba(232,168,69,0.15)]'
      : 'form-input';

  return (
    <SectionContainer id="contact">
      <SplitText
        variant="words-up"
        tag="h2"
        className="font-display text-3xl md:text-4xl font-bold text-primary"
      >
        {"Let's Work Together"}
      </SplitText>
      <SplitText
        variant="lines-up"
        tag="p"
        className="mt-3 text-secondary text-lg max-w-2xl"
        delay={0.1}
      >
        {subheading}
      </SplitText>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Intent toggle */}
            <div className="flex gap-2">
              <IntentButton
                active={intent === 'hiring'}
                onClick={() => setIntent('hiring')}
              >
                I&apos;m Hiring
              </IntentButton>
              <IntentButton
                active={intent === 'project'}
                onClick={() => setIntent('project')}
              >
                I Have a Project
              </IntentButton>
            </div>

            <FormField label="Name" required>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setActiveField('name')}
                onBlur={() => setActiveField(null)}
                maxLength={100}
                className={fieldGlowClass('name')}
                placeholder="Your name"
              />
            </FormField>

            <FormField label="Email" required>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setActiveField('email')}
                onBlur={() => setActiveField(null)}
                className={fieldGlowClass('email')}
                placeholder="you@company.com"
              />
            </FormField>

            <FormField label="Company">
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                onFocus={() => setActiveField('company')}
                onBlur={() => setActiveField(null)}
                maxLength={100}
                className={fieldGlowClass('company')}
                placeholder="Company name (optional)"
              />
            </FormField>

            <FormField label="Message" required>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setActiveField('message')}
                onBlur={() => setActiveField(null)}
                maxLength={2000}
                rows={5}
                className={`${fieldGlowClass('message')} resize-y min-h-[120px]`}
                placeholder={
                  intent === 'hiring'
                    ? "Tell me about the role, team, and what you're looking for..."
                    : 'Describe your project, goals, and timeline...'
                }
              />
            </FormField>

            {intent === 'project' && (
              <>
                <FormField label="Budget Range">
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    onFocus={() => setActiveField('budget')}
                    onBlur={() => setActiveField(null)}
                    className={fieldGlowClass('budget')}
                  >
                    <option value="">Select (optional)</option>
                    <option value="under-5k">Under $5K</option>
                    <option value="5k-15k">$5K – $15K</option>
                    <option value="15k-50k">$15K – $50K</option>
                    <option value="50k-plus">$50K+</option>
                    <option value="discuss">Let&apos;s discuss</option>
                  </select>
                </FormField>

                <FormField label="Timeline">
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    onFocus={() => setActiveField('timeline')}
                    onBlur={() => setActiveField(null)}
                    className={fieldGlowClass('timeline')}
                  >
                    <option value="">Select (optional)</option>
                    <option value="asap">ASAP</option>
                    <option value="1-3m">1–3 months</option>
                    <option value="3-6m">3–6 months</option>
                    <option value="6m-plus">6+ months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </FormField>
              </>
            )}

            {errors.length > 0 && (
              <div className="flex items-start gap-2 text-error text-sm">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <ul className="space-y-1">
                  {errors.map((err) => (
                    <li key={err}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {status === 'success' ? (
              <div ref={successRef} className="flex items-center gap-2 text-success text-sm p-4 rounded-lg bg-success/10 border border-success/20">
                <CheckCircle2 size={18} />
                <span>Message sent! I&apos;ll get back to you soon.</span>
              </div>
            ) : (
              <MagneticElement>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={18} className="animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </MagneticElement>
            )}
          </form>
        </div>

        {/* Contact info */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <h3 className="font-display text-lg font-semibold text-primary">
              Direct Contact
            </h3>
            <div className="space-y-4">
              <ContactItem icon={<Mail size={18} />} label="Email">
                <a
                  href={`mailto:${personal.email}`}
                  className="text-amber hover:text-amber-hover transition-colors"
                >
                  {personal.email}
                </a>
              </ContactItem>
              <ContactItem icon={<Phone size={18} />} label="Phone">
                <a
                  href={`tel:${personal.phone}`}
                  className="text-secondary hover:text-primary transition-colors"
                >
                  {personal.phone}
                </a>
              </ContactItem>
              <ContactItem icon={<MapPin size={18} />} label="Location">
                <span className="text-secondary">{personal.location}</span>
              </ContactItem>
            </div>

            <div className="pt-4 border-t border-subtle">
              <MagneticElement>
                <Button
                  variant="secondary"
                  href="/docs/nissim-resume.pdf"
                  className="w-full justify-center"
                >
                  <FileText size={18} className="mr-2" />
                  Download Resume
                </Button>
              </MagneticElement>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

function IntentButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all min-h-[48px] cursor-pointer ${
        active
          ? 'bg-amber text-deep'
          : 'bg-elevated text-secondary border border-subtle hover:border-amber/30'
      }`}
    >
      {children}
    </button>
  );
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-primary mb-1.5">
        {label}
        {required && <span className="text-amber ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function ContactItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-muted">{icon}</div>
      <div>
        <p className="text-xs text-muted">{label}</p>
        {children}
      </div>
    </div>
  );
}
