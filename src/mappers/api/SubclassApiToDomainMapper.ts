import { IMapper } from '../../interfaces/IMapper.js';
import {
	SubclassApiDto,
	SubclassSpellApiDto,
	SubClassSpellPrerequisiteApiDto,
} from '../../types/api/resources/SubclassApiDto.js';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto.js';
import {
	Subclass,
	SubclassSpell,
	SubClassSpellPrerequisite,
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
			subclass_flavor: source.subclass_flavor,
			spells: source.spells?.map((spell) => this.mapSpells(spell)) ?? [],
		};
	}

	private mapSpells(source: SubclassSpellApiDto): SubclassSpell {
		return {
			prerequisites: source.prerequisites.map((p) =>
				this.mapSpellPrerequisites(p),
			),
			spell: this.baseResourceMapper.map(source.spell),
		};
	}

	private mapSpellPrerequisites(
		source: SubClassSpellPrerequisiteApiDto,
	): SubClassSpellPrerequisite {
		return {
			...this.baseResourceMapper.map(source),
			type: source.type,
		};
	}
}
