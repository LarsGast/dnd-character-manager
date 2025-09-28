import { IMapper } from '../../interfaces/IMapper';
import { AbilityBonus } from '../../types/domain/helpers/AbilityBonus';
import { Choice } from '../../types/domain/helpers/Choice';
import { Race } from '../../types/domain/resources/Race';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';
import { AbilityBonusRecord } from '../../types/storage/helpers/AbilityBonusRecord';
import { ChoiceRecord } from '../../types/storage/helpers/ChoiceRecord';
import { RaceRecord } from '../../types/storage/resources/RaceRecord';
import { BaseResourceRecord } from '../../types/storage/wrappers/BaseResourceRecord';

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

	public constructor(
		baseResourceMapper: IMapper<BaseResourceRecord, BaseResource>,
		abilityBonusMapper: IMapper<AbilityBonusRecord, AbilityBonus>,
		choiceMapper: IMapper<ChoiceRecord, Choice>,
	) {
		this.baseResourceMapper = baseResourceMapper;
		this.abilityBonusMapper = abilityBonusMapper;
		this.choiceMapper = choiceMapper;
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
				source.languages?.map((lang) => this.baseResourceMapper.map(lang)) ??
				[],
			language_options: source.language_options
				? this.choiceMapper.map(source.language_options)
				: undefined,
			language_desc: source.language_desc,
			traits:
				source.traits?.map((trait) => this.baseResourceMapper.map(trait)) ?? [],
			subraces:
				source.subraces?.map((subrace) =>
					this.baseResourceMapper.map(subrace),
				) ?? [],
		};
	}
}
