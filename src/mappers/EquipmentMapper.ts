import { IMapper } from "../interfaces/IMapper.js";
import { CostApiDto, EquipmentApiDto } from "../types/api/resources/EquipmentApiDto.js";
import { BaseResourceApiDto } from "../types/api/wrappers/BaseResourceApiDto.js";
import { Cost, Equipment } from "../types/domain/resources/Equipment.js";
import { BaseResource } from "../types/domain/wrappers/BaseResource.js";

export class EquipmentMapper implements IMapper<EquipmentApiDto, Equipment> {

    /**
     * For mapping minimal API data to an internal object.
     */
    private readonly baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>;
    
    public constructor(baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>) {
        this.baseResourceMapper = baseResourceMapper;
    }

    public map(source: EquipmentApiDto): Equipment {
        return {
            ...this.baseResourceMapper.map(source),
            desc: source.desc,
            special: source.special,
            equipment_category: this.baseResourceMapper.map(source.equipment_category),
            cost: this.mapCost(source.cost),
            weight: source.weight,
        };
    }

    private mapCost(source: CostApiDto): Cost {
        return {
            quantity: source.quantity,
            unit: source.unit
        };
    }

}