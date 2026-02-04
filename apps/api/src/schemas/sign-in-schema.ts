import z from "zod"

export const signInSchema = z.object({
	identifier: z.string().min(3, "min identifier is 3"),
	password: z.string().min(7, "min password is 7")
})
