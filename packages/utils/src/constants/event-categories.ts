export const EVENT_CATEGORY = {
	CONFERENCE: "CONFERENCE",
	WORKSHOP: "WORKSHOP",
	CONCERT: "CONCERT",
	PARTY: "PARTY"
} as const

export type EventCategory = keyof typeof EVENT_CATEGORY