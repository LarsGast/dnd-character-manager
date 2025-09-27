/**
 * Interface for a cache service.
 */
export interface ICacheService {
	/**
	 * Get a value from the cache.
	 * @param key Identifier of the cached value.
	 * @returns undefined if no value exists in the cache with given key.
	 */
	get<T>(key: string): T | undefined;

	/**
	 * Add a value to the cache.
	 * @param key Identifier of the cached value.
	 * @param data The value to cache.
	 */
	set<T>(key: string, data: T): void;

	/**
	 * Delete a value from the cache.
	 * @param key Identifier of the cached value.
	 */
	delete(key: string): void;
}
