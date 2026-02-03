import { env } from '@techverse/env'
import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    out: './drizzle',
    schema: './src/schemas/schemas.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: env.DATABASE_URL!,
    },
})
