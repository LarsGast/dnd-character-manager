import { IMapper } from '../../interfaces/IMapper';
import { ChoiceApiDto } from '../../types/api/helpers/ChoiceApiDto';
import { TraitApiDto } from '../../types/api/resources/TraitApiDto';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto';
import { ResourceReferenceApiDto } from '../../types/api/helpers/ResourceReferenceApiDto';
import { ResourceReference } from '../../types/domain/helpers/ResourceReference';
import { Choice } from '../../types/domain/helpers/Choice';
import { Trait } from '../../types/domain/resources/Trait';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';

export class TraitApiToDomainMapper implements IMapper<TraitApiDto, Trait> {
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
	 * For mapping choice objects to internal objects.
	 */
	private readonly choiceMapper: IMapper<ChoiceApiDto, Choice>;

	public constructor(
		baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>,
		choiceMapper: IMapper<ChoiceApiDto, Choice>,
		resourceReferenceMapper: IMapper<
			ResourceReferenceApiDto,
			ResourceReference
		>,
	) {
		this.baseResourceMapper = baseResourceMapper;
		this.choiceMapper = choiceMapper;
		this.resourceReferenceMapper = resourceReferenceMapper;
	}

	map(source: TraitApiDto): Trait {
		return {
			...this.baseResourceMapper.map(source),
			desc: source.desc,
			races: source.races.map((r) => this.resourceReferenceMapper.map(r)),
			subraces: source.subraces.map((s) => this.resourceReferenceMapper.map(s)),
			proficiencies: source.proficiencies.map((p) =>
				this.resourceReferenceMapper.map(p),
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
