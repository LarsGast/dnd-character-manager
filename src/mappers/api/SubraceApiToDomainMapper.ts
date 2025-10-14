import { IMapper } from '../../interfaces/IMapper';
import { AbilityBonusApiDto } from '../../types/api/helpers/AbilityBonusApiDto';
import { ChoiceApiDto } from '../../types/api/helpers/ChoiceApiDto';
import { SubraceApiDto } from '../../types/api/resources/SubraceApiDto';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto';
import { ResourceReferenceApiDto } from '../../types/api/helpers/ResourceReferenceApiDto';
import { ResourceReference } from '../../types/domain/helpers/ResourceReference';
import { AbilityBonus } from '../../types/domain/helpers/AbilityBonus';
import { Choice } from '../../types/domain/helpers/Choice';
import { Subrace } from '../../types/domain/resources/Subrace';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';

export class SubraceApiToDomainMapper
	implements IMapper<SubraceApiDto, Subrace>
{
	/**
	 * For mapping base resource fields.
	 */
	private readonly baseResourceMapper: IMapper<
		BaseResourceApiDto,
		BaseResource
	>;

	/**
	 * For mapping referenced resources to ResourceReference.
	 */
	private readonly resourceReferenceMapper: IMapper<
		ResourceReferenceApiDto,
		ResourceReference
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
		resourceReferenceMapper: IMapper<
			ResourceReferenceApiDto,
			ResourceReference
		>,
	) {
		this.baseResourceMapper = baseResourceMapper;
		this.abilityBonusMapper = abilityBonusMapper;
		this.choiceMapper = choiceMapper;
		this.resourceReferenceMapper = resourceReferenceMapper;
	}

	map(source: SubraceApiDto): Subrace {
		return {
			...this.baseResourceMapper.map(source),
			desc: source.desc,
			race: this.resourceReferenceMapper.map(source.race),
			ability_bonuses: source.ability_bonuses.map((abilityBonus) =>
				this.abilityBonusMapper.map(abilityBonus),
			),
			starting_proficiencies: source.starting_proficiencies.map((p) =>
				this.resourceReferenceMapper.map(p),
			),
			languages: source.languages.map((l) =>
				this.resourceReferenceMapper.map(l),
			),
			language_options:
				source.language_options === undefined
					? undefined
					: this.choiceMapper.map(source.language_options),
			racial_traits: source.racial_traits.map((t) =>
				this.resourceReferenceMapper.map(t),
			),
		};
	}
}
