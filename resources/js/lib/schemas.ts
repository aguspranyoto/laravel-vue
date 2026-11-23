import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const emailSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email').max(255),
})
export const emailTypedSchema = toTypedSchema(emailSchema)

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  email: z.string().min(1, 'Email is required').email('Enter a valid email').max(255),
  subject: z.string().max(180).optional().or(z.literal('')),
  message: z.string().min(10, 'Tell us a little more (min 10 characters)').max(5000),
})
export const contactTypedSchema = toTypedSchema(contactSchema)
export type ContactForm = z.infer<typeof contactSchema>

export const applicationSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  email: z.string().min(1, 'Email is required').email('Enter a valid email').max(255),
  cover_html: z.string().max(10000).optional().or(z.literal('')),
  cv: z.any().optional(),
})
export const applicationTypedSchema = toTypedSchema(applicationSchema)
export type ApplicationForm = z.infer<typeof applicationSchema>
