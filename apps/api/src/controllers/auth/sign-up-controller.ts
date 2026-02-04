import { db, users } from "@techverse/db";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import type { FastifyReply, FastifyRequest } from "fastify";
import type z from "zod";
import type { signUpSchema } from "../../schemas/sign-up-schema";

type SignUpBody = z.infer<typeof signUpSchema>;

export async function signUpController(
	request: FastifyRequest<{ Body: SignUpBody }>,
	reply: FastifyReply,
) {
	const { email, password, username, lastName, firstName } = request.body;

	const passwordHash = await hash(password, 10);

	const usernameExists = await db
		.select()
		.from(users)
		.where(eq(users.username, username));
	if (usernameExists.length > 0)
		return reply.status(400).send({ message: "Username already exists" });

	const emailExists = await db
		.select()
		.from(users)
		.where(eq(users.email, email));
	if (emailExists.length > 0)
		return reply.status(400).send({ message: "Email already exists" });

	try {
		const [user] = await db
			.insert(users)
			.values({
				email,
				username,
				firstName,
				lastName,
				passwordHash,
			})
			.returning();

		return reply
			.status(201)
			.send({ message: `User ${user.username} created successfully` });
	} catch (e) {
		console.error(e);
		return reply.status(400).send({ message: `API error: ${e}` });
	}
}
