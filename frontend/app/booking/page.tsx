import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Booking | KSDT Radio',
  description: 'Book your event or show with KSDT Radio',
}

export default function BookingPage() {
  const calendarId = "c_f990822a8e6c4ace1fee94f99663e7c65ff05d4fae019006a0269567ba8ebd86@group.calendar.google.com";
  const calendarSrc = calendarId
    ? `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(calendarId)}&ctz=${encodeURIComponent('America/Los_Angeles')}`
    : null;

  return (
    <div className="bg-white min-h-screen">
      <div className="pt-38 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl lg:text-6xl font-black text-black mb-4">
              BOOKING
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Get in touch with us to book the studio and practice room, as well as events, shows, or collaborations with KSDT Radio.
            </p>
          </div>

          <div className="max-w-4xl">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Schedule</h2>
              {calendarSrc ? (
                <div className="aspect-video w-full overflow-hidden rounded-md">
                  <iframe
                    src={calendarSrc}
                    className="w-full h-full border-0"
                    title="KSDT Radio Booking Calendar"
                    loading="lazy"
                  />
                </div>
              ) : (
                <p className="text-gray-600">
                  Calendar unavailable.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}