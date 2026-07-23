'use client';

import { type ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export interface ExpandableDetailProps {
  summary: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ExpandableDetail({
  summary,
  children,
  defaultOpen = false,
}: ExpandableDetailProps) {
  const [isExpanded, setIsExpanded] = useState(defaultOpen);

  return (
    <div className="border border-subtle rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-primary font-body font-medium bg-surface hover:bg-elevated transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
      >
        <span>{summary}</span>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: customEase }}
          className="flex-shrink-0 ml-2"
        >
          <ChevronDown className="h-5 w-5 text-secondary" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: customEase }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 text-secondary font-body border-t border-subtle bg-surface">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

