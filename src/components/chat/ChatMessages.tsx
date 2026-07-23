'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as ScrollArea from '@radix-ui/react-scroll-area';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatMessagesProps {
  messages: Message[];
  isStreaming: boolean;
}

export function ChatMessages({ messages, isStreaming }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <ScrollArea.Root className="h-full">
      <ScrollArea.Viewport className="h-full px-4 py-4" role="log" aria-live="polite">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-3 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-amber/10 text-primary ml-8'
                    : 'bg-elevated text-primary mr-8'
                }`}
              >
                <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                {isStreaming &&
                  msg.role === 'assistant' &&
                  i === messages.length - 1 && (
                    <span className="inline-block w-1.5 h-4 bg-amber ml-0.5 animate-pulse" />
                  )}
              </div>
            </motion.div>
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="w-1.5 bg-transparent"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="rounded-full bg-subtle" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
