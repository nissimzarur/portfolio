'use client';

import { useState, useRef, useCallback } from 'react';
import { SendHorizontal } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxLength = 1000;

  const handleSend = useCallback(() => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [value, disabled, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    // Auto-grow
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 96) + 'px'; // max 3 lines ~96px
  };

  return (
    <div className="border-t border-subtle px-4 py-3">
      <div className="flex items-end gap-2">
        <label className="sr-only" htmlFor="chat-input">
          Ask about Nissim&apos;s experience
        </label>
        <textarea
          ref={textareaRef}
          id="chat-input"
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          maxLength={maxLength}
          rows={1}
          disabled={disabled}
          placeholder="Ask about Nissim's experience..."
          className="flex-1 bg-elevated border border-subtle rounded-lg px-3 py-2.5 text-sm text-primary placeholder:text-muted resize-none focus:outline-none focus:border-amber transition-colors disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          aria-label="Send message"
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber text-deep disabled:opacity-30 hover:bg-amber-hover transition-colors cursor-pointer disabled:cursor-default"
        >
          <SendHorizontal size={18} />
        </button>
      </div>
      {value.length > 800 && (
        <p className="text-xs text-muted mt-1 text-right">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
}
