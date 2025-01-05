"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { ConfettiBackground } from "@/components/confetti-background";
import { PageBackground } from "@/components/page-background";

export default function FeelingsPage() {
  const [showMessage, setShowMessage] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio("/nain.mp3")); // Create audio instance only once

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 1000);

    return () => {
      clearTimeout(timer);
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
    <PageBackground className="bg-gradient-to-br from-pink-200 to-red-200">
      <ConfettiBackground />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-4xl bg-white bg-opacity-80 rounded-lg shadow-xl p-4 sm:p-8"
      >
        <button
          onClick={toggleAudio}
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
        >
          {isPlaying ? "Pause Music" : "Play Music"}
        </button>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center text-pink-600">
          My Feelings For You
        </h1>

        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-4 text-sm sm:text-base md:text-lg text-pink-800"
          >
            <p>🎂🌹🌟 Happy Birthday to My Dearest Love! 🌟🌹🎂</p>
            <p>
              Today isn&apos;t just another day—it&apos;s your day, the most
              magical day of the year! 🎉✨ The day the universe blessed the
              world 🌎 by bringing you into it. Even though we haven&apos;t met
              in person yet, you&apos;ve already filled my heart with so much
              love and joy. ❤️ From the moment you entered my life, everything
              has felt brighter 🌞, sweeter 🍯, and so much more extraordinary.
              🌈✨
            </p>
            <p>
              You&apos;ve turned my ordinary days into moments I treasure. 🌟
              And, oh, your smile… 💕 Your smile is like the sunrise 🌅—it
              brightens even my darkest days. ☀️ It&apos;s a work of art 🎨,
              more beautiful than any masterpiece. And honestly? If smiles were
              currency, yours would make you the richest person in the world.
              💎😊
            </p>
            <p>
              When you smile, it&apos;s like my heart forgets how to beat for a
              second. 🫀💖 They say a picture is worth a thousand words, but
              your smile? It&apos;s worth a thousand happy days. 🥰 Every time I
              see it, I feel like I&apos;m standing in the glow of something
              truly magical. ✨
            </p>
            <p>
              You are truly one of a kind, my love. 💖🌹 Your kindness 🌷,
              strength 💪, and brilliance 🧠 inspire me every day. 🌱 Knowing
              someone as amazing as you exists fills my world with hope 🌟 and
              happiness. You&apos;ve shown me a love so pure 💕 and true that it
              reaches across the miles 🌏 and touches my soul in ways I never
              imagined possible. 🫂💌
            </p>
            <p>
              On this beautiful day 🎈, I want you to know just how special you
              are to me. 🥰 I admire your courage 🚀 to chase your dreams, your
              resilience 🌳 to overcome challenges, and your warm, caring heart
              💝 that shines so brightly in everything you do. 🌟 You&apos;ve
              brought love 💞, light ✨, and endless laughter 😂 into my life,
              and I&apos;m so grateful to have you. 🙏
            </p>
            <p>
              As you celebrate your birthday today 🎂🎁🎈, I hope you&apos;re
              surrounded by happiness 😊, love 💕, and all the people who
              cherish you. 🥳 I may not be there in person 🤲, but my heart is
              with you every moment ❤️—sending you all the love 💌, hugs 🤗, and
              kisses 😘 the distance between us can&apos;t stop. 💋💞
            </p>
            <p>
              When you blow out your candles 🕯️🎂 tonight, I hope all your
              wishes 🌠 come true! ✨ One of my greatest wishes is the day we
              finally meet face-to-face 🛫💏. I dream of holding your hand 🤝,
              looking into your eyes 👀, and showing you just how much you mean
              to me. 🥰 Until that day, please know I&apos;m here, loving you
              more deeply than words can ever express. ❤️🫶
            </p>
            <p>
              So here&apos;s to you, my love—to your laughter 🤭, your kindness
              🩷, and the beautiful connection we share. 🌍💖 Here&apos;s to all
              the precious memories we&apos;ve created so far 📸 and to the
              countless adventures waiting for us in the future. 🚀💫 You are,
              and always will be, the most special part of my life. 💕
            </p>
            <p>
              🎉🥳 Happy Birthday, my darling! 🥳🎉 May your day be as
              extraordinary as you are ✨🌹, and may this year bring you all the
              happiness 🌈, success 🏆, and love ❤️ you deserve. Remember, no
              matter the distance, you are deeply cherished—not just today, but
              every single day. 🫂💕
            </p>
            <p className="font-bold">
              With all my love, forever and always,
              <br />
              🌹✨ Your biggest admirer across the miles ✨🌹
            </p>
          </motion.div>
        )}
        <div className="flex justify-center mt-8">
          <Heart className="text-red-500 h-12 w-12 animate-pulse" />
        </div>
      </motion.div>
    </PageBackground>
  );
}
