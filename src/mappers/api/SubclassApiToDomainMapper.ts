import { IMapper } from '../../interfaces/IMapper';
import {
	SubclassApiDto,
	SubclassSpellApiDto,
} from '../../types/api/resources/SubclassApiDto';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto';
import { Subclass, SubclassSpell } from '../../types/domain/resources/Subclass';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';

export class SubclassApiToDomainMapper
	implements IMapper<SubclassApiDto, Subclass>
{
	/**
	 * For mapping minimal API data to an internal object.
	 */
	private readonly baseResourceMapper: IMapper<
		BaseResourceApiDto,
		BaseResource
	>;

	public constructor(
		baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>,
	) {
		this.baseResourceMapper = baseResourceMapper;
	}

	public map(source: SubclassApiDto): Subclass {
		return {
			...this.baseResourceMapper.map(source),
			desc: source.desc,
			class: this.baseResourceMapper.map(source.class),
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
			spell: this.baseResourceMapper.map(source.spell),
		};
	}
}
