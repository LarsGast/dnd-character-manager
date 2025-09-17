import { ICacheService } from "../interfaces/ICacheService";

export class CacheService implements ICacheService {

    /**
     * Prefix for all cache keys to avoid collisions in local storage.
     */
    private static readonly CACHE_KEY_PREFIX = "cache";

    /**
     * @inheritdoc
     */
    public get<T>(key: string): T | undefined {

        const cacheKey = this.getCacheKey(key);
        const value = localStorage.getItem(cacheKey);
        if (!value) {
            return undefined;
        }

        return JSON.parse(value) as T;
    }

    /**
     * @inheritdoc
     */
    public set<T>(key: string, data: T): void {
        const cacheKey = this.getCacheKey(key);
        const dataAsString = JSON.stringify(data);

        localStorage.setItem(cacheKey, dataAsString);
    }

    /**
     * Generate a cache key with prefix to avoid collisions.
     * @param key The key to be used for caching.
     * @returns The full cache key with prefix.
     */
    private getCacheKey(key: string): string {
        return `${CacheService.CACHE_KEY_PREFIX}-${key}`;
    }
}