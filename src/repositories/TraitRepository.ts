import { ITraitRepository } from '../interfaces/ITraitRepository';
import { IHomebrewRepository } from '../interfaces/IHomebrewRepository';
import { IMapper } from '../interfaces/IMapper';
import { ISrdApiService } from '../interfaces/ISrdApiService';
import { TraitApiDto } from '../types/api/resources/TraitApiDto';
import { BaseResourceApiDto } from '../types/api/wrappers/BaseResourceApiDto';
import { Trait } from '../types/domain/resources/Trait';
import { BaseResource } from '../types/domain/wrappers/BaseResource';
import { ResourceList } from '../types/domain/wrappers/ResourceList';
import { BaseResourceRepository } from './BaseResourceRepository';
import { ResourceListApiDto } from '../types/api/wrappers/ResourceListApiDto';
import { ResourceType } from '../types/domain/helpers/ResourceType';
import { ResourceTypeApiDto } from '../types/api/helpers/ResourceTypeApiDto';
import { ResourceTypeRecord } from '../types/storage/helpers/ResourceTypeRecord';

export class TraitRepository
	extends BaseResourceRepository<Trait, TraitApiDto>
	implements ITraitRepository
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
		baseResourceApiToDomainMapper: IMapper<BaseResourceApiDto, BaseResource>,
		traitApiToDomainMapper: IMapper<TraitApiDto, Trait>,
	) {
		super(
			ResourceType.Trait,
			resourceTypeDomainToApiMapper,
			resourceTypeDomainToStorageMapper,
			homebrewRepository,
			apiService,
			baseResourceApiToDomainMapper,
			traitApiToDomainMapper,
		);
	}

	/**
	 * @inheritdoc
	 */
	public async getAllTraitsByRaceAsync(raceId: string): Promise<ResourceList> {
		const endpoint = `races/${raceId}/traits`;
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
	public async getAllTraitsBySubraceAsync(
		subraceId: string,
	): Promise<ResourceList> {
		const endpoint = `subraces/${subraceId}/traits`;
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
