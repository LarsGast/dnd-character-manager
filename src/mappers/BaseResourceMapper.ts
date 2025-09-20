import { IMapper } from "../interfaces/IMapper";
import { BaseResourceApiDto } from "../types/api/wrappers/BaseResourceApiDto";
import { BaseResource } from "../types/domain/wrappers/BaseResource";

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