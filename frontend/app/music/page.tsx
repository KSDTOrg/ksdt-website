import { Metadata } from 'next'
// import RadioPlayerWrapper from './components/RadioPlayerWrapper'
import Shelf from './components/Shelf'
import TwitchPlayer from './components/TwitchPlayer'

export const metadata: Metadata = {
  title: 'Music | KSDT Radio',
  description: 'Listen to live radio and explore music from KSDT Radio',
}

export default function MusicPage() {
  return (
    <div className="container mx-auto px-4 pt-20 pb-12 min-h-screen">
      {/* <h1 className="text-4xl font-bold mb-8">KSDT Live Radio</h1> */}

      {/* Three.js Radio Player Component */}
      {/* <div className="mb-16">
        <RadioPlayerWrapper />
      </div> */}

      {/* Twitch Live Stream */}
      <section className="fixed top-20 left-0 right-0 bottom-0 flex items-center justify-center z-0">
        <TwitchPlayer />
      </section>

      {/* Featured Albums Section */}
      <section className="relative z-10 mb-16" style={{ marginTop: 'calc(100vh - 5rem)' }}>
        <Shelf showTitle={false} />
      </section>
    </div>
  )
}
