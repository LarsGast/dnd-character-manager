import { IMapper } from "../interfaces/IMapper.js";
import { ArmorApiDto, ArmorClassApiDto } from "../types/api/resources/ArmorApiDto.js";
import { EquipmentApiDto } from "../types/api/resources/EquipmentApiDto.js";
import { Armor, ArmorClass } from "../types/domain/resources/Armor.js";
import { Equipment } from "../types/domain/resources/Equipment.js";

export class ArmorMapper implements IMapper<ArmorApiDto, Armor> {
    /**
     * For mapping minimal API data to an internal object.
     */
    private readonly equipmentMapper: IMapper<EquipmentApiDto, Equipment>;
    
    public constructor(equipmentMapper: IMapper<EquipmentApiDto, Equipment>) {
        this.equipmentMapper = equipmentMapper;
    }

    public map(source: ArmorApiDto): Armor {
        return {
            ...this.equipmentMapper.map(source),
            armor_category: source.armor_category,
            armor_class: this.mapArmorClass(source.armor_class),
            str_minimum: source.str_minimum,
            stealth_disadvantage: source.stealth_disadvantage
        };
    }

    private mapArmorClass(source: ArmorClassApiDto): ArmorClass {
        return {
            base: source.base,
            dex_bonus: source.dex_bonus,
            max_bonus: source.max_bonus
        };
    }
}