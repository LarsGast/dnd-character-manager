const CACHE_KEY_LOCAL = "cache";

/**
 * Add a value to the cache.
 * @param {string} key Identifier of the cached value.
 * @param {JSON} value The value to cache.
 */
export const addToCache = function(key, value) {

    const cache = getCache();

    cache[key] = value;

    saveCache(cache);
}

/**
 * Get a value from the cache.
 * @param {string} key Identifier of the cached value.
 * @returns {JSON | undefined} undefined if no value exists in the cache with given key.
 */
export const getFromCache = function(key) {
    const cache = getCache();
    return cache[key];
}

/**
 * Get the cache object from local storage.
 * @returns {JSON} Full cache object.
 */
const getCache = function() {

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
};

/**
 * Save the cache object to local storage.
 * @param {JSON} cache cache as JSON.
 */
const saveCache = function(cache) {

    try {
        const cacheAsString = JSON.stringify(cache);
        localStorage.setItem(CACHE_KEY_LOCAL, cacheAsString);
    }
    catch (error) {
        console.error("Error while saving cache:", error);
        console.log("Cache JSON:", playerCharacter);
    }
};