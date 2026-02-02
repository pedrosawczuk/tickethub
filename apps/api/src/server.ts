import { env } from '@techverse/env'
import { authRoutes } from './routes/auth-routes'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { app } from './app'

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.get('/', () => 'Hello, World!')

app.register(authRoutes, { prefix: '/auth' })

app.listen({ port: env.PORT }).then(() => {
    console.log(`HTTP running on http://localhost:${env.PORT}`)
})
