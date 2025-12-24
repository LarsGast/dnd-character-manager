import { IHomebrewRepository } from '../interfaces/IHomebrewRepository';
import { IMapper } from '../interfaces/IMapper';
import { ISrdApiService } from '../interfaces/ISrdApiService';
import { ITraitRepository } from '../interfaces/ITraitRepository';
import { ResourceTypeApiDto } from '../types/api/helpers/ResourceTypeApiDto';
import { RaceApiDto } from '../types/api/resources/RaceApiDto';
import { BaseResourceApiDto } from '../types/api/wrappers/BaseResourceApiDto';
import { ResourceType } from '../types/domain/helpers/ResourceType';
import { Race } from '../types/domain/resources/Race';
import { Trait } from '../types/domain/resources/Trait';
import { BaseResource } from '../types/domain/wrappers/BaseResource';
import { ResourceTypeRecord } from '../types/storage/helpers/ResourceTypeRecord';
import { RaceRecord } from '../types/storage/resources/RaceRecord';
import { BaseResourceRecord } from '../types/storage/wrappers/BaseResourceRecord';
import { BaseResourceRepository } from './BaseResourceRepository';

export class RaceRepository extends BaseResourceRepository<
	Race,
	RaceApiDto,
	RaceRecord
> {
	private readonly traitRepository: ITraitRepository;

	public constructor(
		resourceTypeDomainToApiMapper: IMapper<ResourceType, ResourceTypeApiDto>,
		resourceTypeDomainToStorageMapper: IMapper<
			ResourceType,
			ResourceTypeRecord
		>,
		homebrewRepository: IHomebrewRepository,
		apiService: ISrdApiService,
		baseResourceApiToDomainMapper: IMapper<BaseResourceApiDto, BaseResource>,
		resourceApiToDomainMapper: IMapper<RaceApiDto, Race>,
		baseResourceStorageMapper: IMapper<BaseResourceRecord, BaseResource>,
		resourceStorageMapper: IMapper<RaceRecord, Race>,
		traitRepository: ITraitRepository,
	) {
		super(
			ResourceType.Race,
			resourceTypeDomainToApiMapper,
			resourceTypeDomainToStorageMapper,
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
