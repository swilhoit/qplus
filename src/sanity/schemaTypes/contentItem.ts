import {defineField, defineType} from 'sanity'

export const contentItem = defineType({
  name: 'contentItem',
  title: 'Content Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          {title: 'Video', value: 'video'},
          {title: 'Audio', value: 'audio'},
          {title: 'PDF', value: 'pdf'},
          {title: 'Template', value: 'template'},
          {title: 'Resource', value: 'resource'},
          {title: 'Training', value: 'training'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      hidden: ({document}) => document?.contentType !== 'video',
    }),
    defineField({
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      options: {
        accept: 'audio/*',
      },
      hidden: ({document}) => document?.contentType !== 'audio',
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      hidden: ({document}) => !['pdf', 'template', 'resource'].includes(document?.contentType as string),
    }),
    defineField({
      name: 'price',
      title: 'One-Time Purchase Price',
      type: 'number',
      description: 'Price in dollars for individual purchase',
      validation: (Rule) => Rule.min(0),
      initialValue: 10,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Content',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'viewCount',
      title: 'View Count',
      type: 'number',
      readOnly: true,
      initialValue: 0,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.title',
      contentType: 'contentType',
      media: 'thumbnail',
    },
    prepare(selection) {
      const {title, category, contentType} = selection
      return {
        title,
        subtitle: `${category || 'Uncategorized'} • ${contentType}`,
        media: selection.media,
      }
    },
  },
})