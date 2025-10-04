import { IMapper } from '../../interfaces/IMapper.js';
import {
	SubclassApiDto,
	SubclassSpellApiDto,
} from '../../types/api/resources/SubclassApiDto.js';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto.js';
import {
	Subclass,
	SubclassSpell,
} from '../../types/domain/resources/Subclass.js';
import { BaseResource } from '../../types/domain/wrappers/BaseResource.js';

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
