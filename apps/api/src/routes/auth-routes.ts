import { FastifyInstance } from 'fastify'
import { signUpSchema } from '../schemas/sign-up-schema'
import { signInSchema } from '../schemas/sign-in-schema'
import { signInController } from '../controllers/auth/sign-in-controller'
import { signUpController } from '../controllers/auth/sign-up-controller'

export async function authRoutes(app: FastifyInstance) {
    app.post(
        '/sign-up',
        {
            schema: {
                consumes: ['application/json'],
                body: signUpSchema,
            },
        },
        signUpController,
    )
    app.post(
        '/sign-in',
        {
            schema: {
                consumes: ['application/json'],
                body: signInSchema,
            },
        },
        signInController,
    )
}
