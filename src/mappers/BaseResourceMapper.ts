import { IMapper } from "../interfaces/IMapper.js";
import { BaseResourceApiDto } from "../types/api/wrappers/BaseResourceApiDto.js";
import { BaseResource } from "../types/domain/wrappers/BaseResource.js";

export class BaseResourceMapper implements IMapper<BaseResourceApiDto, BaseResource> {

    /**
     * @inheritdoc
     */
    map(source: BaseResourceApiDto): BaseResource {
        return {
            index: source.index,
            name: source.name,
            url: source.url,
            resourceType: "",
            isHomebrew: false
        }
    }
}