import type { RequestHandler } from "./$types";
import { getAuthUrl } from "$lib/server/google";

export const GET: RequestHandler = async () => {
	const url = getAuthUrl();
	return new Response(JSON.stringify({ url }), {
		headers: { "Content-Type": "application/json" },
	});
};
