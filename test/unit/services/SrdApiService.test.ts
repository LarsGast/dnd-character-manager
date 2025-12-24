import { describe, expect, it, vi } from 'vitest';
import { getMockApiService } from './testUtils/ApiServiceTestUtils';
import { getMockCacheService } from './testUtils/CacheServiceTestUtils';
import { SrdApiService } from '../../../src/services/SrdApiService';
import { mockEndpoint } from './testUtils/SrdApiServiceTestUtils';
import { ResourceType } from '../../../src/types/domain/helpers/ResourceType';
import { ResourceTypeApiDto } from '../../../src/types/api/helpers/ResourceTypeApiDto';

describe('getByEndpointAsync', () => {
	it('should return cached value when present', async () => {
		// Arrange
		const mockCachedValue = {
			name: 'Fireball',
		};
		const cacheService = getMockCacheService({
			get: <T>() => mockCachedValue as T,
		});
		const apiService = getMockApiService();
		const srdApiService = new SrdApiService(cacheService, apiService);

		// Act
		const result = await srdApiService.getByEndpointAsync(mockEndpoint);

		// Assert
		expect(result).toEqual({ name: 'Fireball' });
	});

	it('should return api value on cache miss', async () => {
		// Arrange
		const mockApiValue = {
			name: 'Fireball',
		};
		const cacheService = getMockCacheService({ get: <T>() => undefined });
		const apiService = getMockApiService({
			callEndpointAsync: async <T>() => mockApiValue as T,
		});
		const srdApiService = new SrdApiService(cacheService, apiService);

		// Act
		const result = await srdApiService.getByEndpointAsync(mockEndpoint);

		// Assert
		expect(result).toEqual({ name: 'Fireball' });
	});

	it('should cache api value on cache miss', async () => {
		// Arrange
		const cacheSetMockFunction = vi.fn();
		const cacheService = getMockCacheService({
			get: () => undefined,
			set: cacheSetMockFunction,
		});
		const mockApiValue = {
			name: 'Fireball',
		};
		const apiService = getMockApiService({
			callEndpointAsync: async <T>() => mockApiValue as T,
		});
		const srdApiService = new SrdApiService(cacheService, apiService);

		// Act
		await srdApiService.getByEndpointAsync(mockEndpoint);

		// Assert
		expect(cacheSetMockFunction).toHaveBeenCalledWith(expect.any(String), {
			name: 'Fireball',
		});
	});

	it('should cache the response with the correct key', async () => {
		// Arrange
		const cacheSetMockFunction = vi.fn();
		const cacheService = getMockCacheService({
			set: cacheSetMockFunction,
		});
		const apiService = getMockApiService();
		const srdApiService = new SrdApiService(cacheService, apiService);
		const mockEndpoint = 'spells/fireball';

		// Act
		await srdApiService.getByEndpointAsync(mockEndpoint);

		// Assert
		expect(cacheSetMockFunction).toHaveBeenCalledWith(
			'https://www.dnd5eapi.co/api/2014/spells/fireball',
			expect.any(Object),
		);
	});

	it('should call API with the correct key', async () => {
		// Arrange
		const apiCallMockFunction = vi.fn();
		const cacheService = getMockCacheService();
		const apiService = getMockApiService({
			callEndpointAsync: apiCallMockFunction,
		});
		const srdApiService = new SrdApiService(cacheService, apiService);
		const mockEndpoint = 'spells/fireball';
		const expectedUrl = new URL(
			'https://www.dnd5eapi.co/api/2014/spells/fireball',
		);

		// Act
		await srdApiService.getByEndpointAsync(mockEndpoint);

		// Assert
		expect(apiCallMockFunction).toHaveBeenCalledWith(expectedUrl);
	});

	it('should not set cache when api call throws', async () => {
		// Arrange
		const cacheSetMockFunction = vi.fn();
		const cacheService = getMockCacheService({
			set: cacheSetMockFunction,
		});
		const apiService = getMockApiService({
			callEndpointAsync: async () => {
				throw new Error('API call failed');
			},
		});
		const srdApiService = new SrdApiService(cacheService, apiService);
		const mockEndpoint = 'spells/fireball';

		// Act
		try {
			await srdApiService.getByEndpointAsync(mockEndpoint);
		} catch (error) {
			// Ignore error for test purposes
		}

		// Assert
		expect(cacheSetMockFunction).not.toHaveBeenCalled();
	});
});

describe('getResourceListAsync', () => {
	it('should fetch a resource using the resource endpoint', async () => {
		// Arrange
		const mockResourceType = ResourceTypeApiDto.Spell;
		const cacheService = getMockCacheService();
		const apiService = getMockApiService();
		const srdApiService = new SrdApiService(cacheService, apiService);
		const mockGetByEndpointAsync = vi.fn();
		srdApiService.getByEndpointAsync = mockGetByEndpointAsync;

		// Act
		await srdApiService.getResourceListAsync(mockResourceType);

		// Assert
		expect(mockGetByEndpointAsync).toHaveBeenCalledWith('spells');
	});
});

describe('getByIndexAsync', () => {
	it('should fetch a resource using the `${resource}/${index}` endpoint', async () => {
		// Arrange
		const mockResourceType = ResourceTypeApiDto.Spell;
		const mockIndex = 'fireball';
		const cacheService = getMockCacheService();
		const apiService = getMockApiService();
		const srdApiService = new SrdApiService(cacheService, apiService);
		const mockGetByEndpointAsync = vi.fn();
		srdApiService.getByEndpointAsync = mockGetByEndpointAsync;

		// Act
		await srdApiService.getByIndexAsync(mockResourceType, mockIndex);

		// Assert
		expect(mockGetByEndpointAsync).toHaveBeenCalledWith('spells/fireball');
	});
});
