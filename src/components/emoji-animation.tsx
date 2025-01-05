"use client";

import { motion } from "framer-motion";

interface EmojiAnimationProps {
  emojis: string[];
  className?: string;
}

export function EmojiAnimation({
  emojis,
  className = "",
}: EmojiAnimationProps) {
  return (
    <div className={`mt-8 ${className}`}>
      {emojis.map((emoji, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, type: "spring" }}
          className="inline-block mx-1"
        >
          {emoji}
        </motion.span>
      ))}
    </div>
  );
}
