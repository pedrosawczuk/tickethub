import {
	date,
	integer,
	pgEnum,
	pgTable,
	time,
	timestamp,
	uuid,
	varchar
} from "drizzle-orm/pg-core"
import { EVENT_CATEGORY } from "packages/utils/src"
import { users } from "./schemas"

export const eventCategoryEnum = pgEnum(
	"event_category",
	Object.values(EVENT_CATEGORY) as [string, ...string[]]
)

export const events = pgTable("events", {
	id: uuid("id").primaryKey().defaultRandom(),
	eventName: varchar("event_name").notNull(),
	eventDescription: varchar("event_description").notNull(),
	eventCategory: eventCategoryEnum("event_category").notNull(),
	eventDate: date("event_date").notNull(),
	eventHour: time("event_hour"),
	maximumAttendees: integer("maximum_attendees"),

	organizerBy: uuid("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),

	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date())
})
