import { db, refreshTokens, users } from "@techverse/db";
import { compare } from "bcryptjs";
import { eq, or } from "drizzle-orm";
import type { FastifyReply, FastifyRequest } from "fastify";
import type z from "zod";
import { app } from "../../app";
import type { signInSchema } from "../../schemas/sign-in-schema";

type signInBody = z.infer<typeof signInSchema>;

export async function signInController(
	request: FastifyRequest<{ Body: signInBody }>,
	reply: FastifyReply,
) {
	const { identifier, password } = request.body;

	const [user] = await db
		.select()
		.from(users)
		.where(or(eq(users.email, identifier), eq(users.username, identifier)))
		.limit(1);

	if (!user) {
		return reply.status(401).send({ message: "Invalid credentials" });
	}

	const isPasswordValid = await compare(password, user.passwordHash);
	if (!isPasswordValid) {
		return reply.status(401).send({ message: "Invalid Password" });
	}

	const redisTokenId = crypto.randomUUID();

	const accessToken = app.jwt.sign({ sub: user.id }, { expiresIn: "15m" });
	const refreshToken = app.jwt.sign(
		{ sub: user.id, jti: redisTokenId },
		{ expiresIn: "7d" },
	);

	const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7;
	await app.redis.set(
		`refresh_token:${redisTokenId}`,
		user.id,
		"EX",
		SEVEN_DAYS_IN_SECONDS,
	);

	await db.insert(refreshTokens).values({
		id: redisTokenId,
		token: refreshToken,
		userId: user.id,
		expiresAt: new Date(Date.now() + SEVEN_DAYS_IN_SECONDS * 1000),
	});

	return reply.status(200).send({
		message: `User ${user.username} logged successfully`,
		accessToken,
	});
}
