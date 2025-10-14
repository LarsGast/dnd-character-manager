import { IMapper } from '../../interfaces/IMapper';
import {
	SubclassApiDto,
	SubclassSpellApiDto,
} from '../../types/api/resources/SubclassApiDto';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto';
import { Subclass, SubclassSpell } from '../../types/domain/resources/Subclass';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';
import { ResourceReferenceApiDto } from '../../types/api/helpers/ResourceReferenceApiDto';
import { ResourceReference } from '../../types/domain/helpers/ResourceReference';

export class SubclassApiToDomainMapper
	implements IMapper<SubclassApiDto, Subclass>
{
	/**
	 * For mapping base resource fields.
	 */
	private readonly baseResourceMapper: IMapper<
		BaseResourceApiDto,
		BaseResource
	>;

	/**
	 * For mapping referenced resources (class, spell) to ResourceReference.
	 */
	private readonly resourceReferenceMapper: IMapper<
		ResourceReferenceApiDto,
		ResourceReference
	>;

	public constructor(
		baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>,
		resourceReferenceMapper: IMapper<
			ResourceReferenceApiDto,
			ResourceReference
		>,
	) {
		this.baseResourceMapper = baseResourceMapper;
		this.resourceReferenceMapper = resourceReferenceMapper;
	}

	public map(source: SubclassApiDto): Subclass {
		return {
			...this.baseResourceMapper.map(source),
			desc: source.desc,
			class: this.resourceReferenceMapper.map(source.class),
			spells: source.spells?.map((spell) => this.mapSpells(spell)) ?? [],
			features: [], // Should be filled in later
		};
	}

	private mapSpells(source: SubclassSpellApiDto): SubclassSpell {
		return {
			level: parseInt(
				source.prerequisites
					.find((p) => p.type === 'level')
					?.index.split('-')[1] ?? '0',
				10,
			),
			spell: this.resourceReferenceMapper.map(source.spell),
		};
	}
}
