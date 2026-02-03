import { FastifyReply, FastifyRequest } from 'fastify'
import { hash } from 'bcryptjs'
import { signUpSchema } from '../../schemas/sign-up-schema'
import z from 'zod'
import { db, users } from 'packages/db/src'
import { eq } from 'drizzle-orm/pg-core/expressions'

type SignUpBody = z.infer<typeof signUpSchema>

export async function signUpController(request: FastifyRequest<{ Body: SignUpBody }>, reply: FastifyReply) {
    const { email, password, username, lastName, firstName } = request.body

    const passwordHash = await hash(password, 10)

    const usernameExists = await db.select().from(users).where(eq(users.username, username))
    if (usernameExists) return reply.status(400).send({ message: 'Username already exists' })

    const emailExists = await db.select().from(users).where(eq(users.email, email))
    if (emailExists) return reply.status(400).send({ message: 'Email already exists' })

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
            .returning()

        return reply.status(201).send({ message: `User ${user.username} created successfully` })
    } catch (e) {
        console.error(e)
        return reply.status(400).send({ message: `API error: ${e}` })
    }
}
