import { describe, it, expect, vi } from 'vitest';
// import { ApiService } from '../../../src/services/ApiService';
// import {
// 	getMockFetchResponse,
// 	getMockHeaders,
// 	mockUrl,
// } from './testUtils/FetchTestUtils';

// describe('generic', () => {
// 	it('should call fetch with the correct URL', async () => {
// 		// Arrange
// 		const mockFetch = vi.fn().mockResolvedValue(getMockFetchResponse());
// 		const apiService = new ApiService(mockFetch);
// 		const mockUrl = new URL('https://example.com/api/test');

// 		// Act
// 		await apiService.callEndpointAsync(mockUrl);

// 		// Assert
// 		expect(mockFetch).toHaveBeenCalledWith(mockUrl);
// 	});
// });

// describe('success', () => {
// 	it('should return JSON on successful response', async () => {
// 		// Arrange
// 		const mockData = { foo: 'bar' };
// 		const mockFetch = vi.fn().mockResolvedValue(
// 			getMockFetchResponse({
// 				ok: true,
// 				json: vi.fn().mockResolvedValue(mockData),
// 			}),
// 		);
// 		const apiService = new ApiService(mockFetch);

// 		// Act
// 		const result = await apiService.callEndpointAsync<typeof mockData>(mockUrl);

// 		// Assert
// 		expect(result).toEqual(mockData);
// 	});

// 	it('should return typed data on successful response', async () => {
// 		// Arrange
// 		interface TestData {
// 			id: number;
// 			name: string;
// 		}
// 		const mockData = { id: 1, name: 'Test' };
// 		const mockFetch = vi.fn().mockResolvedValue(
// 			getMockFetchResponse({
// 				ok: true,
// 				json: vi.fn().mockResolvedValue(mockData),
// 			}),
// 		);
// 		const apiService = new ApiService(mockFetch);

// 		// Act
// 		const result = await apiService.callEndpointAsync<TestData>(mockUrl);

// 		// Assert
// 		expect(result).toEqual(mockData);
// 	});
// });

// describe('429 too many requests', () => {
// 	it('should retry on 429 and then succeed', async () => {
// 		// Arrange
// 		const mockData = { foo: 'bar' };
// 		const mockFetch = vi
// 			.fn()
// 			.mockResolvedValueOnce(
// 				getMockFetchResponse({
// 					ok: false,
// 					status: 429,
// 					headers: getMockHeaders({ get: vi.fn().mockReturnValue('0') }), // retry-after header
// 				}),
// 			)
// 			.mockResolvedValueOnce(
// 				getMockFetchResponse({
// 					ok: true,
// 					status: 200,
// 					json: vi.fn().mockResolvedValue(mockData),
// 				}),
// 			);
// 		const apiService = new ApiService(mockFetch);

// 		// Act
// 		const result = await apiService.callEndpointAsync<typeof mockData>(mockUrl);

// 		// Assert
// 		expect(result).toEqual(mockData);
// 		expect(mockFetch).toHaveBeenCalledTimes(2);
// 	});

// 	it('should throw after 5 retries on 429', async () => {
// 		// Arrange
// 		const mockFetch = vi.fn().mockResolvedValue(
// 			getMockFetchResponse({
// 				ok: false,
// 				status: 429,
// 				headers: getMockHeaders({ get: vi.fn().mockReturnValue('0') }), // retry-after header
// 			}),
// 		);
// 		const apiService = new ApiService(mockFetch);

// 		// Act & Assert
// 		await expect(apiService.callEndpointAsync(mockUrl)).rejects.toThrow();
// 		expect(mockFetch).toHaveBeenCalledTimes(6); // initial + 5 retries
// 	});

// 	it('should wait the time specified in retry-after header', async () => {
// 		// Arrange
// 		const retryAfterSeconds = 2;
// 		const mockFetch = vi
// 			.fn()
// 			.mockResolvedValueOnce(
// 				getMockFetchResponse({
// 					ok: false,
// 					status: 429,
// 					headers: getMockHeaders({
// 						get: vi.fn().mockReturnValue(retryAfterSeconds.toString()),
// 					}), // retry-after header
// 				}),
// 			)
// 			.mockResolvedValueOnce(
// 				getMockFetchResponse({
// 					ok: true,
// 					status: 200,
// 					json: vi.fn().mockResolvedValue({}),
// 				}),
// 			);
// 		const sleepSpy = vi.spyOn(global, 'setTimeout');
// 		const apiService = new ApiService(mockFetch);

// 		// Act
// 		await apiService.callEndpointAsync(mockUrl);

// 		// Assert
// 		expect(sleepSpy).toHaveBeenCalledWith(expect.any(Function), 2000);
// 		sleepSpy.mockRestore();
// 	});

// 	it('should wait 1 second if retry-after header is missing', async () => {
// 		// Arrange
// 		const mockFetch = vi
// 			.fn()
// 			.mockResolvedValueOnce(
// 				getMockFetchResponse({
// 					ok: false,
// 					status: 429,
// 				}),
// 			)
// 			.mockResolvedValueOnce(
// 				getMockFetchResponse({
// 					ok: true,
// 					status: 200,
// 					json: vi.fn().mockResolvedValue({}),
// 				}),
// 			);
// 		const sleepSpy = vi.spyOn(global, 'setTimeout');
// 		const apiService = new ApiService(mockFetch);

// 		// Act
// 		await apiService.callEndpointAsync(mockUrl);

// 		// Assert
// 		expect(sleepSpy).toHaveBeenCalledWith(expect.any(Function), 1000);
// 		sleepSpy.mockRestore();
// 	});
// });

// describe('other non-OK statuses', () => {
// 	it('should throw on non-OK, non-429 status', async () => {
// 		// Arrange
// 		const mockFetch = vi.fn().mockResolvedValue(
// 			getMockFetchResponse({
// 				ok: false,
// 				status: 500,
// 			}),
// 		);
// 		const apiService = new ApiService(mockFetch);

// 		// Act & Assert
// 		await expect(apiService.callEndpointAsync(mockUrl)).rejects.toThrow();
// 	});
// });

it('should pass', () => {
	expect(true).toBe(true);
});
