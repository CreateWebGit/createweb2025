// google client for calendar api
import { google } from "googleapis";
import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_REDIRECT_URI,
	GOOGLE_TOKEN_JSON,
	GOOGLE_CALENDAR_ID,
	TIMEZONE,
} from "$env/static/private";

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
	console.error("Google OAuth env vars missing:", {
		GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: !!GOOGLE_CLIENT_SECRET,
		GOOGLE_REDIRECT_URI,
	});
	throw new Error("Missing Google OAuth env variables");
}

const oauth2Client = new google.auth.OAuth2(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_REDIRECT_URI
);

// Load saved tokens (in real app, load from DB)
if (GOOGLE_TOKEN_JSON && GOOGLE_TOKEN_JSON !== "{}") {
	oauth2Client.setCredentials(JSON.parse(GOOGLE_TOKEN_JSON));
}

export function getAuthUrl() {
	const scopes = ["https://www.googleapis.com/auth/calendar"];

	return oauth2Client.generateAuthUrl({
		access_type: "offline",
		prompt: "consent",
		scope: scopes,
	});
}

export async function setTokensFromCode(code: string) {
	const { tokens } = await oauth2Client.getToken(code);
	oauth2Client.setCredentials(tokens);

	console.log(
		"Save these tokens somewhere:",
		JSON.stringify(tokens, null, 2)
	);
}

export function getCalendar() {
	return google.calendar({ version: "v3", auth: oauth2Client });
}

export const calendarId = GOOGLE_CALENDAR_ID || "primary";
export const timeZone = TIMEZONE || "Europe/Stockholm";
