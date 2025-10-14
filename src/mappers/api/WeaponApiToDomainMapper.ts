import { IMapper } from '../../interfaces/IMapper';
import {
	DamageApiDto,
	RangeApiDto,
	WeaponApiDto,
} from '../../types/api/resources/WeaponApiDto';
import { EquipmentApiDto } from '../../types/api/resources/EquipmentApiDto';
import { Damage, Range, Weapon } from '../../types/domain/resources/Weapon';
import { Equipment } from '../../types/domain/resources/Equipment';
import { ResourceReferenceApiDto } from '../../types/api/helpers/ResourceReferenceApiDto';
import { ResourceReference } from '../../types/domain/helpers/ResourceReference';

export class WeaponApiToDomainMapper implements IMapper<WeaponApiDto, Weapon> {
	/**
	 * For mapping referenced resources to ResourceReference (properties, damage type).
	 */
	private readonly resourceReferenceMapper: IMapper<
		ResourceReferenceApiDto,
		ResourceReference
	>;
	/**
	 * For mapping minimal API data to an internal object.
	 */
	private readonly equipmentMapper: IMapper<EquipmentApiDto, Equipment>;

	public constructor(
		equipmentMapper: IMapper<EquipmentApiDto, Equipment>,
		resourceReferenceMapper: IMapper<
			ResourceReferenceApiDto,
			ResourceReference
		>,
	) {
		this.equipmentMapper = equipmentMapper;
		this.resourceReferenceMapper = resourceReferenceMapper;
	}

	public map(source: WeaponApiDto): Weapon {
		return {
			...this.equipmentMapper.map(source),
			weapon_category: source.weapon_category,
			weapon_range: source.weapon_range,
			category_range: source.category_range,
			damage: this.mapDamage(source.damage),
			range: this.mapRange(source.range)!,
			throw_range: this.mapRange(source.throw_range),
			properties: source.properties.map((p) =>
				this.resourceReferenceMapper.map(p),
			),
		};
	}

	private mapDamage(source?: DamageApiDto): Damage | undefined {
		if (source === undefined) {
			return undefined;
		}

		return {
			damage_dice: source.damage_dice,
			damage_type: this.resourceReferenceMapper.map(source.damage_type),
		};
	}

	private mapRange(source?: RangeApiDto): Range | undefined {
		if (source === undefined) {
			return undefined;
		}

		return {
			normal: source.normal,
			long: source.long,
		};
	}
}
