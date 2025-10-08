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

export class TraitRepository
	extends BaseResourceRepository<Trait, TraitApiDto>
	implements ITraitRepository
{
	/**
	 * @inheritdoc
	 */
	public constructor(
		homebrewRepository: IHomebrewRepository,
		apiService: ISrdApiService,
		baseResourceApiToDomainMapper: IMapper<BaseResourceApiDto, BaseResource>,
		traitApiToDomainMapper: IMapper<TraitApiDto, Trait>,
	) {
		super(
			'traits',
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
