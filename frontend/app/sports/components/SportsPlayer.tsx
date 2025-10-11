'use client'

export default function SportsPlayer() {
  return (
    <div style={{
      position: 'absolute',
      top: '65%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      maxHeight: '100%'
    }}>
      <iframe
        src="https://embed.radio.co/player/2a4376d.html"
        style={{
          border: 'none !important' as any,
          width: '100% !important' as any,
          height: '100% !important' as any,
          display: 'block !important' as any
        }}
        title="KSDT Sports Radio Player"
      />
    </div>
  )
}
