import { IApiService } from '../interfaces/IApiService';

/**
 * Service for interacting with an external API.
 */
export class ApiService implements IApiService {
	/**
	 * Fetch function to use for making HTTP requests. This allows for easier testing and mocking.
	 */
	private readonly fetchFn: typeof fetch;

	public constructor(fetchFn: typeof fetch) {
		this.fetchFn = fetchFn;
	}

	/**
	 * @inheritdoc
	 */
	public async callEndpointAsync<T>(
		url: URL,
		retryCount: number = 0,
	): Promise<T> {
		const response = await this.fetchFn(url);

		// Success.
		if (response.ok) {
			return await response.json();
		}

		// Too Many Requests (HTTP 429) - rate limiting.
		if (response.status === 429) {
			if (retryCount >= 5) {
				throw new Error('Too many retries, giving up.');
			}

			const retryAfterSeconds = parseInt(
				response.headers.get('retry-after') || '1',
				10,
			);

			console.warn(
				`Rate limit hit. Retrying after ${retryAfterSeconds} seconds...`,
			);
			await new Promise((resolve) =>
				setTimeout(resolve, retryAfterSeconds * 1000),
			);

			return await this.callEndpointAsync<T>(url, retryCount + 1);
		}

		// Any other error status.
		throw new Error(`Response status: ${response.status}`);
	}
}
