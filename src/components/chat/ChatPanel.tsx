'use client';

import { useState, useCallback } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { SuggestedQuestions } from './SuggestedQuestions';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatPanel() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      if (isStreaming || !content.trim()) return;

      const userMessage: Message = { role: 'user', content: content.trim() };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsStreaming(true);
      setError(null);

      // Add empty assistant message for streaming
      const assistantMessage: Message = { role: 'assistant', content: '' };
      setMessages([...updatedMessages, assistantMessage]);

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000);

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: content.trim(),
            history: updatedMessages.slice(-10),
          }),
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          if (res.status === 429) {
            throw new Error(
              "You've sent several messages quickly. Please wait a moment."
            );
          }
          if (res.status === 503) {
            throw new Error(
              'The AI assistant is being set up. Please try again later or use the contact form.'
            );
          }
          throw new Error(data.error || 'Something went wrong. Please try again.');
        }

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) throw new Error('No response stream');

        let accumulated = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: 'assistant',
              content: accumulated,
            };
            return updated;
          });
        }
      } catch (err) {
        const message =
          err instanceof Error
            ? err.name === 'AbortError'
              ? 'Response took too long. Please try a shorter question.'
              : err.message
            : 'Something went wrong. Please try again.';
        setError(message);
        // Remove the empty assistant message
        setMessages((prev) => {
          if (prev.length > 0 && prev[prev.length - 1].content === '') {
            return prev.slice(0, -1);
          }
          return prev;
        });
      } finally {
        setIsStreaming(false);
      }
    },
    [messages, isStreaming]
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* Trigger button */}
      <Dialog.Trigger asChild>
        <motion.button
          className="fixed bottom-20 right-4 lg:bottom-8 lg:right-8 z-50 flex items-center gap-2 bg-amber text-deep font-semibold rounded-full px-4 py-3 shadow-glow hover:bg-amber-hover transition-colors cursor-pointer min-h-[48px]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, type: 'spring', stiffness: 200 }}
          aria-label="Open AI assistant"
        >
          <MessageSquare size={20} />
          <span className="hidden lg:inline text-sm">Ask AI</span>
        </motion.button>
      </Dialog.Trigger>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/50 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-surface/95 backdrop-blur-xl border-l border-subtle flex flex-col"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              >
                <VisuallyHidden.Root>
                  <Dialog.Title>Portfolio AI Assistant</Dialog.Title>
                  <Dialog.Description>Ask questions about Nissim&apos;s experience and skills</Dialog.Description>
                </VisuallyHidden.Root>

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-subtle">
                  <h2 className="font-display text-lg font-semibold text-primary">
                    Portfolio Assistant
                  </h2>
                  <Dialog.Close asChild>
                    <button
                      className="p-2 text-muted hover:text-primary transition-colors rounded-lg hover:bg-elevated cursor-pointer"
                      aria-label="Close assistant"
                    >
                      <X size={18} />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-hidden">
                  {messages.length === 0 ? (
                    <div className="p-4 space-y-4">
                      <p className="text-secondary text-sm">
                        Hi! I&apos;m Nissim&apos;s portfolio assistant. Ask me
                        anything about his experience, skills, or how he can help
                        with your needs.
                      </p>
                      <SuggestedQuestions onSelect={sendMessage} />
                    </div>
                  ) : (
                    <ChatMessages messages={messages} isStreaming={isStreaming} />
                  )}
                </div>

                {/* Error */}
                {error && (
                  <div className="px-4 py-2 text-sm text-error bg-error/10 border-t border-error/20">
                    {error}
                  </div>
                )}

                {/* Input */}
                <ChatInput onSend={sendMessage} disabled={isStreaming} />
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
