import { ICacheService } from "../interfaces/ICacheService";
import { ISrdApiService } from "../interfaces/ISrdApiService";
import { BaseResourceApiDto } from "../types/api/wrappers/BaseResourceApiDto";
import { ResourceListApiDto } from "../types/api/wrappers/ResourceListApiDto";

export class SrdApiService implements ISrdApiService {

    /**
     * Base URL of the SRD API.
     */
    private static readonly baseUrl: string = 'https://www.dnd5eapi.co/api/2014';

    /**
     * The cache service to use for caching API responses.
     */
    private readonly cacheService: ICacheService;

    /**
     * Fetch function to use for making HTTP requests. This allows for easier testing and mocking.
     */
    private readonly fetchFn: typeof fetch;
    
    /**
     * Constructor for SrdApiService.
     * @param cacheService See SrdApiService.cacheService
     * @param fetchFn See SrdApiService.fetchFn
     */
    public constructor(cacheService: ICacheService, fetchFn: typeof fetch) {
        this.cacheService = cacheService;
        this.fetchFn = fetchFn;
    }

    /**
     * @inheritdoc
     */
    public async getByUrlAsync<T>(url: URL): Promise<T> {

        const cacheKey = url.toString();

        const valueFromCache = this.cacheService.get<T>(cacheKey);
        if (valueFromCache !== undefined) {
            return valueFromCache;
        }

        const valueFromApi = await this.getApiDataAsync<T>(url);
        this.cacheService.set<T>(cacheKey, valueFromApi);

        return valueFromApi;
    }

    /**
     * @inheritdoc
     */
    public async getResourceListAsync<T extends BaseResourceApiDto>(resource: string): Promise<ResourceListApiDto<T>> {
        return await this.getByUrlAsync<ResourceListApiDto<T>>(new URL(`${SrdApiService.baseUrl}/${resource}`));
    }

    /**
     * @inheritdoc
     */
    public async getByIndexAsync<T extends BaseResourceApiDto>(resource: string, index: string): Promise<T> {
        return await this.getByUrlAsync<T>(new URL(`${SrdApiService.baseUrl}/${resource}/${index}`));
    }

    /**
     * Perform an API call and get the data.
     * @param url The URL to call.
     * @param retryCount Number of retries in case of rate limiting.
     * @returns The data from the API as the specified type.
     */
    private async getApiDataAsync<T>(url: URL, retryCount: number = 0): Promise<T> {
        const response = await this.fetchFn(url);

        // Success.
        if (response.ok) {
            return await response.json();
        }

        // Too Many Requests (HTTP 429) - rate limiting.
        if (response.status === 429) {

            if (retryCount >= 5) {
                throw new Error("Too many retries, giving up.");
            }

            const retryAfterMs = 1000; // The `retry-after` header is not provided by the API, so we use a fixed delay.
            console.warn(`Rate limit hit. Retrying after ${retryAfterMs} ms...`);
            await new Promise(resolve => setTimeout(resolve, retryAfterMs));
            return await this.getApiDataAsync<T>(url, retryCount + 1);
        }

        // Any other error status.
        throw new Error(`Response status: ${response.status}`);
    }
}