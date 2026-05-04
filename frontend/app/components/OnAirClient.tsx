'use client'

import { useEffect, useState } from 'react'
import type { TimeslotsQueryResult } from '@/sanity.types'

type Schedule = TimeslotsQueryResult
type Slot = Schedule[number]

const STATION_TZ = 'America/Los_Angeles'

const DAY_LABELS: Record<NonNullable<Slot['dayOfWeek']>, string> = {
  sun: 'Sun',
  mon: 'Mon',
  tue: 'Tue',
  wed: 'Wed',
  thu: 'Thu',
  fri: 'Fri',
  sat: 'Sat',
}

// Intl.DateTimeFormat with `weekday: 'short'` returns values like "Mon" in en-US.
const WEEKDAY_TO_KEY: Record<string, NonNullable<Slot['dayOfWeek']>> = {
  Sun: 'sun',
  Mon: 'mon',
  Tue: 'tue',
  Wed: 'wed',
  Thu: 'thu',
  Fri: 'fri',
  Sat: 'sat',
}

function getStationNow(date: Date = new Date()): {
  day: NonNullable<Slot['dayOfWeek']>
  hour: number
} {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: STATION_TZ,
    weekday: 'short',
    hour: 'numeric',
    hour12: false,
  }).formatToParts(date)

  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? 'Sun'
  const hourRaw = parts.find((p) => p.type === 'hour')?.value ?? '0'
  // Intl can emit "24" at midnight for hour12:false; normalize to 0.
  const hour = parseInt(hourRaw, 10) % 24

  return { day: WEEKDAY_TO_KEY[weekday] ?? 'sun', hour }
}

function findCurrentSlot(
  schedule: Schedule,
  day: NonNullable<Slot['dayOfWeek']>,
  hour: number
): Slot | null {
  for (const slot of schedule) {
    if (slot.dayOfWeek !== day) continue
    if (typeof slot.startHour !== 'number' || typeof slot.endHour !== 'number') continue
    if (hour >= slot.startHour && hour < slot.endHour) return slot
  }
  return null
}

function formatHour(h: number): string {
  const normalized = h % 24
  if (normalized === 0) return '12am'
  if (normalized === 12) return '12pm'
  if (normalized < 12) return `${normalized}am`
  return `${normalized - 12}pm`
}

function formatTimeslot(slot: Slot): string {
  const day = slot.dayOfWeek ? DAY_LABELS[slot.dayOfWeek] : ''
  const start = typeof slot.startHour === 'number' ? formatHour(slot.startHour) : ''
  const end = typeof slot.endHour === 'number' ? formatHour(slot.endHour) : ''
  return `${day} ${start} – ${end}`.trim()
}

function msUntilNextHour(now: Date = new Date()): number {
  return (
    (60 - now.getMinutes()) * 60_000 -
    now.getSeconds() * 1000 -
    now.getMilliseconds()
  )
}

export default function OnAirClient({ schedule }: { schedule: Schedule }) {
  const [current, setCurrent] = useState<Slot | null>(() => {
    const { day, hour } = getStationNow()
    console.log('[OnAir] schedule:', schedule)
    console.log('[OnAir] now:', { day, hour })
    const slot = findCurrentSlot(schedule, day, hour)
    console.log('[OnAir] matched slot:', slot)
    return slot
  })

  useEffect(() => {
    const recompute = () => {
      const { day, hour } = getStationNow()
      const slot = findCurrentSlot(schedule, day, hour)
      console.log('[OnAir] recompute:', { day, hour, slot })
      setCurrent(slot)
    }

    // Always recompute on mount in case the initial SSR/hydration value is stale.
    recompute()

    let timerId: ReturnType<typeof setTimeout> | null = null

    const scheduleNext = () => {
      timerId = setTimeout(() => {
        recompute()
        scheduleNext()
      }, msUntilNextHour())
    }
    scheduleNext()

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        recompute()
        if (timerId) clearTimeout(timerId)
        scheduleNext()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      if (timerId) clearTimeout(timerId)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [schedule])

  if (!current) {
    return (
      <div className="inline-flex flex-col gap-1">
        <span className="text-2xl font-black text-black">Off air</span>
      </div>
    )
  }

  const hostName = current.host?.trim() ?? ''

  return (
    <div className="inline-flex flex-col gap-1">
      <span className="text-xs font-bold uppercase tracking-widest text-[#bc2026]">On Air</span>
      <span className="text-2xl font-black text-black">{current.showName ?? 'Untitled'}</span>
      {hostName && <span className="text-sm text-gray-700">{hostName}</span>}
      <span className="text-xs uppercase tracking-wide text-gray-500">
        {formatTimeslot(current)}
      </span>
    </div>
  )
}