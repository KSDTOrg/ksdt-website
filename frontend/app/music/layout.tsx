import OnAir from '../components/OnAir'

export default function MusicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute top-32 left-0 right-0 z-20 pt-2">
        <div className="container mx-auto px-4">
          <OnAir />
        </div>
      </div>
      {children}
    </div>
  )
}
