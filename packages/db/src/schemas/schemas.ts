import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
	id: uuid("id").primaryKey().defaultRandom(),
	firstName: varchar("first_name"),
	lastName: varchar("last_name"),
	email: varchar().unique().notNull(),
	username: varchar().unique().notNull(),
	passwordHash: varchar("password_hash").notNull(),

	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date())
})

export const refreshTokens = pgTable("refresh_tokens", {
	id: uuid("id").primaryKey().defaultRandom(),
	token: varchar("token", { length: 255 }).notNull().unique(),
	userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
	isRevoked: boolean("is_revoked").default(false),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").defaultNow()
})
