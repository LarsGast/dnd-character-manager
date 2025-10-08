import { IMapper } from '../../interfaces/IMapper';
import { ChoiceApiDto } from '../../types/api/helpers/ChoiceApiDto';
import {
	ClassApiDto,
	MultiClassingApiDto,
	PrerequisiteApiDto,
	SpellCastingApiDto,
	SpellCastingInfoApiDto,
	StartingEquipmentApiDto,
} from '../../types/api/resources/ClassApiDto';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto';
import { Choice } from '../../types/domain/helpers/Choice';
import {
	Class,
	MultiClassing,
	Prerequisite,
	SpellCasting,
	SpellCastingInfo,
	StartingEquipment,
} from '../../types/domain/resources/Class';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';

export class ClassApiToDomainMapper implements IMapper<ClassApiDto, Class> {
	/**
	 * For mapping minimal API data to an internal object.
	 */
	private readonly baseResourceMapper: IMapper<
		BaseResourceApiDto,
		BaseResource
	>;

	/**
	 * For mapping choice objects to internal objects.
	 */
	private readonly choiceMapper: IMapper<ChoiceApiDto, Choice>;

	public constructor(
		baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>,
		choiceMapper: IMapper<ChoiceApiDto, Choice>,
	) {
		this.baseResourceMapper = baseResourceMapper;
		this.choiceMapper = choiceMapper;
	}

	public map(source: ClassApiDto): Class {
		return {
			...this.baseResourceMapper.map(source),
			hit_die: source.hit_die,
			class_levels: source.class_levels,
			multi_classing: this.mapMultiClassing(source.multi_classing),
			spellcasting: this.mapSpellcasting(source.spellcasting),
			spells: source.spells,
			starting_equipment: source.starting_equipment.map((startingEquipment) =>
				this.mapStartingEquipment(startingEquipment),
			),
			starting_equipment_options: source.starting_equipment_options.map(
				(startingEquipmentOption) =>
					this.choiceMapper.map(startingEquipmentOption),
			),
			proficiency_choices: source.proficiency_choices.map((proficiencyChoice) =>
				this.choiceMapper.map(proficiencyChoice),
			),
			proficiencies: source.proficiencies.map((proficiency) =>
				this.baseResourceMapper.map(proficiency),
			),
			saving_throws: source.saving_throws.map((savingThrow) =>
				this.baseResourceMapper.map(savingThrow),
			),
			subclasses: source.subclasses.map((subclass) =>
				this.baseResourceMapper.map(subclass),
			),
		};
	}

	private mapMultiClassing(source: MultiClassingApiDto): MultiClassing {
		return {
			prerequisites:
				source.prerequisites === undefined
					? []
					: source.prerequisites.map((prerequisite) =>
							this.mapPrerequisite(prerequisite),
						),
			prerequisite_options:
				source.prerequisite_options === undefined
					? undefined
					: this.choiceMapper.map(source.prerequisite_options),
			proficiencies: source.proficiencies.map((proficiency) =>
				this.baseResourceMapper.map(proficiency),
			),
			proficiency_choices: source.proficiency_choices?.map(
				(proficiencyChoice) => this.choiceMapper.map(proficiencyChoice),
			),
		};
	}

	private mapPrerequisite(source: PrerequisiteApiDto): Prerequisite {
		return {
			ability_score: this.baseResourceMapper.map(source.ability_score),
			minimum_score: source.minimum_score,
		};
	}

	private mapSpellcasting(
		source?: SpellCastingApiDto,
	): SpellCasting | undefined {
		if (source === undefined) {
			return undefined;
		}

		return {
			level: source.level,
			info: source.info.map((info) => this.mapSpellCastingInfo(info)),
			spellcasting_ability: this.baseResourceMapper.map(
				source.spellcasting_ability,
			),
		};
	}

	private mapSpellCastingInfo(
		source: SpellCastingInfoApiDto,
	): SpellCastingInfo {
		return {
			name: source.name,
			desc: source.desc,
		};
	}

	private mapStartingEquipment(
		source: StartingEquipmentApiDto,
	): StartingEquipment {
		return {
			quantity: source.quantity,
			equipment: this.baseResourceMapper.map(source.equipment),
		};
	}
}
