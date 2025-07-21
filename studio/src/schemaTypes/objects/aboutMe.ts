import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const aboutMe = defineType({
  name: 'aboutMe',
  title: 'About Me',
  type: 'object',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'profilePicture',
      title: 'Profile Picture',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true, // Allows cropping/positioning
      },
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'team',
      title: 'Team',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Media', value: 'Media'},
          {title: 'Computer Engineering', value: 'Computer Engineering'},
          // Add more teams here later: 
          // {title: 'Programming', value: 'Programming'},
          // {title: 'Events', value: 'Events'},
        ],
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      validation: (Rule) => Rule.required().max(300),
      description: 'A short bio about this person (max 300 characters)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'team',
      media: 'profilePicture',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Untitled Person',
        subtitle: `${subtitle || 'No team'} Team`,
        media: media,
      }
    },
  },
})