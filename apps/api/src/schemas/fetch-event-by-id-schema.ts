import z from "zod";

export const fetchEventByIdSchema = z.object({
    id: z.uuid()
})