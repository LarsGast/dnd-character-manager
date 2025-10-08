import { IMapper } from '../../interfaces/IMapper';
import {
	ClassLevelApiDto,
	SpellcastingApiDto,
} from '../../types/api/resources/ClassLevelApiDto';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto';
import {
	ClassLevel,
	Spellcasting,
} from '../../types/domain/resources/ClassLevel';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';

export class ClassLevelApiToDomainMapper
	implements IMapper<ClassLevelApiDto, ClassLevel>
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

	public map(source: ClassLevelApiDto): ClassLevel {
		return {
			...this.baseResourceMapper.map(source),
			class: this.baseResourceMapper.map(source.class),
			level: source.level,
			ability_score_bonuses: source.ability_score_bonuses,
			prof_bonus: source.prof_bonus,
			features: source.features.map((feature) =>
				this.baseResourceMapper.map(feature),
			),
			spellcasting: this.mapSpellcasting(source.spellcasting),
			class_specific: source.class_specific,
		};
	}

	private mapSpellcasting(
		source?: SpellcastingApiDto,
	): Spellcasting | undefined {
		if (source === undefined) {
			return undefined;
		}

		return {
			cantrips_known: source.cantrips_known,
			spells_known: source.spells_known,
			spell_slots_level_1: source.spell_slots_level_1,
			spell_slots_level_2: source.spell_slots_level_2,
			spell_slots_level_3: source.spell_slots_level_3,
			spell_slots_level_4: source.spell_slots_level_4,
			spell_slots_level_5: source.spell_slots_level_5,
			spell_slots_level_6: source.spell_slots_level_6,
			spell_slots_level_7: source.spell_slots_level_7,
			spell_slots_level_8: source.spell_slots_level_8,
			spell_slots_level_9: source.spell_slots_level_9,
		};
	}
}
