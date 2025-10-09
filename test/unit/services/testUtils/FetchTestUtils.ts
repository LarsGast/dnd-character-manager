export function getMockFetchResponse(partial?: Partial<Response>): Response {
	return {
		ok: partial?.ok ?? true,
		status: partial?.status ?? 200,
		json: partial?.json ?? (async () => ({})),
		text: partial?.text ?? (async () => ''),
		headers: partial?.headers ?? new Headers(),
		clone: partial?.clone ?? (() => getMockFetchResponse({})),
		redirected: partial?.redirected ?? false,
		statusText: partial?.statusText ?? 'OK',
		type: partial?.type ?? 'basic',
		url: partial?.url ?? '',
		body: partial?.body ?? null,
		bodyUsed: partial?.bodyUsed ?? false,
		arrayBuffer: partial?.arrayBuffer ?? (async () => new ArrayBuffer(0)),
		blob: partial?.blob ?? (async () => new Blob()),
		formData: partial?.formData ?? (async () => new FormData()),
		bytes: partial?.bytes ?? (async () => new Uint8Array()),
	};
}

export function getMockHeaders(partial?: Partial<Headers>): Headers {
	return {
		append: partial?.append ?? (() => {}),
		delete: partial?.delete ?? (() => {}),
		get: partial?.get ?? (() => null),
		has: partial?.has ?? (() => false),
		set: partial?.set ?? (() => {}),
		forEach: partial?.forEach ?? (() => {}),
		entries:
			partial?.entries ??
			function* () {
				return undefined;
			},
		getSetCookie: partial?.getSetCookie ?? (() => []),
		keys:
			partial?.keys ??
			function* () {
				return undefined;
			},
		values:
			partial?.values ??
			function* () {
				return undefined;
			},
		[Symbol.iterator]:
			partial?.[Symbol.iterator] ??
			function* () {
				return undefined;
			},
	};
}

export const mockUrl = new URL('https://example.com/api/test');
