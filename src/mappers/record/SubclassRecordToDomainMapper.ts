import { IMapper } from '../../interfaces/IMapper';
import {
	Subclass,
	SubclassFeature,
	SubclassSpell,
} from '../../types/domain/resources/Subclass';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';
import {
	SubclassFeatureRecord,
	SubclassRecord,
	SubclassSpellRecord,
} from '../../types/storage/resources/SubclassRecord';
import { BaseResourceRecord } from '../../types/storage/wrappers/BaseResourceRecord';

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
			features: source.features?.map(this.mapFeatures) ?? [],
		};
	}

	private mapSpells(source: SubclassSpellRecord): SubclassSpell {
		return {
			level: source.level,
			spell: this.baseResourceMapper.map(source.spell),
		};
	}

	private mapFeatures(source: SubclassFeatureRecord): SubclassFeature {
		return {
			name: source.name,
			level: source.level,
			description: source.description,
		};
	}
}
