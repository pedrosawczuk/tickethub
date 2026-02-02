import z from 'zod'
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' })

export const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    throw new Error('error in environment variables')
}

export const env = _env.data
