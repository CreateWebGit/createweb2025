import type { RequestHandler } from "./$types";
import { getCalendar, calendarId, timeZone } from "$lib/server/google";

function toISO(date: Date) {
	return date.toISOString();
}

export const GET: RequestHandler = async ({ url }) => {
	const dateParam = url.searchParams.get("date"); // YYYY-MM-DD
	if (!dateParam) {
		return new Response("Missing date", { status: 400 });
	}

	const [year, month, day] = dateParam.split("-").map(Number);

	const startOfDay = new Date(Date.UTC(year, month - 1, day, 8, 0, 0)); // 08:00
	const endOfDay = new Date(Date.UTC(year, month - 1, day, 17, 0, 0)); // 17:00

	const calendar = getCalendar();

	//fetch existing events for that day
	const eventsRes = await calendar.events.list({
		calendarId,
		timeMin: toISO(startOfDay),
		timeMax: toISO(endOfDay),
		singleEvents: true,
		orderBy: "startTime",
	});

	const events = (eventsRes.data.items || []).map((e) => ({
		start: new Date(e.start?.dateTime ?? e.start?.date!),
		end: new Date(e.end?.dateTime ?? e.end?.date!),
	}));

	const SLOT_MINUTES = 20;
	const slots: { start: string; end: string }[] = [];

	//build 20-min slots and filter out those overlapping with events
	for (let t = +startOfDay; t < +endOfDay; ) {
		const slotStart = new Date(t);
		const slotEnd = new Date(t + SLOT_MINUTES * 60 * 1000);

		const overlaps = events.some((ev) => {
			return slotStart < ev.end && slotEnd > ev.start;
		});

		if (!overlaps) {
			slots.push({
				start: slotStart.toISOString(),
				end: slotEnd.toISOString(),
			});
		}

		t += SLOT_MINUTES * 60 * 1000;
	}

	return new Response(JSON.stringify({ slots, timeZone }), {
		headers: { "Content-Type": "application/json" },
	});
};
