import { eq } from "drizzle-orm"
import type { FastifyReply, FastifyRequest } from "fastify"
import { db, events, users } from "packages/db/src"
import type z from "zod"
import type { addEventSchema } from "../schemas/add-event-schema"

type AddEventBody = z.infer<typeof addEventSchema>

export async function addEventController(
	request: FastifyRequest<{ Body: AddEventBody }>,
	reply: FastifyReply
) {
	const {
		eventName,
		eventCategory,
		eventDate,
		eventDescription,
		organizerBy,
		maximumAttendees,
		eventHour
	} = request.body

	const user = await db.select().from(users).where(eq(users.id, organizerBy))
	if (!user) return reply.status(404).send({ message: "User doesn't exist" })

	const DATE_TODAY = new Date()
	const EVENT_DATE = new Date(eventDate)

	if (DATE_TODAY >= EVENT_DATE)
		return reply.status(404).send({ message: "Event Error" })

	try {
		const [event] = await db
			.insert(events)
			.values({
				eventDate: EVENT_DATE.toISOString(),
				eventDescription,
				eventCategory,
				eventName,
				organizerBy,
				maximumAttendees,
				eventHour
			})
			.returning()

		return reply.status(201).send(event)
	} catch (e) {
		return reply.status(404).send(e)
	}
}
