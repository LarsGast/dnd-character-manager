import { IMapper } from '../../interfaces/IMapper';
import { ChoiceApiDto } from '../../types/api/helpers/ChoiceApiDto';
import {
	BackgroundApiDto,
	BackgroundFeatureApiDto,
} from '../../types/api/resources/BackgroundApiDto';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto';
import { ResourceReferenceApiDto } from '../../types/api/helpers/ResourceReferenceApiDto';
import { ResourceReference } from '../../types/domain/helpers/ResourceReference';
import { Choice } from '../../types/domain/helpers/Choice';
import {
	Background,
	BackgroundFeature,
} from '../../types/domain/resources/Background';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';

export class BackgroundApiToDomainMapper
	implements IMapper<BackgroundApiDto, Background>
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

	public map(source: BackgroundApiDto): Background {
		return {
			...this.baseResourceMapper.map(source),
			starting_proficiencies: source.starting_proficiencies.map((p) =>
				this.resourceReferenceMapper.map(p),
			),
			language_options: this.choiceMapper.map(source.language_options),
			starting_equipment: source.starting_equipment.map((e) =>
				this.resourceReferenceMapper.map(e),
			),
			starting_equipment_options: this.choiceMapper.map(
				source.starting_equipment_options,
			),
			feature: this.mapBackgroundFeature(source.feature),
			personality_traits: this.choiceMapper.map(source.personality_traits),
			ideals: this.choiceMapper.map(source.ideals),
			bonds: this.choiceMapper.map(source.bonds),
			flaws: this.choiceMapper.map(source.flaws),
		};
	}

	public mapBackgroundFeature(
		source: BackgroundFeatureApiDto,
	): BackgroundFeature {
		return {
			name: source.name,
			desc: source.desc,
		};
	}
}
