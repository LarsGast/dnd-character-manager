import { describe, expect, it, Mock, vi } from 'vitest';
import { CacheService } from '../../../src/services/CacheService';
import { getMockStorageService } from './testUtils/StorageServiceTestUtils';

describe('get', () => {
	it('should call storageService.get with prefixed key', () => {
		// Arrange
		const mockStorageService = getMockStorageService({ get: vi.fn() });
		const cacheService = new CacheService(mockStorageService);
		const testKey = 'testKey';

		// Act
		cacheService.get(testKey);

		// Assert
		expect(mockStorageService.get).toHaveBeenCalledWith('cache_' + testKey);
	});
});

describe('set', () => {
	it('should call storageService.set with prefixed key', () => {
		// Arrange
		const mockStorageService = getMockStorageService({ set: vi.fn() });
		const cacheService = new CacheService(mockStorageService);
		const testKey = 'testKey';
		const testValue = 'testValue';

		// Act
		cacheService.set(testKey, testValue);

		// Assert
		expect(mockStorageService.set).toHaveBeenCalledWith(
			'cache_' + testKey,
			testValue,
		);
	});
});

describe('delete', () => {
	it('should call storageService.delete with prefixed key', () => {
		// Arrange
		const mockStorageService = getMockStorageService({ delete: vi.fn() });
		const cacheService = new CacheService(mockStorageService);
		const testKey = 'testKey';

		// Act
		cacheService.delete(testKey);

		// Assert
		expect(mockStorageService.delete).toHaveBeenCalledWith('cache_' + testKey);
	});
});
