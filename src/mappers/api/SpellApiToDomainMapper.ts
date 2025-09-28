import { IMapper } from '../../interfaces/IMapper.js';
import {
	AreaOfEffectApiDto,
	SpellApiDto,
	SpellDamageApiDto,
	SpellDcApiDto,
} from '../../types/api/resources/SpellApiDto.js';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto.js';
import {
	AreaOfEffect,
	Spell,
	SpellDamage,
	SpellDc,
} from '../../types/domain/resources/Spell.js';
import { BaseResource } from '../../types/domain/wrappers/BaseResource.js';

export class SpellApiToDomainMapper implements IMapper<SpellApiDto, Spell> {
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

	/**
	 * @inheritdoc
	 */
	public map(source: SpellApiDto): Spell {
		return {
			...this.baseResourceMapper.map(source),
			desc: source.desc,
			higher_level: source.higher_level,
			range: source.range,
			components: source.components,
			material: source.material,
			area_of_effect:
				source.area_of_effect === undefined
					? undefined
					: this.mapAreaOfEffect(source.area_of_effect),
			ritual: source.ritual,
			duration: source.duration,
			concentration: source.concentration,
			casting_time: source.casting_time,
			level: source.level,
			attack_type: source.attack_type,
			damage:
				source.damage === undefined ? undefined : this.mapDamage(source.damage),
			dc: source.dc === undefined ? undefined : this.mapDc(source.dc),
			school: this.baseResourceMapper.map(source.school),
			classes: source.classes.map(this.baseResourceMapper.map),
			subclasses: source.subclasses.map(this.baseResourceMapper.map),
		};
	}

	private mapAreaOfEffect(source: AreaOfEffectApiDto): AreaOfEffect {
		return {
			type: source.type,
			size: source.size,
		};
	}

	private mapDamage(source: SpellDamageApiDto): SpellDamage {
		return {
			damage_type: this.baseResourceMapper.map(source.damage_type),
			damage_at_slot_level: source.damage_at_slot_level,
			damage_at_character_level: source.damage_at_character_level,
		};
	}

	private mapDc(source: SpellDcApiDto): SpellDc {
		return {
			dc_type: this.baseResourceMapper.map(source.dc_type),
			dc_value: source.dc_value,
			dc_success: source.dc_success,
		};
	}
}
