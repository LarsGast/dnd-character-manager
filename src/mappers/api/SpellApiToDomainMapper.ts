import { IMapper } from '../../interfaces/IMapper';
import {
	AreaOfEffectApiDto,
	SpellApiDto,
	SpellDamageApiDto,
	SpellDcApiDto,
} from '../../types/api/resources/SpellApiDto';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto';
import { ResourceReferenceApiDto } from '../../types/api/helpers/ResourceReferenceApiDto';
import { ResourceReference } from '../../types/domain/helpers/ResourceReference';
import {
	AreaOfEffect,
	Spell,
	SpellDamage,
	SpellDc,
} from '../../types/domain/resources/Spell';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';

export class SpellApiToDomainMapper implements IMapper<SpellApiDto, Spell> {
	/**
	 * For mapping base resource fields.
	 */
	private readonly baseResourceMapper: IMapper<
		BaseResourceApiDto,
		BaseResource
	>;

	/**
	 * For mapping referenced resources to ResourceReference.
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
			school: this.resourceReferenceMapper.map(source.school),
			classes: source.classes.map(this.resourceReferenceMapper.map),
			subclasses: source.subclasses.map(this.resourceReferenceMapper.map),
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
			damage_type: this.resourceReferenceMapper.map(source.damage_type),
			damage_at_slot_level: source.damage_at_slot_level,
			damage_at_character_level: source.damage_at_character_level,
		};
	}

	private mapDc(source: SpellDcApiDto): SpellDc {
		return {
			dc_type: this.resourceReferenceMapper.map(source.dc_type),
			dc_value: source.dc_value,
			dc_success: source.dc_success,
		};
	}
}
