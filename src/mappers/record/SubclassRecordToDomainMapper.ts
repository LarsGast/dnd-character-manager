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
import { ResourceReferenceRecord } from '../../types/storage/helpers/ResourceReferenceRecord';
import { ResourceReference } from '../../types/domain/helpers/ResourceReference';

export class SubclassRecordToDomainMapper
	implements IMapper<SubclassRecord, Subclass>
{
	/**
	 * For mapping base resource records to domain objects.
	 */
	private readonly baseResourceMapper: IMapper<
		BaseResourceRecord,
		BaseResource
	>;

	/**
	 * For mapping resource reference records to domain ResourceReference objects.
	 */
	private readonly resourceReferenceMapper: IMapper<
		ResourceReferenceRecord,
		ResourceReference
	>;

	public constructor(
		baseResourceMapper: IMapper<BaseResourceRecord, BaseResource>,
		resourceReferenceMapper: IMapper<
			ResourceReferenceRecord,
			ResourceReference
		>,
	) {
		this.baseResourceMapper = baseResourceMapper;
		this.resourceReferenceMapper = resourceReferenceMapper;
	}

	public map(source: SubclassRecord): Subclass {
		return {
			...this.baseResourceMapper.map(source),
			desc: source.desc,
			class: this.resourceReferenceMapper.map(source.class),
			spells: source.spells.map((spell) => this.mapSpells(spell)),
			features: source.features.map(this.mapFeatures),
		};
	}

	private mapSpells(source: SubclassSpellRecord): SubclassSpell {
		return {
			level: source.level,
			spell: this.resourceReferenceMapper.map(source.spell),
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
