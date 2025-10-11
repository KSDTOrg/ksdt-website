import { Metadata } from 'next'
import SportsPlayer from './components/SportsPlayer'

export const metadata: Metadata = {
  title: 'Sports | KSDT Radio',
  description: 'Listen to KSDT Sports Radio live broadcasts',
}

export default function SportsPage() {
  return (
    <div
      className="bg-white"
      style={{
        position: 'fixed',
        top: '80px',
        bottom: '0',
        left: '0',
        right: '0',
        overflow: 'hidden'
      }}
    >
      <SportsPlayer />
    </div>
  )
}
