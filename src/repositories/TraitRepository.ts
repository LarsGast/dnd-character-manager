import { ITraitRepository } from '../interfaces/ITraitRepository.js';
import { IHomebrewRepository } from '../interfaces/IHomebrewRepository.js';
import { IMapper } from '../interfaces/IMapper.js';
import { ISrdApiService } from '../interfaces/ISrdApiService.js';
import { TraitApiDto } from '../types/api/resources/TraitApiDto.js';
import { BaseResourceApiDto } from '../types/api/wrappers/BaseResourceApiDto.js';
import { Trait } from '../types/domain/resources/Trait.js';
import { BaseResource } from '../types/domain/wrappers/BaseResource.js';
import { ResourceList } from '../types/domain/wrappers/ResourceList.js';
import { BaseResourceRepository } from './BaseResourceRepository.js';
import { ResourceListApiDto } from '../types/api/wrappers/ResourceListApiDto.js';
import { TraitRecord } from '../types/storage/resources/TraitRecord.js';
import { BaseResourceRecord } from '../types/storage/wrappers/BaseResourceRecord.js';
import { RaceRecord } from '../types/storage/resources/RaceRecord.js';

export class TraitRepository
	extends BaseResourceRepository<Trait, TraitApiDto, TraitRecord>
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
		baseResourceRecordToDomainMapper: IMapper<BaseResourceRecord, BaseResource>,
		traitRecordToDomainMapper: IMapper<TraitRecord, Trait>,
	) {
		super(
			'traits',
			homebrewRepository,
			apiService,
			baseResourceApiToDomainMapper,
			traitApiToDomainMapper,
			baseResourceRecordToDomainMapper,
			traitRecordToDomainMapper,
		);
	}

	/**
	 * @inheritdoc
	 */
	public async getAllTraitsByRaceAsync(raceId: string): Promise<ResourceList> {
		const homebrewRace = this.homebrewRepository.get<RaceRecord>(raceId)!;
		const homebrewTraits = homebrewRace.traits;

		const endpoint = `races/${raceId}/traits`;
		const apiClassLevels =
			await this.apiService.getByEndpointAsync<ResourceListApiDto>(endpoint);

		return {
			count: homebrewTraits.length + apiClassLevels.count,
			results: [
				...homebrewTraits.map((record) =>
					this.baseResourceStorageToDomainMapper!.map(record),
				),
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
