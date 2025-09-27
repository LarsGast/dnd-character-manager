import { IMapper } from '../../interfaces/IMapper.js';
import { ChoiceApiDto } from '../../types/api/helpers/ChoiceApiDto.js';
import {
	BackgroundApiDto,
	BackgroundFeatureApiDto,
} from '../../types/api/resources/BackgroundApiDto.js';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto.js';
import { Choice } from '../../types/domain/helpers/Choice.js';
import {
	Background,
	BackgroundFeature,
} from '../../types/domain/resources/Background.js';
import { BaseResource } from '../../types/domain/wrappers/BaseResource.js';

export class BackgroundApiToDomainMapper
	implements IMapper<BackgroundApiDto, Background>
{
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

	public map(source: BackgroundApiDto): Background {
		return {
			...this.baseResourceMapper.map(source),
			starting_proficiencies: source.starting_proficiencies.map(
				(startingProficiency) =>
					this.baseResourceMapper.map(startingProficiency),
			),
			language_options: this.choiceMapper.map(source.language_options),
			starting_equipment: source.starting_equipment.map((startingEquipment) =>
				this.baseResourceMapper.map(startingEquipment),
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
