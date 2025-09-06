const CACHE_KEY_LOCAL = "cache";

/**
 * Add a value to the cache.
 * @param key Identifier of the cached value.
 * @param value The value to cache.
 */
export function addToCache(key: string, value: any): void {

    const cache = getCache();

    cache[key] = value;

    saveCache(cache);
}

/**
 * Get a value from the cache.
 * @param key Identifier of the cached value.
 * @returns undefined if no value exists in the cache with given key.
 */
export function getFromCache(key: string): any {
    const cache = getCache();
    return cache[key];
}

/**
 * Get the cache object from local storage.
 * @returns Full cache object.
 */
export function getCache(): any {

    const cacheAsString = localStorage.getItem(CACHE_KEY_LOCAL);
    try {
        const cache = cacheAsString ? JSON.parse(cacheAsString) : null;

        if (cache === null) {
            saveCache({});
            return {};
        }

        return cache;
    } catch (error) {
        console.error("Error parsing cache JSON:", error);
        return {};
    }
}

/**
 * Save the cache object to local storage.
 * @param cache cache as JSON.
 */
export function saveCache(cache: {}): void {

    try {
        const cacheAsString = JSON.stringify(cache);
        localStorage.setItem(CACHE_KEY_LOCAL, cacheAsString);
    }
    catch (error) {
        console.error("Error while saving cache:", error);
        console.log("Cache JSON:", cache);
    }
}