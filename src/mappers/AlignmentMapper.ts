import { IMapper } from "../interfaces/IMapper.js";
import { AlignmentApiDto } from "../types/api/resources/AlignmentApiDto.js";
import { BaseResourceApiDto } from "../types/api/wrappers/BaseResourceApiDto.js";
import { Alignment } from "../types/domain/resources/Alignment.js";
import { BaseResource } from "../types/domain/wrappers/BaseResource.js";

export class AlignmentMapper implements IMapper<AlignmentApiDto, Alignment> {

    /**
     * For mapping minimal API data to an internal object.
     */
    private readonly baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>;
    
    public constructor(baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>) {
        this.baseResourceMapper = baseResourceMapper;
    }

    public map(source: AlignmentApiDto): Alignment {
        return {
            ...this.baseResourceMapper.map(source),
            abbreviation: source.abbreviation,
            desc: source.desc,
        }
    }
}