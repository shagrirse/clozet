import { z } from 'zod/v4'
import { UserRole } from '@prisma/client'

export type AddUserInput = z.infer<typeof addUserSchema>
export const addUserSchema = z.object({
  name: z.string().min(3, 'Name needs to be at least 3 charaters long!'),
  email: z.email().optional(),
  phone: z.e164().optional(),
  telegram: z.string().optional(),
  instagram: z.string().optional(),
  role: z.enum(UserRole),
})
