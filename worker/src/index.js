// Proxy for the RapidAPI quotes endpoint so the API key never ships in the app.
const MAX_SYMBOLS = 10; // keep in sync with maxCompaniesPerBatch in the app
const SYMBOL = /^[A-Za-z0-9.^=-]{1,20}$/;

const json = (body, status) => Response.json(body, { status });

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		if (request.method !== 'GET' || url.pathname !== '/companies') {
			return json({ success: false, error: 'Not found' }, 404);
		}

		const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
		const { success } = await env.RATE_LIMITER.limit({ key: ip });
		if (!success) return json({ success: false, error: 'Too many requests' }, 429);

		const symbols = (url.searchParams.get('symbol') ?? '').split(',');
		if (symbols.length > MAX_SYMBOLS || !symbols.every((s) => SYMBOL.test(s))) {
			return json({ success: false, error: 'Invalid symbol list' }, 400);
		}

		try {
			const upstream = await fetch(`${env.API_URL}?symbol=${symbols.join(',')}`, {
				headers: { 'x-rapidapi-key': env.RAPIDAPI_KEY, 'x-rapidapi-host': env.RAPIDAPI_HOST },
			});
			return new Response(upstream.body, {
				status: upstream.status,
				headers: { 'content-type': upstream.headers.get('content-type') ?? 'application/json' },
			});
		} catch (error) {
			console.error(error);
			return json({ success: false, error: 'Upstream unavailable' }, 502);
		}
	},
};
