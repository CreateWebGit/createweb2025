import type { RequestHandler } from "./$types";
import { getCalendar, calendarId, timeZone } from "$lib/server/google";
import { v4 as uuid } from "uuid";

type Body = {
	start: string; // ISO
	end: string; // ISO
	name: string;
	email: string;
};

export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as Body;

	if (!body.start || !body.end || !body.email) {
		return new Response("Missing fields", { status: 400 });
	}

	const calendar = getCalendar();

	//TODO: lägg till mer användarinfo, start end email
	const event = {
		summary: `Möte med ${body.name || body.email}`,
		description: "Bokad via https://createweb.se.",
		start: {
			dateTime: body.start,
			timeZone,
		},
		end: {
			dateTime: body.end,
			timeZone,
		},
		attendees: [{ email: body.email }],
		conferenceData: {
			createRequest: {
				requestId: uuid(),
				conferenceSolutionKey: { type: "hangoutsMeet" },
			},
		},
	};

	const res = await calendar.events.insert({
		calendarId,
		requestBody: event,
		conferenceDataVersion: 1,
		sendUpdates: "all",
	});

	return new Response(JSON.stringify({ event: res.data }), {
		headers: { "Content-Type": "application/json" },
	});
};
