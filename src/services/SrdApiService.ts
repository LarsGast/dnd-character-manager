import { IApiService } from '../interfaces/IApiService';
import { ICacheService } from '../interfaces/ICacheService';
import { ISrdApiService } from '../interfaces/ISrdApiService';
import { ResourceTypeApiDto } from '../types/api/helpers/ResourceTypeApiDto';
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
	 * @param resourceTypeMapper See SrdApiService.resourceTypeMapper
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
		resourceType: ResourceTypeApiDto,
	): Promise<ResourceListApiDto> {
		return await this.getByEndpointAsync<ResourceListApiDto>(
			this.getResourceTypePath(resourceType),
		);
	}

	/**
	 * @inheritdoc
	 */
	public async getByIndexAsync<T extends BaseResourceApiDto>(
		resourceType: ResourceTypeApiDto,
		index: string,
	): Promise<T> {
		return await this.getByEndpointAsync<T>(
			`${this.getResourceTypePath(resourceType)}/${index}`,
		);
	}

	private getResourceTypePath(resourceType: ResourceTypeApiDto): string {
		switch (resourceType) {
			case ResourceTypeApiDto.AbilityScore:
				return 'ability-scores';
			case ResourceTypeApiDto.Alignment:
				return 'alignments';
			case ResourceTypeApiDto.Background:
				return 'backgrounds';
			case ResourceTypeApiDto.Class:
				return 'classes';
			case ResourceTypeApiDto.Equipment:
				return 'equipment';
			case ResourceTypeApiDto.EquipmentCategory:
				return 'equipment-categories';
			case ResourceTypeApiDto.Feature:
				return 'features';
			case ResourceTypeApiDto.Language:
				return 'languages';
			case ResourceTypeApiDto.Proficiency:
				return 'proficiencies';
			case ResourceTypeApiDto.Race:
				return 'races';
			case ResourceTypeApiDto.Skill:
				return 'skills';
			case ResourceTypeApiDto.Spell:
				return 'spells';
			case ResourceTypeApiDto.Subclass:
				return 'subclasses';
			case ResourceTypeApiDto.Subrace:
				return 'subraces';
			case ResourceTypeApiDto.Trait:
				return 'traits';
		}
	}
}
