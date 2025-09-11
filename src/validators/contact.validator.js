import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  
  email: z.string()
    .email('Invalid email format')
    .toLowerCase(),
  
  phone: z.string()
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number')
    .optional(),
  
  spaceType: z.enum(['office', 'retail', 'restaurant', 'medical']),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .trim()
})

export const validateContactData = async (data) => {
  try {
    return contactSchema.parse(data)
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`)
  }
}

export const contactUpdateSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'QUOTED', 'COMPLETED']).optional(),
  userId: z.number().int().positive().optional()
})