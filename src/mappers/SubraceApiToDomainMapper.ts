import { IMapper } from '../interfaces/IMapper.js';
import { AbilityBonusApiDto } from '../types/api/helpers/AbilityBonusApiDto.js';
import { ChoiceApiDto } from '../types/api/helpers/ChoiceApiDto.js';
import { SubraceApiDto } from '../types/api/resources/SubraceApiDto.js';
import { BaseResourceApiDto } from '../types/api/wrappers/BaseResourceApiDto.js';
import { AbilityBonus } from '../types/domain/helpers/AbilityBonus.js';
import { Choice } from '../types/domain/helpers/Choice.js';
import { Subrace } from '../types/domain/resources/Subrace.js';
import { BaseResource } from '../types/domain/wrappers/BaseResource.js';

export class SubraceApiToDomainMapper
	implements IMapper<SubraceApiDto, Subrace>
{
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

	map(source: SubraceApiDto): Subrace {
		return {
			...this.baseResourceMapper.map(source),
			desc: source.desc,
			race: this.baseResourceMapper.map(source.race),
			ability_bonuses: source.ability_bonuses.map((abilityBonus) =>
				this.abilityBonusMapper.map(abilityBonus),
			),
			starting_proficiencies: source.starting_proficiencies.map(
				(startingProficiency) =>
					this.baseResourceMapper.map(startingProficiency),
			),
			languages: source.languages.map((language) =>
				this.baseResourceMapper.map(language),
			),
			language_options:
				source.language_options === undefined
					? undefined
					: this.choiceMapper.map(source.language_options),
			racial_traits: source.racial_traits.map((racialTrait) =>
				this.baseResourceMapper.map(racialTrait),
			),
		};
	}
}
