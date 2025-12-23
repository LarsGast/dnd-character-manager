import { IMapper } from '../../interfaces/IMapper';
import { Choice, Option, OptionSet } from '../../types/domain/helpers/Choice';
import {
	ChoiceRecord,
	OptionSetRecord,
	OptionRecord,
} from '../../types/storage/helpers/ChoiceRecord';
import { ResourceReferenceRecord } from '../../types/storage/helpers/ResourceReferenceRecord';
import { ResourceReference } from '../../types/domain/helpers/ResourceReference';

export class ChoiceRecordToDomainMapper
	implements IMapper<ChoiceRecord, Choice>
{
	/**
	 * For mapping resource reference records to domain ResourceReference objects.
	 */
	private readonly resourceReferenceMapper: IMapper<
		ResourceReferenceRecord,
		ResourceReference
	>;

	public constructor(
		resourceReferenceMapper: IMapper<
			ResourceReferenceRecord,
			ResourceReference
		>,
	) {
		this.resourceReferenceMapper = resourceReferenceMapper;
	}

	map(source: ChoiceRecord): Choice {
		return {
			desc: source.desc,
			choose: source.choose,
			type: source.type,
			from: this.mapOptionSet(source.from),
		};
	}

	private mapOptionSet(source: OptionSetRecord): OptionSet {
		return {
			option_set_type: source.option_set_type,
			resource_list_url: source.resource_list_url,
			equipment_category: source.equipment_category,
			options: source.options?.map((option) => this.mapOption(option)),
		};
	}

	private mapOption(source: OptionRecord): Option {
		return {
			option_type: source.option_type,
			item: source.item
				? this.resourceReferenceMapper.map(source.item)
				: undefined,
			action_name: source.action_name,
			count: source.count,
			type: source.type,
			items: source.items?.map((item) => this.mapOption(item)),
			choice: source.choice ? this.map(source.choice) : undefined,
			string: source.string,
			desc: source.desc,
			alignments: source.alignments?.map((alignment) =>
				this.resourceReferenceMapper.map(alignment),
			),
			of: source.of ? this.resourceReferenceMapper.map(source.of) : undefined,
			ability_score: source.ability_score
				? this.resourceReferenceMapper.map(source.ability_score)
				: undefined,
			minimum_score: source.minimum_score,
			bonus: source.bonus,
			name: source.name,
			dc: source.dc,
			damage: source.damage,
			damage_type: source.damage_type
				? this.resourceReferenceMapper.map(source.damage_type)
				: undefined,
			damage_dice: source.damage_dice,
			notes: source.notes,
		};
	}
}
