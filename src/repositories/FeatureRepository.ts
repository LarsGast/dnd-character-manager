import { IFeatureRepository } from '../interfaces/IFeatureRepository.js';
import { IHomebrewRepository } from '../interfaces/IHomebrewRepository.js';
import { IMapper } from '../interfaces/IMapper.js';
import { ISrdApiService } from '../interfaces/ISrdApiService.js';
import { FeatureApiDto } from '../types/api/resources/FeatureApiDto.js';
import { BaseResourceApiDto } from '../types/api/wrappers/BaseResourceApiDto.js';
import { ResourceListApiDto } from '../types/api/wrappers/ResourceListApiDto.js';
import { Feature } from '../types/domain/resources/Feature.js';
import { BaseResource } from '../types/domain/wrappers/BaseResource.js';
import { ResourceList } from '../types/domain/wrappers/ResourceList.js';
import { BaseResourceRepository } from './BaseResourceRepository.js';

export class FeatureRepository
	extends BaseResourceRepository<Feature, FeatureApiDto>
	implements IFeatureRepository
{
	/**
	 * @inheritdoc
	 */
	public constructor(
		homebrewRepository: IHomebrewRepository,
		apiService: ISrdApiService,
		baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>,
		featureMapper: IMapper<FeatureApiDto, Feature>,
	) {
		super(
			'features',
			homebrewRepository,
			apiService,
			baseResourceMapper,
			featureMapper,
		);
	}

	/**
	 * @inheritdoc
	 */
	public async getFeaturesByClassAndLevelAsync(
		classId: string,
		level: number,
	): Promise<ResourceList> {
		const endpoint = `classes/${classId}/levels/${level}/features`;
		const apiClassLevels =
			await this.apiService.getByEndpointAsync<ResourceListApiDto>(endpoint);

		return {
			count: apiClassLevels.count,
			results: [
				...apiClassLevels.results.map((dto) =>
					this.baseResourceApiToDomainMapper.map(dto),
				),
			],
		};
	}

	/**
	 * @inheritdoc
	 */
	public async getFeaturesBySubclassAndLevelAsync(
		subclassId: string,
		level: number,
	): Promise<ResourceList> {
		const endpoint = `subclasses/${subclassId}/levels/${level}/features`;
		const apiClassLevels =
			await this.apiService.getByEndpointAsync<ResourceListApiDto>(endpoint);

		return {
			count: apiClassLevels.count,
			results: [
				...apiClassLevels.results.map((dto) =>
					this.baseResourceApiToDomainMapper.map(dto),
				),
			],
		};
	}
}
