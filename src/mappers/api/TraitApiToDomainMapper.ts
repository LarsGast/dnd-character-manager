import { IMapper } from '../../interfaces/IMapper.js';
import { ChoiceApiDto } from '../../types/api/helpers/ChoiceApiDto.js';
import { TraitApiDto } from '../../types/api/resources/TraitApiDto.js';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto.js';
import { Choice } from '../../types/domain/helpers/Choice.js';
import { Trait } from '../../types/domain/resources/Trait.js';
import { BaseResource } from '../../types/domain/wrappers/BaseResource.js';

export class TraitApiToDomainMapper implements IMapper<TraitApiDto, Trait> {
	/**
	 * For mapping minimal API data to an internal object.
	 */
	private readonly baseResourceMapper: IMapper<
		BaseResourceApiDto,
		BaseResource
	>;

	/**
	 * For mapping choice objects to internal objects.
	 */
	private readonly choiceMapper: IMapper<ChoiceApiDto, Choice>;

	public constructor(
		baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>,
		choiceMapper: IMapper<ChoiceApiDto, Choice>,
	) {
		this.baseResourceMapper = baseResourceMapper;
		this.choiceMapper = choiceMapper;
	}

	map(source: TraitApiDto): Trait {
		return {
			...this.baseResourceMapper.map(source),
			desc: source.desc,
			races: source.races.map((race) => this.baseResourceMapper.map(race)),
			subraces: source.subraces.map((subrace) =>
				this.baseResourceMapper.map(subrace),
			),
			proficiencies: source.proficiencies.map((proficiency) =>
				this.baseResourceMapper.map(proficiency),
			),
			proficiency_choices:
				source.proficiency_choices === undefined
					? undefined
					: this.choiceMapper.map(source.proficiency_choices),
			language_options:
				source.language_options === undefined
					? undefined
					: this.choiceMapper.map(source.language_options),
			trait_specific: source.trait_specific,
		};
	}
}
