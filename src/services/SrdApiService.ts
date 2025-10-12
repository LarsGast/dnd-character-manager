import { IApiService } from '../interfaces/IApiService';
import { ICacheService } from '../interfaces/ICacheService';
import { ISrdApiService } from '../interfaces/ISrdApiService';
import { BaseResourceApiDto } from '../types/api/wrappers/BaseResourceApiDto';
import { ResourceListApiDto } from '../types/api/wrappers/ResourceListApiDto';

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
	 * The API service to use for making HTTP requests.
	 */
	private readonly apiService: IApiService;

	/**
	 * Constructor for SrdApiService.
	 * @param cacheService See SrdApiService.cacheService
	 * @param apiService See SrdApiService.apiService
	 */
	public constructor(cacheService: ICacheService, apiService: IApiService) {
		this.cacheService = cacheService;
		this.apiService = apiService;
	}

	/**
	 * @inheritdoc
	 */
	public async getByEndpointAsync<T>(endpoint: string): Promise<T> {
		const url = new URL(`${SrdApiService.baseUrl}/${endpoint}`);

		const cacheKey = url.toString();

		const valueFromCache = this.cacheService.get<T>(cacheKey);
		if (valueFromCache !== undefined) {
			return valueFromCache;
		}

		const valueFromApi = await this.apiService.callEndpointAsync<T>(url);
		this.cacheService.set<T>(cacheKey, valueFromApi);

		return valueFromApi;
	}

	/**
	 * @inheritdoc
	 */
	public async getResourceListAsync(
		resource: string,
	): Promise<ResourceListApiDto> {
		return await this.getByEndpointAsync<ResourceListApiDto>(resource);
	}

	/**
	 * @inheritdoc
	 */
	public async getByIndexAsync<T extends BaseResourceApiDto>(
		resource: string,
		index: string,
	): Promise<T> {
		return await this.getByEndpointAsync<T>(`${resource}/${index}`);
	}
}
