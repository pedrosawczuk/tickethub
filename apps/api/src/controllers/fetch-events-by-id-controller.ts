import { eq } from "drizzle-orm"
import type { FastifyReply, FastifyRequest } from "fastify"
import { db, events } from "packages/db/src"
import type z from "zod"
import type { fetchEventByIdSchema } from "../schemas/fetch-event-by-id-schema"

type EventByIdParams = z.infer<typeof fetchEventByIdSchema>

export async function fetchEventByIdController(
	request: FastifyRequest<{ Params: EventByIdParams }>,
	reply: FastifyReply
) {
	const { id } = request.params

	const [fetchEventById] = await db
		.select()
		.from(events)
		.where(eq(events.id, id))
	if (!fetchEventById)
		return reply.status(404).send({ message: "Event not Found" })

	return reply.status(200).send(fetchEventById)
}
