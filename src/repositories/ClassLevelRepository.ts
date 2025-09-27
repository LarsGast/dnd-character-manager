import { IClassLevelRepository } from '../interfaces/IClassLevelRepository.js';
import { IHomebrewRepository } from '../interfaces/IHomebrewRepository.js';
import { IMapper } from '../interfaces/IMapper.js';
import { ISrdApiService } from '../interfaces/ISrdApiService.js';
import { ClassLevelApiDto } from '../types/api/resources/ClassLevelApiDto.js';
import { BaseResourceApiDto } from '../types/api/wrappers/BaseResourceApiDto.js';
import { ClassLevel } from '../types/domain/resources/ClassLevel.js';
import { BaseResource } from '../types/domain/wrappers/BaseResource.js';

export class ClassLevelRepository implements IClassLevelRepository {
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
	protected readonly baseResourceMapper: IMapper<
		BaseResourceApiDto,
		BaseResource
	>;

	/**
	 * A mapper for mapping full API resources to internal objects.
	 */
	protected readonly classLevelMapper: IMapper<ClassLevelApiDto, ClassLevel>;

	public constructor(
		homebrewRepository: IHomebrewRepository,
		apiService: ISrdApiService,
		baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>,
		classLevelMapper: IMapper<ClassLevelApiDto, ClassLevel>,
	) {
		this.homebrewRepository = homebrewRepository;
		this.apiService = apiService;
		this.baseResourceMapper = baseResourceMapper;
		this.classLevelMapper = classLevelMapper;
	}

	/**
	 * @inheritdoc
	 */
	public async getAllAsync(classId: string): Promise<ClassLevel[]> {
		const getEndpoint = this.getEndpoint(classId);
		const allApiClassLevels =
			await this.apiService.getByEndpointAsync<ClassLevelApiDto[]>(getEndpoint);

		return allApiClassLevels.map((dto) => this.classLevelMapper.map(dto));
	}

	/**
	 * @inheritdoc
	 */
	public async getLevelByClassAndLevelAsync(
		classId: string,
		level: number,
	): Promise<ClassLevel> {
		const endpoint = this.getEndpoint(classId, level);
		const apiClassLevels =
			await this.apiService.getByEndpointAsync<ClassLevelApiDto>(endpoint);

		return this.classLevelMapper.map(apiClassLevels);
	}

	private getEndpoint(classId: string, classLevel?: number): string {
		return `classes/${classId}/levels/${classLevel ?? ''}`;
	}
}
