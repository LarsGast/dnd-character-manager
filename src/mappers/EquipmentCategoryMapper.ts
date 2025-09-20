import { IMapper } from "../interfaces/IMapper";
import { EquipmentCategoryApiDto } from "../types/api/resources/EquipmentCategoryApiDto";
import { BaseResourceApiDto } from "../types/api/wrappers/BaseResourceApiDto";
import { EquipmentCategory } from "../types/domain/resources/EquipmentCategory";
import { BaseResource } from "../types/domain/wrappers/BaseResource";

export class EquipmentCategoryMapper implements IMapper<EquipmentCategoryApiDto, EquipmentCategory> {

    /**
     * For mapping minimal API data to an internal object.
     */
    private readonly baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>;
    
    public constructor(baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>) {
        this.baseResourceMapper = baseResourceMapper;
    }

    map(source: EquipmentCategoryApiDto): EquipmentCategory {
        return {
            ...this.baseResourceMapper.map(source),
            equipment: source.equipment.map(equipmentItem => this.baseResourceMapper.map(equipmentItem))
        }
    }
}