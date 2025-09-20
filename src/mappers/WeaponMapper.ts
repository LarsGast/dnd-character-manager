import { IMapper } from "../interfaces/IMapper";
import { DamageApiDto, RangeApiDto, WeaponApiDto } from "../types/api/resources/WeaponApiDto";
import { EquipmentApiDto } from "../types/api/resources/EquipmentApiDto";
import { Damage, Range, Weapon } from "../types/domain/resources/Weapon";
import { Equipment } from "../types/domain/resources/Equipment";
import { BaseResourceApiDto } from "../types/api/wrappers/BaseResourceApiDto";
import { BaseResource } from "../types/domain/wrappers/BaseResource";

export class WeaponMapper implements IMapper<WeaponApiDto, Weapon> {

    /**
     * For mapping minimal API data to an internal object.
     */
    private readonly baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>;
    /**
     * For mapping minimal API data to an internal object.
     */
    private readonly equipmentMapper: IMapper<EquipmentApiDto, Equipment>;
    
    public constructor(baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>, equipmentMapper: IMapper<EquipmentApiDto, Equipment>) {
        this.baseResourceMapper = baseResourceMapper;
        this.equipmentMapper = equipmentMapper;
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
            properties: source.properties.map(property => this.baseResourceMapper.map(property))
        };
    }

    private mapDamage(source?: DamageApiDto): Damage | undefined {
        if (source === undefined) {
            return undefined
        }

        return {
            damage_dice: source.damage_dice,
            damage_type: this.baseResourceMapper.map(source.damage_type)
        };
    }

    private mapRange(source?: RangeApiDto): Range | undefined {
        if (source === undefined) {
            return undefined
        }

        return {
            normal: source.normal,
            long: source.long
        };
    }
}