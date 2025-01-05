"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Heart } from "lucide-react";
import { ConfettiBackground } from "@/components/confetti-background";
import { EmojiAnimation } from "@/components/emoji-animation";
import { PageBackground } from "@/components/page-background";

const emojis = "🎉🎈🎊🎁💖🥳🍰🎂🍾🥂👑🌟✨🎵🎶💃🕺🎸🎷🎺🎹";

export default function SurprisePage() {
  const [showImage, setShowImage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 2000);

    const navigationTimer = setTimeout(() => {
      router.push("/birthday");
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearTimeout(navigationTimer);
    };
  }, [router]);

  return (
    <PageBackground className="bg-gradient-to-br from-pink-300 to-purple-400">
      <ConfettiBackground />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center relative w-full max-w-4xl"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
          Get Ready for a Surprise!
        </h1>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
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
        {showImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/placeholder.svg"
              alt="Surprise Image 1"
              width={400}
              height={300}
              className="rounded-lg shadow-lg mx-auto w-full max-w-md"
            />
          </motion.div>
        )}
        <EmojiAnimation
          emojis={[...emojis]}
          className="text-xl sm:text-2xl md:text-3xl"
        />
        <Link href="/feelings" className="mt-8 inline-block">
          <button className="bg-[#9D174D] hover:bg-red-600 text-white text-lg sm:text-xl py-2 px-6 flex items-center">
            <Heart className="mr-2 h-4 w-4" /> Read My Heartfelt Message
          </button>
        </Link>
      </motion.div>
    </PageBackground>
  );
}
