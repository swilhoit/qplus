import {defineField, defineType} from 'sanity'

export const promoCode = defineType({
  name: 'promoCode',
  title: 'Promo Code',
  type: 'document',
  fields: [
    defineField({
      name: 'code',
      title: 'Code',
      type: 'string',
      validation: (Rule) => Rule.required().uppercase(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'discountType',
      title: 'Discount Type',
      type: 'string',
      options: {
        list: [
          {title: 'Percentage', value: 'percentage'},
          {title: 'Fixed Amount', value: 'fixed'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'discountValue',
      title: 'Discount Value',
      type: 'number',
      description: 'Percentage (0-100) or fixed amount in dollars',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'validFrom',
      title: 'Valid From',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'validUntil',
      title: 'Valid Until',
      type: 'datetime',
    }),
    defineField({
      name: 'usageLimit',
      title: 'Usage Limit',
      type: 'number',
      description: 'Maximum number of times this code can be used (leave empty for unlimited)',
    }),
    defineField({
      name: 'usageCount',
      title: 'Usage Count',
      type: 'number',
      readOnly: true,
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'code',
      discountType: 'discountType',
      discountValue: 'discountValue',
      isActive: 'isActive',
    },
    prepare(selection) {
      const {title, discountType, discountValue, isActive} = selection
      const discount = discountType === 'percentage' ? `${discountValue}%` : `$${discountValue}`
      return {
        title,
        subtitle: `${discount} ${isActive ? '✓' : '✗'}`,
      }
    },
  },
})