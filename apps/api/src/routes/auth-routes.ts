import type { FastifyInstance } from "fastify";
import { signInController } from "../controllers/auth/sign-in-controller";
import { signUpController } from "../controllers/auth/sign-up-controller";
import { signInSchema } from "../schemas/sign-in-schema";
import { signUpSchema } from "../schemas/sign-up-schema";

export async function authRoutes(app: FastifyInstance) {
	app.post(
		"/sign-up",
		{
			schema: {
				consumes: ["application/json"],
				body: signUpSchema,
			},
		},
		signUpController,
	);
	app.post(
		"/sign-in",
		{
			schema: {
				consumes: ["application/json"],
				body: signInSchema,
			},
		},
		signInController,
	);
}
