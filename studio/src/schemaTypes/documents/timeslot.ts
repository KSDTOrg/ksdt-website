import {ClockIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

const DAYS_OF_WEEK = [
  {title: 'Sunday', value: 'sun'},
  {title: 'Monday', value: 'mon'},
  {title: 'Tuesday', value: 'tue'},
  {title: 'Wednesday', value: 'wed'},
  {title: 'Thursday', value: 'thu'},
  {title: 'Friday', value: 'fri'},
  {title: 'Saturday', value: 'sat'},
]

export const timeslot = defineType({
  name: 'timeslot',
  title: 'Schedule Timeslot',
  icon: ClockIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'showName',
      title: 'Show Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'host',
      title: 'Host Name',
      description:
        'Optional. Display name of the host. Leave blank for shows without a named host (e.g. "Open Booth").',
      type: 'string',
    }),
    defineField({
      name: 'dayOfWeek',
      title: 'Day of Week',
      type: 'string',
      options: {list: DAYS_OF_WEEK, layout: 'dropdown'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startHour',
      title: 'Start Hour (0–23, LA time)',
      description: '0 = midnight, 13 = 1pm, 23 = 11pm.',
      type: 'number',
      validation: (rule) => rule.required().integer().min(0).max(23),
    }),
    defineField({
      name: 'endHour',
      title: 'End Hour (1–24, LA time)',
      description: 'Exclusive upper bound. 12 means "ends at noon", 24 means "ends at midnight".',
      type: 'number',
      validation: (rule) =>
        rule
          .required()
          .integer()
          .min(1)
          .max(24)
          .custom((endHour, context) => {
            const start = (context.document?.startHour as number | undefined) ?? 0
            if (typeof endHour === 'number' && endHour <= start) {
              return 'End hour must be greater than start hour.'
            }
            return true
          }),
    }),
  ],
  preview: {
    select: {
      showName: 'showName',
      host: 'host',
      dayOfWeek: 'dayOfWeek',
      startHour: 'startHour',
      endHour: 'endHour',
    },
    prepare({showName, host, dayOfWeek, startHour, endHour}) {
      const day = DAYS_OF_WEEK.find((d) => d.value === dayOfWeek)?.title ?? dayOfWeek ?? '?'
      const slot =
        typeof startHour === 'number' && typeof endHour === 'number'
          ? `${day} ${startHour}–${endHour}`
          : day
      return {
        title: showName ?? 'Untitled Show',
        subtitle: host ? `${slot} · ${host}` : slot,
      }
    },
  },
})