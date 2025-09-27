import { IMapper } from '../interfaces/IMapper.js';
import { Race } from '../types/domain/resources/Race.js';
import { RaceRecord } from '../types/storage/resources/RaceRecord.js';
import { AbilityBonus } from '../types/domain/helpers/AbilityBonus.js';
import { Choice } from '../types/domain/helpers/Choice.js';
import { BaseResource } from '../types/domain/wrappers/BaseResource.js';
import { BaseResourceRecord } from '../types/storage/wrappers/BaseResourceRecord.js';
import { AbilityBonusRecord } from '../types/storage/helpers/AbilityBonusRecord.js';
import { ChoiceRecord } from '../types/storage/helpers/ChoiceRecord.js';

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
			ability_bonuses: source.ability_bonuses.map((ab) =>
				this.abilityBonusMapper.map(ab),
			),
			age: source.age,
			alignment: source.alignment,
			size: source.size,
			size_description: source.size_description,
			languages: source.languages.map((lang) =>
				this.baseResourceMapper.map(lang),
			),
			language_options: source.language_options
				? this.choiceMapper.map(source.language_options)
				: undefined,
			language_desc: source.language_desc,
			traits: source.traits.map((trait) => this.baseResourceMapper.map(trait)),
			subraces: source.subraces.map((subrace) =>
				this.baseResourceMapper.map(subrace),
			),
		};
	}
}
