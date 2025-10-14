import { IMapper } from '../../interfaces/IMapper';
import { AbilityBonus } from '../../types/domain/helpers/AbilityBonus';
import { Choice } from '../../types/domain/helpers/Choice';
import { Race, RaceTrait } from '../../types/domain/resources/Race';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';
import { AbilityBonusRecord } from '../../types/storage/helpers/AbilityBonusRecord';
import { ChoiceRecord } from '../../types/storage/helpers/ChoiceRecord';
import {
	RaceRecord,
	RaceTraitRecord,
} from '../../types/storage/resources/RaceRecord';
import { BaseResourceRecord } from '../../types/storage/wrappers/BaseResourceRecord';
import { ResourceReferenceRecord } from '../../types/storage/helpers/ResourceReferenceRecord';
import { ResourceReference } from '../../types/domain/helpers/ResourceReference';

export class RaceRecordToDomainMapper implements IMapper<RaceRecord, Race> {
	/**
	 * For mapping minimal storage data to a domain object.
	 */
	private readonly baseResourceMapper: IMapper<
		BaseResourceRecord,
		BaseResource
	>;

	/**
	 * For mapping ability scores to domain objects.
	 */
	private readonly abilityBonusMapper: IMapper<
		AbilityBonusRecord,
		AbilityBonus
	>;

	/**
	 * For mapping choice objects to domain objects.
	 */
	private readonly choiceMapper: IMapper<ChoiceRecord, Choice>;

	/**
	 * For mapping resource reference records to domain ResourceReference objects.
	 */
	private readonly resourceReferenceMapper: IMapper<
		ResourceReferenceRecord,
		ResourceReference
	>;

	public constructor(
		baseResourceMapper: IMapper<BaseResourceRecord, BaseResource>,
		abilityBonusMapper: IMapper<AbilityBonusRecord, AbilityBonus>,
		choiceMapper: IMapper<ChoiceRecord, Choice>,
		resourceReferenceMapper: IMapper<
			ResourceReferenceRecord,
			ResourceReference
		>,
	) {
		this.baseResourceMapper = baseResourceMapper;
		this.abilityBonusMapper = abilityBonusMapper;
		this.choiceMapper = choiceMapper;
		this.resourceReferenceMapper = resourceReferenceMapper;
	}

	map(source: RaceRecord): Race {
		return {
			...this.baseResourceMapper.map(source),
			speed: source.speed,
			ability_bonuses:
				source.ability_bonuses?.map((ab) => this.abilityBonusMapper.map(ab)) ??
				[],
			age: source.age,
			alignment: source.alignment,
			size: source.size,
			size_description: source.size_description,
			languages:
				source.languages?.map((lang) =>
					this.resourceReferenceMapper.map(lang),
				) ?? [],
			language_options: source.language_options
				? this.choiceMapper.map(source.language_options)
				: undefined,
			language_desc: source.language_desc,
			traits: source.traits?.map(this.mapTraits) ?? [],
			subraces: [],
		};
	}

	private mapTraits(source: RaceTraitRecord): RaceTrait {
		return {
			name: source.name,
			description: source.description,
		};
	}
}
