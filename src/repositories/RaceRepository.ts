import { IHomebrewRepository } from '../interfaces/IHomebrewRepository.js';
import { IMapper } from '../interfaces/IMapper.js';
import { ISrdApiService } from '../interfaces/ISrdApiService.js';
import { ITraitRepository } from '../interfaces/ITraitRepository.js';
import { RaceApiDto } from '../types/api/resources/RaceApiDto.js';
import { BaseResourceApiDto } from '../types/api/wrappers/BaseResourceApiDto.js';
import { Race } from '../types/domain/resources/Race.js';
import { Trait } from '../types/domain/resources/Trait.js';
import { BaseResource } from '../types/domain/wrappers/BaseResource.js';
import { RaceRecord } from '../types/storage/resources/RaceRecord.js';
import { BaseResourceRecord } from '../types/storage/wrappers/BaseResourceRecord.js';
import { BaseResourceRepository } from './BaseResourceRepository.js';

export class RaceRepository extends BaseResourceRepository<
	Race,
	RaceApiDto,
	RaceRecord
> {
	private readonly traitRepository: ITraitRepository;

	public constructor(
		homebrewRepository: IHomebrewRepository,
		apiService: ISrdApiService,
		baseResourceApiToDomainMapper: IMapper<BaseResourceApiDto, BaseResource>,
		resourceApiToDomainMapper: IMapper<RaceApiDto, Race>,
		baseResourceStorageMapper: IMapper<BaseResourceRecord, BaseResource>,
		resourceStorageMapper: IMapper<RaceRecord, Race>,
		traitRepository: ITraitRepository,
	) {
		super(
			'races',
			homebrewRepository,
			apiService,
			baseResourceApiToDomainMapper,
			resourceApiToDomainMapper,
			baseResourceStorageMapper,
			resourceStorageMapper,
		);
		this.traitRepository = traitRepository;
	}

	/**
	 * @inheritdoc
	 */
	public override async getAsync(id: string): Promise<Race | undefined> {
		const race = await super.getAsync(id);

		// Ensure traits are loaded
		if (race && !race.isHomebrew) {
			const traitsForRace =
				await this.traitRepository.getAllTraitsByRaceAsync(id);

			const fullTraits = (
				await Promise.all(
					traitsForRace.results.map((trait) =>
						this.traitRepository.getAsync(trait.index),
					),
				)
			).filter((trait): trait is Trait => trait !== undefined);

			race.traits = fullTraits.map((trait) => ({
				name: trait.name,
				description: trait.desc.join('\n'),
			}));
		}

		return race;
	}
}
