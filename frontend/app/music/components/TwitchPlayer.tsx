'use client'

export default function TwitchPlayer() {
  // Get the parent domain from environment variable
  // For localhost, Twitch accepts 'localhost' as parent
  // For production, set NEXT_PUBLIC_SITE_DOMAIN to your actual domain (e.g., ksdtradio.ucsd.edu)
  const parentDomain = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'localhost'

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Twitch Video Player */}
        <div className="flex-1">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
            <iframe
              src={`https://player.twitch.tv/?channel=ksdtradio&parent=${parentDomain}&muted=true`}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allowFullScreen
              style={{ border: 'none' }}
              title="KSDT Radio Twitch Stream"
            />
          </div>
        </div>

        {/* Optional Twitch Chat - Hidden on mobile, shown on larger screens */}
        <div className="hidden lg:block lg:w-[350px]">
          <div className="relative w-full h-[480px]">
            <iframe
              src={`https://www.twitch.tv/embed/ksdtradio/chat?parent=${parentDomain}`}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              style={{ border: 'none' }}
              title="KSDT Radio Twitch Chat"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
