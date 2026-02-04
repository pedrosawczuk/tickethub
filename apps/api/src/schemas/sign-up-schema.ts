import z from "zod";

export const signUpSchema = z.object({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	email: z.string(),
	username: z.string(),
	password: z.string(),
});
