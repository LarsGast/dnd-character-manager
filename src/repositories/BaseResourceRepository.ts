import { IHomebrewRepository } from "../interfaces/IHomebrewRepository";
import { IMapper } from "../interfaces/IMapper";
import { IResourceRepository } from "../interfaces/IResourceRepository";
import { ISrdApiService } from "../interfaces/ISrdApiService";
import { BaseResourceApiDto } from "../types/api/wrappers/BaseResourceApiDto";
import { BaseResource } from "../types/domain/wrappers/BaseResource";
import { ResourceList } from "../types/domain/wrappers/ResourceList";

/**
 * Base implementation of IResourceRepository.
 * Used as a basis for all resources.
 * Extend this class in specific resource implementations if a resource has more ways to be fetched than just "get" and "get all".
 */
export class BaseResourceRepository<
    TApi extends BaseResourceApiDto, 
    TDomain extends BaseResource
> implements IResourceRepository<TDomain> {

    /**
     * Type of resource the repository should look for.
     * Pass this into the constructor of a specific implementation.
     */
    protected readonly resource: string;

    /**
     * Homebrew repository for fetching homebrew resources.
     */
    protected readonly homebrewRepository: IHomebrewRepository;

    /**
     * API service for fetching SRD resources.
     */
    protected readonly apiService: ISrdApiService;

    /**
     * A mapper for mapping minimal data from API to internal objects.
     */
    protected readonly baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>;

    /**
     * A mapper for mapping full API resources to internal objects.
     */
    protected readonly resourceMapper: IMapper<TApi, TDomain>;

    public constructor(resource: string, homebrewRepository: IHomebrewRepository, apiService: ISrdApiService, baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>, resourceMapper: IMapper<TApi, TDomain>) {
        this.resource = resource;
        this.homebrewRepository = homebrewRepository;
        this.apiService = apiService;
        this.baseResourceMapper = baseResourceMapper;
        this.resourceMapper = resourceMapper;
    }
    
    /**
     * @inheritdoc
     */
    public async getAsync(id: string): Promise<TDomain | undefined> {

        // Try the homebrew repository first.
        // Homebrew resources have an ID of type UUID, and the SRD API does not.
        // That's why we can safely try the homebrew repo before the API service.
        const homebrewValue = this.homebrewRepository.get<TDomain>(id);
        if (homebrewValue !== undefined) {
            return homebrewValue;
        }

        // No homebrew value? Try the API.
        const valueFromApi = await this.apiService.getByIndexAsync<TApi>(this.resource, id);
        if (valueFromApi !== undefined) {
            // Map the API resource to an internal object.
            return this.resourceMapper.map(valueFromApi);
        }

        return undefined;
    }
    
    /**
     * @inheritdoc
     */
    public async getAllAsync(): Promise<ResourceList> {

        // Since we want to get ALL resources, we'll add the homebrew and SRD resources together.
        const homebrewValues = this.homebrewRepository.getAllByResourceType(this.resource);
        const valueFromApi = await this.apiService.getResourceListAsync(this.resource);

        return {
            count: homebrewValues.length + valueFromApi.count,
            results: [...homebrewValues, ...valueFromApi.results.map(r => this.baseResourceMapper.map(r))]
        }
    }
}