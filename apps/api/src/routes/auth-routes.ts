import { signInSchema } from '@/schemas/sign-in-schema'
import { signUpSchema } from '@/schemas/sign-up-schema'
import { FastifyInstance } from 'fastify'

export async function authRoutes(app: FastifyInstance) {
    app.post(
        '/sign-up',
        {
            schema: {
                consumes: ['application/json'],
                body: signUpSchema,
            },
        },
        () => 'Sign-Up Routes',
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
