import { ICacheService } from '../interfaces/ICacheService';
import { IStorageService } from '../interfaces/IStorageService';

/**
 * Implementation of ICacheService that provides caching functionality using an underlying storage service.
 * Adds a prefix to all cache keys to avoid collisions with other stored data.
 */
export class CacheService implements ICacheService {
	/**
	 * Prefix for all cache keys to avoid collisions in storage.
	 */
	private static readonly CACHE_KEY_PREFIX = 'cache_';

	/**
	 * Storage service where the cache is stored in.
	 */
	private readonly storageService: IStorageService;

	public constructor(storageService: IStorageService) {
		this.storageService = storageService;
	}

	/**
	 * @inheritdoc
	 */
	public get<T>(key: string): T | undefined {
		const cacheKey = this.getCacheKey(key);
		return this.storageService.get(cacheKey);
	}

	/**
	 * @inheritdoc
	 */
	public set<T>(key: string, data: T): void {
		const cacheKey = this.getCacheKey(key);
		this.storageService.set(cacheKey, data);
	}

	/**
	 * @inheritdoc
	 */
	public delete(key: string): void {
		const cacheKey = this.getCacheKey(key);
		this.storageService.delete(cacheKey);
	}

	/**
	 * Generate a cache key with prefix to avoid collisions.
	 * @param key The key to be used for caching.
	 * @returns The full cache key with prefix.
	 */
	private getCacheKey(key: string): string {
		return `${CacheService.CACHE_KEY_PREFIX}${key}`;
	}
}
