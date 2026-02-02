import z from 'zod'

export const signUpSchema = z.object({
    username: z.string().min(3, 'min username is 3'),
    email: z.string().min(3, 'min email is 3'),
    password: z.string().min(7, 'min password is 7'),
})
