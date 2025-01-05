"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Cake, Heart } from 'lucide-react'

export default function BirthdayCountdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false)
  const [currentEmoji, setCurrentEmoji] = useState('🎂')

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = getTimeLeft()
      setTimeLeft(newTimeLeft)

      if (newTimeLeft.total <= 0) {
        clearInterval(timer)
        setShowBirthdayMessage(true)
        
        // Show birthday message for 1 minute (60000 ms)
        setTimeout(() => {
          setShowBirthdayMessage(false)
        }, 60000)
      }

      // Update emoji based on time left
      setCurrentEmoji(getEmojiForTimeLeft(newTimeLeft.total))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // For demonstration purposes, add a button to toggle the birthday message
  const toggleBirthdayMessage = () => {
    setShowBirthdayMessage(prev => !prev)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-pink-400 flex flex-col items-center justify-center text-pink-800 p-4">
      <AnimatePresence mode="wait">
        {!showBirthdayMessage ? (
          <motion.div
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-8">Countdown to Your Special Day</h1>
            <motion.div
              key={currentEmoji}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-6xl md:text-8xl mb-8"
              aria-hidden="true"
            >
              {currentEmoji}
            </motion.div>
            <div className="flex flex-wrap justify-center gap-4 text-3xl md:text-5xl mb-8">
              <CountdownUnit value={timeLeft.days} label="Days" />
              <CountdownUnit value={timeLeft.hours} label="Hours" />
              <CountdownUnit value={timeLeft.minutes} label="Minutes" />
              <CountdownUnit value={timeLeft.seconds} label="Seconds" />
            </div>
            <Button onClick={toggleBirthdayMessage} className="bg-pink-600 hover:bg-pink-700 text-white">
              <Cake className="mr-2 h-4 w-4" /> Preview Birthday Message
            </Button>
          </motion.div>
        ) : (
          <BirthdayMessage onClose={toggleBirthdayMessage} />
        )}
      </AnimatePresence>
    </div>
  )
}

function CountdownUnit({ value, label }: { value: number, label: string }) {
  return (
    <div className="flex flex-col items-center bg-pink-100 rounded-lg p-4 shadow-md">
      <span className="font-bold text-4xl md:text-5xl">{value}</span>
      <span className="text-sm md:text-base">{label}</span>
    </div>
  )
}

function BirthdayMessage({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h1 className="text-5xl md:text-7xl font-bold mb-8 text-pink-800">
        Happy Birthday My Love!
      </h1>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="space-y-8"
      >
        <p className="text-2xl md:text-3xl text-pink-700">
          May your day be as beautiful and special as you are!
        </p>
        <div className="flex justify-center">
          <Heart className="text-pink-600 h-24 w-24 animate-pulse" />
        </div>
        <Button onClick={onClose} className="bg-pink-600 hover:bg-pink-700 text-white">
          Back to Countdown
        </Button>
      </motion.div>
    </motion.div>
  )
}

function getTimeLeft() {
  const now = new Date()
  const targetDate = new Date(now.getFullYear(), 0, 6) // January 6th
  targetDate.setHours(0, 0, 0, 0) // Set to midnight

  if (now > targetDate) {
    targetDate.setFullYear(targetDate.getFullYear() + 1)
  }

  const total = Number(targetDate) - Number(now)
  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / 1000 / 60) % 60)
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const days = Math.floor(total / (1000 * 60 * 60 * 24))

  return { total, days, hours, minutes, seconds }
}

function getEmojiForTimeLeft(timeLeft: number) {
  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
  
  if (daysLeft > 30) return '🎂'
  if (daysLeft > 14) return '🎉'
  if (daysLeft > 7) return '🎈'
  if (daysLeft > 3) return '🎁'
  if (daysLeft > 1) return '💖'
  if (daysLeft > 0) return '😍'
  return '🥳'
}

