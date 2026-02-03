import { FastifyInstance } from 'fastify'
import { signUpController } from '../controllers/auth/sign-up-controller'
import { signUpSchema } from '../schemas/sign-up-schema'
import { signInSchema } from '../schemas/sign-in-schema'

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
        () => 'Sign-In Routes',
    )
}
