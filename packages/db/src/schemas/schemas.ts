import { uuid } from 'drizzle-orm/pg-core'
import { timestamp } from 'drizzle-orm/pg-core'
import { varchar } from 'drizzle-orm/pg-core'
import { pgTable } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    firstName: varchar('first_name'),
    lastName: varchar('last_name'),
    email: varchar().unique().notNull(),
    username: varchar().unique().notNull(),
    passwordHash: varchar('password_hash',).notNull(),

    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
})
