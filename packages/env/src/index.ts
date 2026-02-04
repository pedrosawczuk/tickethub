import dotenv from "dotenv"
import z from "zod"

dotenv.config({ path: "../../.env" })

export const envSchema = z.object({
	PORT: z.coerce.number().default(3333),
	NODE_ENV: z.enum(["dev", "prod", "test"]).default("dev"),
	DATABASE_URL: z.coerce.string(),
	JWT_SECRET: z.coerce.string(),
	COOKIE_SECRET: z.coerce.string(),

	REDIS_HOST: z.string(),
	REDIS_PASSWORD: z.string(),
	REDIS_PORT: z.coerce.number()
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
	throw new Error("error in environment variables")
}

export const env = _env.data
