// @vitest-environment jsdom

import { expect, it, vi } from 'vitest';
import { srdApiService, apiService } from '../../../src/wiring/dependencies';

it('should not fetch from API if called twice', async () => {
	// Arrange
	const mockFetch = vi.fn().mockResolvedValue({
		ok: true,
		json: () => Promise.resolve({ name: 'Fireball' }),
	});

	// Mock the private fetchFn property using vi.spyOn
	vi.spyOn(apiService as any, 'fetchFn', 'get').mockReturnValue(mockFetch);

	const mockEndpoint = 'spells/fireball';

	// Act
	await srdApiService.getByEndpointAsync(mockEndpoint);
	const cachedResult = await srdApiService.getByEndpointAsync(mockEndpoint);

	// Assert
	expect(mockFetch).toHaveBeenCalledTimes(1);
	expect(cachedResult).toEqual({ name: 'Fireball' });
});
