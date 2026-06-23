'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
// import RadioPlayerWrapper from './components/RadioPlayerWrapper'
import Shelf from './components/Shelf'
import TwitchPlayer from './components/TwitchPlayer'
import MusicPlayer from './components/MusicPlayer'
import NowPlaying from './components/NowPlaying'
import Footer from '../components/Footer'

export default function MusicPage() {
  const [isShelfVisible, setIsShelfVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading)
  }

  const springTransition = {
    type: "spring" as const,
    damping: 25,
    stiffness: 200
  }

  return (
    <div className="w-full">
      {/* Discover Button - Fixed position */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setIsShelfVisible(!isShelfVisible)}
          disabled={isLoading}
          className={`px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 ${
            isLoading
              ? 'bg-gray-600 cursor-not-allowed opacity-50'
              : 'bg-[#bc2026] hover:bg-[#a01b21] cursor-pointer'
          }`}
        >
          {isShelfVisible ? 'Hide' : 'Discover'}
        </button>
      </div>

      {/* Twitch and Radio.co Live Streams - Animates up when shelf is visible */}
      <motion.section
        className="container mx-auto px-4 pt-32 flex items-center justify-center z-0 flex-wrap gap-4 py-4">
        <TwitchPlayer />
        <div className="flex items-center justify-center flex-wrap gap-4 pb-4">
          <MusicPlayer />
          <NowPlaying />
        </div>
      </motion.section>

      {/* Featured Albums Section - Slides up from bottom, over the embeds */}
      <motion.section
        className="fixed bottom-0 left-0 right-0 z-10 bg-white"
        initial={{ y: "100%" }}
        animate={{ y: isShelfVisible ? 0 : "100%" }}
        transition={springTransition}
        style={{ height: '60vh' }}
      >
        <div className="container mx-auto px-4 py-8 h-full">
          <Shelf showTitle={false} onLoadingChange={handleLoadingChange} />
        </div>
      </motion.section>

      {/* Page-specific Footer, always at the bottom */}
      <Footer />
    </div>
  )
}
