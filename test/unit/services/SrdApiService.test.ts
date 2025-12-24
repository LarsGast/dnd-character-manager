import { describe, expect, it, vi } from 'vitest';
import { getMockApiService } from './testUtils/ApiServiceTestUtils';
import { getMockCacheService } from './testUtils/CacheServiceTestUtils';
import { SrdApiService } from '../../../src/services/SrdApiService';
import { mockEndpoint } from './testUtils/SrdApiServiceTestUtils';
import { ResourceTypeApiDto } from '../../../src/types/api/helpers/ResourceTypeApiDto';
import { getMockResourceTypeApiDtoTranscriber } from './testUtils/TranscriberTestUtils';

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
		const transcriberService = getMockResourceTypeApiDtoTranscriber();
		const srdApiService = new SrdApiService(
			cacheService,
			apiService,
			transcriberService,
		);

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
		const transcriberService = getMockResourceTypeApiDtoTranscriber();
		const srdApiService = new SrdApiService(
			cacheService,
			apiService,
			transcriberService,
		);

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
		const transcriberService = getMockResourceTypeApiDtoTranscriber();
		const srdApiService = new SrdApiService(
			cacheService,
			apiService,
			transcriberService,
		);

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
		const transcriberService = getMockResourceTypeApiDtoTranscriber();
		const srdApiService = new SrdApiService(
			cacheService,
			apiService,
			transcriberService,
		);
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
		const transcriberService = getMockResourceTypeApiDtoTranscriber();
		const srdApiService = new SrdApiService(
			cacheService,
			apiService,
			transcriberService,
		);
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
		const transcriberService = getMockResourceTypeApiDtoTranscriber();
		const srdApiService = new SrdApiService(
			cacheService,
			apiService,
			transcriberService,
		);
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
		const mockResourceTypePath = 'spells';
		const mockResourceType = ResourceTypeApiDto.Spell;
		const cacheService = getMockCacheService();
		const apiService = getMockApiService();
		const transcriberService = getMockResourceTypeApiDtoTranscriber({
			transcribeToApiPath: () => {
				return mockResourceTypePath;
			},
		});
		const srdApiService = new SrdApiService(
			cacheService,
			apiService,
			transcriberService,
		);
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
		const mockResourceTypePath = 'spells';
		const mockIndex = 'fireball';
		const mockResourceType = ResourceTypeApiDto.Spell;
		const cacheService = getMockCacheService();
		const apiService = getMockApiService();
		const transcriberService = getMockResourceTypeApiDtoTranscriber({
			transcribeToApiPath: () => {
				return mockResourceTypePath;
			},
		});
		const srdApiService = new SrdApiService(
			cacheService,
			apiService,
			transcriberService,
		);
		const mockGetByEndpointAsync = vi.fn();
		srdApiService.getByEndpointAsync = mockGetByEndpointAsync;

		// Act
		await srdApiService.getByIndexAsync(mockResourceType, mockIndex);

		// Assert
		expect(mockGetByEndpointAsync).toHaveBeenCalledWith('spells/fireball');
	});
});
