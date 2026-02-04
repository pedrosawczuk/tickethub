import fastifyJwt from "@fastify/jwt"
import fastifyRedis from "@fastify/redis"
import { env } from "@techverse/env"
import {
	serializerCompiler,
	validatorCompiler
} from "fastify-type-provider-zod"
import { app } from "./app"
import { authRoutes } from "./routes/auth-routes"
import { eventRoutes } from "./routes/event-routes"

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.get("/", () => "Hello, World!")

app.register(fastifyRedis, {
	host: env.REDIS_HOST,
	password: env.REDIS_PASSWORD
})

app.register(fastifyJwt, {
	secret: env.JWT_SECRET
})

app.register(authRoutes, { prefix: "/auth" })
app.register(eventRoutes, { prefix: "/event" })

app.listen({ port: env.PORT }).then(() => {
	console.log(`HTTP running on http://localhost:${env.PORT}`)
})
