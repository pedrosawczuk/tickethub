import type { FastifyReply, FastifyRequest } from "fastify"
import { db, events } from "packages/db/src"

export async function fetchAllEventsController(
	_request: FastifyRequest,
	reply: FastifyReply
) {
	const allEvents = await db.select().from(events)

	return reply.status(200).send(allEvents)
}
