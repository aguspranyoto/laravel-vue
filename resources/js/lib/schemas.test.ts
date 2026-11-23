import { describe, expect, it } from 'vitest'
import { applicationSchema, contactSchema, emailSchema } from '@/lib/schemas'

describe('emailSchema', () => {
  it('accepts a valid email', () => {
    expect(emailSchema.safeParse({ email: 'agus@example.com' }).success).toBe(true)
  })

  it('rejects empty and invalid emails', () => {
    expect(emailSchema.safeParse({ email: '' }).success).toBe(false)
    expect(emailSchema.safeParse({ email: 'not-an-email' }).success).toBe(false)
  })
})

describe('contactSchema', () => {
  const valid = { name: 'Agus', email: 'agus@example.com', subject: '', message: 'Hello, this is a proper test message.' }

  it('accepts a valid submission', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it('mirrors the server rules', () => {
    expect(contactSchema.safeParse({ ...valid, name: '' }).success).toBe(false)
    expect(contactSchema.safeParse({ ...valid, email: 'nope' }).success).toBe(false)
    expect(contactSchema.safeParse({ ...valid, message: 'short' }).success).toBe(false)
    expect(contactSchema.safeParse({ ...valid, message: 'x'.repeat(5001) }).success).toBe(false)
  })
})

describe('applicationSchema', () => {
  const valid = { name: 'Agus', email: 'agus@example.com', cover_html: '<p>Hi</p>' }

  it('accepts a valid application', () => {
    expect(applicationSchema.safeParse(valid).success).toBe(true)
  })

  it('rejects missing name or bad email', () => {
    expect(applicationSchema.safeParse({ ...valid, name: '' }).success).toBe(false)
    expect(applicationSchema.safeParse({ ...valid, email: 'nope' }).success).toBe(false)
  })
})
