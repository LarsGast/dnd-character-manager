import { IMapper } from "../interfaces/IMapper.js";
import { SubclassApiDto } from "../types/api/resources/SubclassApiDto.js";
import { BaseResourceApiDto } from "../types/api/wrappers/BaseResourceApiDto.js";
import { Subclass } from "../types/domain/resources/Subclass.js";
import { BaseResource } from "../types/domain/wrappers/BaseResource.js";

export class SubclassMapper implements IMapper<SubclassApiDto, Subclass> {

    /**
     * For mapping minimal API data to an internal object.
     */
    private readonly baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>;
    
    public constructor(baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>) {
        this.baseResourceMapper = baseResourceMapper;
    }

    map(source: SubclassApiDto): Subclass {
        return {
            ...this.baseResourceMapper.map(source),
            desc: source.desc,
            class: this.baseResourceMapper.map(source.class),
            subclass_flavor: source.subclass_flavor,
            subclass_levels: source.subclass_levels,
            spells: source.spells
        }
    }
}