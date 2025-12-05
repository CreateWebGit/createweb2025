import type { RequestHandler } from "./$types";
import { setTokensFromCode } from "$lib/server/google";

export const GET: RequestHandler = async ({ url }) => {
	const code = url.searchParams.get("code");
	if (!code) {
		return new Response("Missing code", { status: 400 });
	}

	await setTokensFromCode(code);

	return new Response(
		"Google Calendar connected. You can now close this window.",
		{
			headers: { "Content-Type": "text/plain" },
		}
	);
};
