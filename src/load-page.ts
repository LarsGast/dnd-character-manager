import { getCache, saveCache } from "./services/cache.js";
import { baseUrl } from "./services/api.js";

/**
 * Starting point for all JavaScript code for the PC-Builder page.
 * This one function should bring the page to a functioning state.
 */
export function loadPage(): void {

    // Clean the cache.
    cleanCache();
}

/**
 * Clean the cache, remove unwanted entries.
 */
function cleanCache(): void {
    const cache = getCache();

    for (const key in cache) {

        // Remove all entries that are not from the SRD API.
        if (!key.includes(baseUrl)) {
            delete cache[key];
        }
    }

    saveCache(cache);
}