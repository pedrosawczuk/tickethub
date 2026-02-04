import type { FastifyInstance } from "fastify"
import { addEventController } from "../controllers/add-event-controller"
import { fetchAllEventsController } from "../controllers/fetch-all-events-controller"
import { fetchEventByIdController } from "../controllers/fetch-events-by-id-controller"
import { addEventSchema } from "../schemas/add-event-schema"
import { fetchEventByIdSchema } from "../schemas/fetch-event-by-id-schema"

export async function eventRoutes(app: FastifyInstance) {
	app.get("/", fetchAllEventsController)
	app.get(
		"/:id",
		{
			schema: {
				consumes: ["application/json"],
				params: fetchEventByIdSchema
			}
		},
		fetchEventByIdController
	)
	app.post(
		"/create",
		{
			schema: {
				consumes: ["application/json"],
				body: addEventSchema
			}
		},
		addEventController
	)
}
