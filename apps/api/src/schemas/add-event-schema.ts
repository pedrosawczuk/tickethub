import { EVENT_CATEGORY } from "packages/utils/src"
import z from "zod"

export const addEventSchema = z.object({
	eventName: z.string(),
	eventDescription: z.string(),
	eventDate: z.string(),
	eventHour: z.string().optional(),
	eventCategory: z.enum(EVENT_CATEGORY),
	maximumAttendees: z.number().optional(),
	organizerBy: z.string()
})
