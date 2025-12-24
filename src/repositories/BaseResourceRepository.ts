import { IHomebrewRepository } from '../interfaces/IHomebrewRepository';
import { IMapper } from '../interfaces/IMapper';
import { IResourceRepository } from '../interfaces/IResourceRepository';
import { ISrdApiService } from '../interfaces/ISrdApiService';
import { ResourceTypeApiDto } from '../types/api/helpers/ResourceTypeApiDto';
import { BaseResourceApiDto } from '../types/api/wrappers/BaseResourceApiDto';
import { ResourceType } from '../types/domain/helpers/ResourceType';
import { BaseResource } from '../types/domain/wrappers/BaseResource';
import { ResourceList } from '../types/domain/wrappers/ResourceList';
import { Result } from '../utils/Result';
import { ResourceTypeRecord } from '../types/storage/helpers/ResourceTypeRecord';
import { BaseResourceRecord } from '../types/storage/wrappers/BaseResourceRecord';

/**
 * Base implementation of IResourceRepository.
 * Used as a basis for all resources.
 * Extend this class in specific resource implementations if a resource has more ways to be fetched than just "get" and "get all".
 * @template TDomain The domain type the repository will return.
 * @template TApi The API type the repository will fetch from the SRD API.
 * @template TStorage The storage type the repository will fetch from homebrew storage. Defaults to BaseResourceRecord if the resource does not have homebrew support (yet).
 */
export class BaseResourceRepository<
	TDomain extends BaseResource,
	TApi extends BaseResourceApiDto,
	TStorage extends BaseResourceRecord = BaseResourceRecord,
> implements IResourceRepository<TDomain>
{
	/**
	 * Type of resource the repository should look for.
	 * Pass this into the constructor of a specific implementation.
	 */
	protected readonly resourceType: ResourceType;

	protected readonly resourceTypeDomainToApiMapper: IMapper<
		ResourceType,
		ResourceTypeApiDto
	>;

	protected readonly resourceTypeDomainToStorageMapper: IMapper<
		ResourceType,
		ResourceTypeRecord
	>;

	/**
	 * Homebrew repository for fetching homebrew resources.
	 */
	protected readonly homebrewRepository: IHomebrewRepository;

	/**
	 * API service for fetching SRD resources.
	 */
	protected readonly apiService: ISrdApiService;

	/**
	 * A mapper for mapping minimal data from API to domain objects.
	 */
	protected readonly baseResourceApiToDomainMapper: IMapper<
		BaseResourceApiDto,
		BaseResource
	>;

	/**
	 * A mapper for mapping full API resources to domain objects.
	 */
	protected readonly resourceApiToDomainMapper: IMapper<TApi, TDomain>;

	/**
	 * A mapper for mapping minimal data from storage to domain objects.
	 * undefined if the resource is not supported as homebrew.
	 */
	protected readonly baseResourceStorageToDomainMapper?: IMapper<
		BaseResourceRecord,
		BaseResource
	>;

	/**
	 * A mapper for mapping full storage resources to domain objects.
	 * undefined if the resource is not supported as homebrew.
	 */
	protected readonly resourceStorageToDomainMapper?: IMapper<TStorage, TDomain>;

	public constructor(
		resource: ResourceType,
		resourceTypeDomainToApiMapper: IMapper<ResourceType, ResourceTypeApiDto>,
		resourceTypeDomainToStorageMapper: IMapper<
			ResourceType,
			ResourceTypeRecord
		>,
		homebrewRepository: IHomebrewRepository,
		apiService: ISrdApiService,
		baseResourceApiToDomainMapper: IMapper<BaseResourceApiDto, BaseResource>,
		resourceApiToDomainMapper: IMapper<TApi, TDomain>,
		baseResourceStorageMapper?: IMapper<BaseResourceRecord, BaseResource>,
		resourceStorageMapper?: IMapper<TStorage, TDomain>,
	) {
		this.resourceType = resource;
		this.resourceTypeDomainToApiMapper = resourceTypeDomainToApiMapper;
		this.resourceTypeDomainToStorageMapper = resourceTypeDomainToStorageMapper;
		this.homebrewRepository = homebrewRepository;
		this.apiService = apiService;
		this.baseResourceApiToDomainMapper = baseResourceApiToDomainMapper;
		this.resourceApiToDomainMapper = resourceApiToDomainMapper;
		this.baseResourceStorageToDomainMapper = baseResourceStorageMapper;
		this.resourceStorageToDomainMapper = resourceStorageMapper;
	}

	/**
	 * @inheritdoc
	 */
	public async getAsync(id: string): Promise<TDomain | undefined> {
		// Try the homebrew repository first.
		// Homebrew resources have an ID of type UUID, and the SRD API does not.
		// That's why we can safely try the homebrew repo before the API service.
		const homebrewValue = this.homebrewRepository.get<TStorage>(id);
		if (homebrewValue !== undefined) {
			return this.resourceStorageToDomainMapper!.map(homebrewValue);
		}

		// No homebrew value? Try the API.
		const valueFromApi = await this.apiService.getByIndexAsync<TApi>(
			this.resourceTypeDomainToApiMapper.map(this.resourceType),
			id,
		);
		if (valueFromApi !== undefined) {
			// Map the API resource to an internal object.
			return this.resourceApiToDomainMapper.map(valueFromApi);
		}

		return undefined;
	}

	/**
	 * @inheritdoc
	 */
	public async getAllAsync(): Promise<ResourceList> {
		// Since we want to get ALL resources, we'll add the homebrew and SRD resources together.
		const getResourceTypeRecordResult = Result.tryPerform(() =>
			this.resourceTypeDomainToStorageMapper.map(this.resourceType),
		);
		const homebrewValues = getResourceTypeRecordResult.getIsSuccess()
			? this.homebrewRepository.getAllByResourceType(
					getResourceTypeRecordResult.getValueOrThrow(),
				)
			: [];

		const valueFromApi = await this.apiService.getResourceListAsync(
			this.resourceTypeDomainToApiMapper.map(this.resourceType),
		);

		return {
			count: homebrewValues.length + valueFromApi.count,
			results: [
				...homebrewValues.map((r) =>
					this.baseResourceStorageToDomainMapper!.map(r),
				),
				...valueFromApi.results.map((r) =>
					this.baseResourceApiToDomainMapper.map(r),
				),
			],
		};
	}
}
