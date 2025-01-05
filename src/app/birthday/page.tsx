"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import { ConfettiBackground } from "@/components/confetti-background";
import { EmojiAnimation } from "@/components/emoji-animation";
import { PageBackground } from "@/components/page-background";

const emojis = "🎉🎈🎊🎁💖🥳🍰🎂🍾🥂👑🌟✨🎵🎶💃🕺🎸🎷🎺🎹🎨🎭🎬🏆🥇🎯🎰🃏🎴🎊";

export default function BirthdayPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio("/happy-birthday.mp3")); // Create audio instance only once

  useEffect(() => {
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.loop = true;
      audio.play().catch((error) => {
        console.log("Autoplay failed: ", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <PageBackground className="bg-gradient-to-br from-pink-400 to-red-300">
      <ConfettiBackground />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center relative w-full max-w-4xl px-4"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-pink-800">
          Happy Birthday My Love!
        </h1>
        <button
          onClick={toggleAudio}
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
        >
          {isPlaying ? "Pause Music" : "Play Music"}
        </button>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <Image
            src="/balloon-left.svg"
            alt="Balloon"
            width={100}
            height={200}
            className="absolute top-0 left-0 animate-float w-16 sm:w-24 md:w-32"
          />
          <Image
            src="/balloon-right.svg"
            alt="Balloon"
            width={100}
            height={200}
            className="absolute top-0 right-0 animate-float-delay w-16 sm:w-24 md:w-32"
          />
          <Image
            src="/cake-left.svg"
            alt="Cake"
            width={100}
            height={100}
            className="absolute bottom-0 left-0 animate-bounce w-16 sm:w-24 md:w-32"
          />
          <Image
            src="/cake-right.svg"
            alt="Cake"
            width={100}
            height={100}
            className="absolute bottom-0 right-0 animate-bounce-delay w-16 sm:w-24 md:w-32"
          />
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-8"
        >
          <p className="text-xl sm:text-2xl md:text-3xl text-pink-700">
            May your day be as beautiful and special as you are!
          </p>
          <div className="flex justify-center">
            <Heart className="text-pink-600 h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Image
              src="/first.jpeg"
              alt="Birthday Image 1"
              width={400}
              height={300}
              className="rounded-lg shadow-lg mx-auto w-full max-w-md"
            />
            <Image
              src="/second.jpeg"
              alt="Birthday Image 2"
              width={400}
              height={300}
              className="rounded-lg shadow-lg mx-auto w-full max-w-md"
            />
          </div>
          <EmojiAnimation
            emojis={[...emojis]}
            className="text-2xl sm:text-3xl md:text-4xl"
          />
        </motion.div>
      </motion.div>
    </PageBackground>
  );
}