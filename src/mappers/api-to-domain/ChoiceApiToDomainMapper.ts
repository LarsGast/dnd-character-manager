import { IMapper } from '../../interfaces/IMapper';
import {
	ChoiceApiDto,
	OptionApiDto,
	OptionSetApiDto,
} from '../../types/api/helpers/ChoiceApiDto';
import { Choice, Option, OptionSet } from '../../types/domain/helpers/Choice';
import { ResourceReferenceApiDto } from '../../types/api/helpers/ResourceReferenceApiDto';
import { ResourceReference } from '../../types/domain/helpers/ResourceReference';

/**
 * Maps choice API DTOs to domain model choices.
 * Handles the complex nested structure of choices, option sets, and individual options that represent player decisions in D&D 5e features.
 */
export class ChoiceApiToDomainMapper implements IMapper<ChoiceApiDto, Choice> {
	/**
	 * Mapper for converting minimal resource references to domain references.
	 */
	private readonly resourceReferenceMapper: IMapper<
		ResourceReferenceApiDto,
		ResourceReference
	>;

	public constructor(
		resourceReferenceMapper: IMapper<
			ResourceReferenceApiDto,
			ResourceReference
		>,
	) {
		this.resourceReferenceMapper = resourceReferenceMapper;
	}

	/**
	 * @inheritdoc
	 */
	public map(source: ChoiceApiDto): Choice {
		return {
			desc: source.desc,
			choose: source.choose,
			type: source.type,
			from: this.mapOptionSet(source.from),
		};
	}

	/**
	 * Maps an option set from API format to domain format.
	 * @param source The option set data from the API.
	 * @returns The mapped option set domain object.
	 */
	private mapOptionSet(source: OptionSetApiDto): OptionSet {
		return {
			option_set_type: source.option_set_type,
			resource_list_url: source.resource_list_url,
			equipment_category: source.equipment_category,
			options:
				source.options === undefined
					? undefined
					: source.options.map((option) => this.mapOption(option)),
		};
	}

	/**
	 * Map the option from API to internal object.
	 * @param source Option as described in API spec.
	 * @returns Option as internal object.
	 */
	private mapOption(source: OptionApiDto): Option {
		return {
			option_type: source.option_type,
			item:
				source.item === undefined
					? undefined
					: this.resourceReferenceMapper.map(source.item),
			action_name: source.action_name,
			count: source.count,
			type: source.type,
			items:
				source.items === undefined
					? undefined
					: source.items.map((item) => this.mapOption(item)),
			choice: source.choice === undefined ? undefined : this.map(source.choice),
			string: source.string,
			desc: source.desc,
			alignments:
				source.alignments === undefined
					? undefined
					: source.alignments.map((alignment) =>
							this.resourceReferenceMapper.map(alignment),
						),
			of:
				source.of === undefined
					? undefined
					: this.resourceReferenceMapper.map(source.of),
			ability_score:
				source.ability_score === undefined
					? undefined
					: this.resourceReferenceMapper.map(source.ability_score),
			minimum_score: source.minimum_score,
			bonus: source.bonus,
			name: source.name,
			dc: source.dc,
			damage: source.damage,
			damage_type:
				source.damage_type === undefined
					? undefined
					: this.resourceReferenceMapper.map(source.damage_type),
			damage_dice: source.damage_dice,
			notes: source.notes,
		};
	}
}
