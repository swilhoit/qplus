import {defineField, defineType} from 'sanity'

export const user = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'subscriptionStatus',
      title: 'Subscription Status',
      type: 'string',
      options: {
        list: [
          {title: 'Active', value: 'active'},
          {title: 'Cancelled', value: 'cancelled'},
          {title: 'Past Due', value: 'past_due'},
          {title: 'None', value: 'none'},
        ],
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'subscriptionType',
      title: 'Subscription Type',
      type: 'string',
      options: {
        list: [
          {title: 'Monthly', value: 'monthly'},
          {title: 'Annual', value: 'annual'},
          {title: 'None', value: 'none'},
        ],
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'stripeCustomerId',
      title: 'Stripe Customer ID',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'subscriptionId',
      title: 'Subscription ID',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'purchasedContent',
      title: 'Purchased Content',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'contentItem'}]}],
    }),
    defineField({
      name: 'freeAccess',
      title: 'Free Access',
      type: 'boolean',
      description: 'Grant free access to all content',
      initialValue: false,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'lastLogin',
      title: 'Last Login',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'subscriptionStatus',
    },
  },
})