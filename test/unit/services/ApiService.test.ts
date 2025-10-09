import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ApiService } from '../../../src/services/ApiService';

describe('callEndpointAsync', () => {
	let fetchFn: ReturnType<typeof vi.fn>;
	let apiService: ApiService;
	const testUrl = new URL('https://example.com/api');

	beforeEach(() => {
		fetchFn = vi.fn();
		apiService = new ApiService(fetchFn as unknown as typeof fetch);
	});

	it('should call fetch with the correct URL', async () => {
		// Arrange
		fetchFn.mockResolvedValue({
			ok: true,
			status: 200,
			json: vi.fn().mockResolvedValue({}),
		});

		// Act
		await apiService.callEndpointAsync(testUrl);

		// Assert
		expect(fetchFn).toHaveBeenCalledWith(testUrl);
	});

	it('returns JSON on successful response', async () => {
		// Arrange
		const data = { foo: 'bar' };
		fetchFn.mockResolvedValue({
			ok: true,
			status: 200,
			json: vi.fn().mockResolvedValue(data),
		});

		// Act
		const result = await apiService.callEndpointAsync<typeof data>(testUrl);

		// Assert
		expect(result).toEqual(data);
	});

	it('returns typed data on successful response', async () => {
		// Arrange
		interface TestData {
			id: number;
			name: string;
		}
		const data = { id: 1, name: 'Test' };
		fetchFn.mockResolvedValue({
			ok: true,
			status: 200,
			json: vi.fn().mockResolvedValue(data),
		});

		// Act
		const result = await apiService.callEndpointAsync<TestData>(testUrl);

		// Assert
		expect(result).toEqual(data);
	});

	it('retries on 429 and succeeds', async () => {
		// Arrange
		const data = { foo: 'bar' };
		const retryResponse = {
			ok: false,
			status: 429,
			headers: {
				get: vi.fn().mockReturnValue('0'), // retry-after header
			},
		};
		const successResponse = {
			ok: true,
			status: 200,
			json: vi.fn().mockResolvedValue(data),
		};
		fetchFn
			.mockResolvedValueOnce(retryResponse)
			.mockResolvedValueOnce(successResponse);

		// Act
		const result = await apiService.callEndpointAsync<typeof data>(testUrl);

		// Assert
		expect(result).toEqual(data);
		expect(fetchFn).toHaveBeenCalledTimes(2);
	});

	it('throws after 5 retries on 429', async () => {
		// Arrange
		const retryResponse = {
			ok: false,
			status: 429,
			headers: {
				get: vi.fn().mockReturnValue('0'),
			},
		};
		fetchFn.mockResolvedValue(retryResponse);

		// Act & Assert
		await expect(apiService.callEndpointAsync(testUrl)).rejects.toThrow();
		expect(fetchFn).toHaveBeenCalledTimes(6); // initial + 5 retries
	});

	it('throws on non-OK, non-429 status', async () => {
		// Arrange
		fetchFn.mockResolvedValue({
			ok: false,
			status: 500,
			headers: {
				get: vi.fn(),
			},
		});

		// Act & Assert
		await expect(apiService.callEndpointAsync(testUrl)).rejects.toThrow();
	});

	it('waits the time specified in retry-after header', async () => {
		// Arrange
		const retryAfterSeconds = 2;
		const retryResponse = {
			ok: false,
			status: 429,
			headers: {
				get: vi.fn().mockReturnValue(retryAfterSeconds.toString()),
			},
		};
		const successResponse = {
			ok: true,
			status: 200,
			json: vi.fn(),
		};
		fetchFn
			.mockResolvedValueOnce(retryResponse)
			.mockResolvedValueOnce(successResponse);
		const sleepSpy = vi.spyOn(global, 'setTimeout');

		// Act
		await apiService.callEndpointAsync(testUrl);

		// Assert
		expect(sleepSpy).toHaveBeenCalledWith(expect.any(Function), 2000);
		sleepSpy.mockRestore();
	});

	it('waits 1 second if retry-after header is missing', async () => {
		// Arrange
		const retryResponse = {
			ok: false,
			status: 429,
			headers: { get: vi.fn().mockReturnValue(undefined) },
		};
		const successResponse = {
			ok: true,
			status: 200,
			json: vi.fn(),
		};
		fetchFn
			.mockResolvedValueOnce(retryResponse)
			.mockResolvedValueOnce(successResponse);
		const sleepSpy = vi.spyOn(global, 'setTimeout');

		// Act
		await apiService.callEndpointAsync(testUrl);

		// Assert
		expect(sleepSpy).toHaveBeenCalledWith(expect.any(Function), 1000);
		sleepSpy.mockRestore();
	});
});
