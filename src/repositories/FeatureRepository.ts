import { IFeatureRepository } from '../interfaces/IFeatureRepository';
import { IHomebrewRepository } from '../interfaces/IHomebrewRepository';
import { IMapper } from '../interfaces/IMapper';
import { ISrdApiService } from '../interfaces/ISrdApiService';
import { ResourceTypeApiDto } from '../types/api/helpers/ResourceTypeApiDto';
import { FeatureApiDto } from '../types/api/resources/FeatureApiDto';
import { BaseResourceApiDto } from '../types/api/wrappers/BaseResourceApiDto';
import { ResourceListApiDto } from '../types/api/wrappers/ResourceListApiDto';
import { ResourceType } from '../types/domain/helpers/ResourceType';
import { Feature } from '../types/domain/resources/Feature';
import { BaseResource } from '../types/domain/wrappers/BaseResource';
import { ResourceList } from '../types/domain/wrappers/ResourceList';
import { ResourceTypeRecord } from '../types/storage/helpers/ResourceTypeRecord';
import { BaseResourceRepository } from './BaseResourceRepository';

export class FeatureRepository
	extends BaseResourceRepository<Feature, FeatureApiDto>
	implements IFeatureRepository
{
	/**
	 * @inheritdoc
	 */
	public constructor(
		resourceTypeDomainToApiMapper: IMapper<ResourceType, ResourceTypeApiDto>,
		resourceTypeDomainToStorageMapper: IMapper<
			ResourceType,
			ResourceTypeRecord
		>,
		homebrewRepository: IHomebrewRepository,
		apiService: ISrdApiService,
		baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>,
		featureMapper: IMapper<FeatureApiDto, Feature>,
	) {
		super(
			ResourceType.Feature,
			resourceTypeDomainToApiMapper,
			resourceTypeDomainToStorageMapper,
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

	/**
	 * @inheritdoc
	 */
	public async getAllFeaturesForSubclassAsync(
		subclassId: string,
	): Promise<ResourceList> {
		const endpoint = `subclasses/${subclassId}/features`;
		const apiFeatures =
			await this.apiService.getByEndpointAsync<ResourceListApiDto>(endpoint);

		return {
			count: apiFeatures.count,
			results: [
				...apiFeatures.results.map((dto) =>
					this.baseResourceApiToDomainMapper.map(dto),
				),
			],
		};
	}
}
