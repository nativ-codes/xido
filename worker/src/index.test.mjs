import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker from './index.js';

const env = (allowed = true) => ({
	API_URL: 'https://upstream.test/composite',
	RAPIDAPI_KEY: 'secret',
	RAPIDAPI_HOST: 'upstream.test',
	RATE_LIMITER: { limit: async () => ({ success: allowed }) },
});
const get = (path) => new Request(`https://w.test${path}`);

test('proxies valid symbols with the secret headers', async (t) => {
	const calls = [];
	t.mock.method(globalThis, 'fetch', async (url, init) => {
		calls.push({ url, init });
		return Response.json({ success: true, data: [] });
	});
	const res = await worker.fetch(get('/companies?symbol=AAPL,BRK-B,^GSPC'), env());
	assert.equal(res.status, 200);
	assert.deepEqual(await res.json(), { success: true, data: [] });
	assert.equal(calls[0].url, 'https://upstream.test/composite?symbol=AAPL,BRK-B,^GSPC');
	assert.equal(calls[0].init.headers['x-rapidapi-key'], 'secret');
});

test('rejects bad input before calling upstream', async (t) => {
	const fetchMock = t.mock.method(globalThis, 'fetch', async () => Response.json({}));
	assert.equal((await worker.fetch(get('/companies?symbol=AAPL%26x=1'), env())).status, 400);
	assert.equal((await worker.fetch(get('/companies'), env())).status, 400);
	assert.equal((await worker.fetch(get(`/companies?symbol=${Array(11).fill('A').join(',')}`), env())).status, 400);
	assert.equal((await worker.fetch(get('/other'), env())).status, 404);
	assert.equal((await worker.fetch(get('/companies?symbol=AAPL'), env(false))).status, 429);
	assert.equal(fetchMock.mock.callCount(), 0);
});

test('returns 502 when upstream is unreachable', async (t) => {
	t.mock.method(globalThis, 'fetch', async () => { throw new Error('down'); });
	assert.equal((await worker.fetch(get('/companies?symbol=AAPL'), env())).status, 502);
});
