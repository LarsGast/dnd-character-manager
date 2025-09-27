import { IMapper } from '../interfaces/IMapper.js';
import { TraitRecord } from '../types/storage/resources/TraitRecord.js';
import { Trait } from '../types/domain/resources/Trait.js';
import { BaseResourceRecord } from '../types/storage/wrappers/BaseResourceRecord.js';
import { ChoiceRecord } from '../types/storage/helpers/ChoiceRecord.js';
import { Choice } from '../types/domain/helpers/Choice.js';
import { BaseResource } from '../types/domain/wrappers/BaseResource.js';

export class TraitRecordToDomainMapper implements IMapper<TraitRecord, Trait> {
	/**
	 * For mapping minimal storage data to a domain object.
	 */
	private readonly baseResourceMapper: IMapper<
		BaseResourceRecord,
		BaseResource
	>;

	/**
	 * For mapping choice objects to domain objects.
	 */
	private readonly choiceMapper: IMapper<ChoiceRecord, Choice>;

	public constructor(
		baseResourceMapper: IMapper<BaseResourceRecord, BaseResource>,
		choiceMapper: IMapper<ChoiceRecord, Choice>,
	) {
		this.baseResourceMapper = baseResourceMapper;
		this.choiceMapper = choiceMapper;
	}

	/**
	 * @inheritdoc
	 */
	map(source: TraitRecord): Trait {
		return {
			...this.baseResourceMapper.map(source),
			desc: source.desc,
			proficiencies: source.proficiencies.map((p) =>
				this.baseResourceMapper.map(p),
			),
			proficiency_choices: source.proficiency_choices
				? this.choiceMapper.map(source.proficiency_choices)
				: undefined,
			language_options: source.language_options
				? this.choiceMapper.map(source.language_options)
				: undefined,
			trait_specific: source.trait_specific,
		};
	}
}
