"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ConfettiBackground } from "@/components/confetti-background";
import { EmojiAnimation } from "@/components/emoji-animation";
import { CountdownUnit } from "@/components/countdown-unit";
import { PageBackground } from "@/components/page-background";

const emojis = "🎉🎈🎊🎁✨💖🥳🍰🎂🍾🥂👑🌟✨🎵🎶";

export default function CountdownPage() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [currentEmoji, setCurrentEmoji] = useState("🎂");
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = getTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.total <= 0) {
        clearInterval(timer);
        setShowConfetti(true);
        setTimeout(() => router.push("/birthday"), 3000);
      }

      setCurrentEmoji(getEmojiForTimeLeft(newTimeLeft.total));
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <PageBackground className="bg-gradient-to-br from-pink-200 to-pink-400">
      {showConfetti && <ConfettiBackground />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center relative w-full max-w-4xl px-4"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
          Countdown to Your Special Day
        </h1>

        <motion.div
          key={currentEmoji}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-8"
          aria-hidden="true"
        >
          {currentEmoji}
        </motion.div>
        <div className="flex flex-wrap justify-center gap-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-8">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>
        <EmojiAnimation
          emojis={[...emojis]}
          className="text-2xl sm:text-3xl md:text-4xl"
        />
      </motion.div>
    </PageBackground>
  );
}

function getTimeLeft() {
  const now = new Date();
  const targetDate = new Date(now.getFullYear(), 0, 6); // January 6th
  targetDate.setHours(0, 0, 0, 0); // Set to midnight

  if (now > targetDate) {
    targetDate.setFullYear(targetDate.getFullYear() + 1);
  }

  const total = Number(targetDate) - Number(now);
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
}

function getEmojiForTimeLeft(timeLeft: number) {
  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

  if (daysLeft > 30) return "🎂";
  if (daysLeft > 14) return "🎉";
  if (daysLeft > 7) return "🎈";
  if (daysLeft > 3) return "🎁";
  if (daysLeft > 1) return "💖";
  if (daysLeft > 0) return "😍";
  return "🥳";
}
