import { IMapper } from '../interfaces/IMapper.js';
import { AbilityBonusApiDto } from '../types/api/helpers/AbilityBonusApiDto.js';
import { ChoiceApiDto } from '../types/api/helpers/ChoiceApiDto.js';
import { RaceApiDto } from '../types/api/resources/RaceApiDto.js';
import { BaseResourceApiDto } from '../types/api/wrappers/BaseResourceApiDto.js';
import { AbilityBonus } from '../types/domain/helpers/AbilityBonus.js';
import { Choice } from '../types/domain/helpers/Choice.js';
import { Race } from '../types/domain/resources/Race.js';
import { BaseResource } from '../types/domain/wrappers/BaseResource.js';

export class RaceApiToDomainMapper implements IMapper<RaceApiDto, Race> {
	/**
	 * For mapping minimal API data to an internal object.
	 */
	private readonly baseResourceMapper: IMapper<
		BaseResourceApiDto,
		BaseResource
	>;

	/**
	 * For mapping ability scores to internal objects.
	 */
	private readonly abilityBonusMapper: IMapper<
		AbilityBonusApiDto,
		AbilityBonus
	>;

	/**
	 * For mapping choice objects to internal objects.
	 */
	private readonly choiceMapper: IMapper<ChoiceApiDto, Choice>;

	public constructor(
		baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>,
		abilityBonusMapper: IMapper<AbilityBonusApiDto, AbilityBonus>,
		choiceMapper: IMapper<ChoiceApiDto, Choice>,
	) {
		this.baseResourceMapper = baseResourceMapper;
		this.abilityBonusMapper = abilityBonusMapper;
		this.choiceMapper = choiceMapper;
	}

	/**
	 * @inheritdoc
	 */
	map(source: RaceApiDto): Race {
		return {
			...this.baseResourceMapper.map(source),
			speed: source.speed,
			ability_bonuses: source.ability_bonuses.map((abilityBonus) =>
				this.abilityBonusMapper.map(abilityBonus),
			),
			age: source.age,
			alignment: source.alignment,
			size: source.size,
			size_description: source.size_description,
			languages: source.languages.map((language) =>
				this.baseResourceMapper.map(language),
			),
			language_options:
				source.language_options === undefined
					? undefined
					: this.choiceMapper.map(source.language_options),
			language_desc: source.language_desc,
			traits: source.traits.map((trait) => this.baseResourceMapper.map(trait)),
			subraces: source.subraces.map((subrace) =>
				this.baseResourceMapper.map(subrace),
			),
		};
	}
}
