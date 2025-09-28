import { IMapper } from '../../interfaces/IMapper.js';
import {
	Subclass,
	SubclassSpell,
	SubClassSpellPrerequisite,
} from '../../types/domain/resources/Subclass.js';
import { BaseResource } from '../../types/domain/wrappers/BaseResource.js';
import {
	SubclassRecord,
	SubClassSpellPrerequisiteRecord,
	SubclassSpellRecord,
} from '../../types/storage/resources/SubclassRecord.js';
import { BaseResourceRecord } from '../../types/storage/wrappers/BaseResourceRecord.js';

export class SubclassRecordToDomainMapper
	implements IMapper<SubclassRecord, Subclass>
{
	/**
	 * For mapping minimal API data to an internal object.
	 */
	private readonly baseResourceMapper: IMapper<
		BaseResourceRecord,
		BaseResource
	>;

	public constructor(
		baseResourceMapper: IMapper<BaseResourceRecord, BaseResource>,
	) {
		this.baseResourceMapper = baseResourceMapper;
	}

	public map(source: SubclassRecord): Subclass {
		return {
			...this.baseResourceMapper.map(source),
			desc: source.desc,
			class:
				source.class === undefined
					? undefined
					: this.baseResourceMapper.map(source.class),
			spells: source.spells?.map((spell) => this.mapSpells(spell)) ?? [],
		};
	}

	private mapSpells(source: SubclassSpellRecord): SubclassSpell {
		return {
			prerequisites: source.prerequisites.map((p) =>
				this.mapSpellPrerequisites(p),
			),
			spell: this.baseResourceMapper.map(source.spell),
		};
	}

	private mapSpellPrerequisites(
		source: SubClassSpellPrerequisiteRecord,
	): SubClassSpellPrerequisite {
		return {
			...this.baseResourceMapper.map(source),
			type: source.type,
		};
	}
}
