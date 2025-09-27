import { IMapper } from "../interfaces/IMapper.js";
import { ProficiencyApiDto } from "../types/api/resources/ProficiencyApiDto.js";
import { BaseResourceApiDto } from "../types/api/wrappers/BaseResourceApiDto.js";
import { Proficiency } from "../types/domain/resources/Proficiency.js";
import { BaseResource } from "../types/domain/wrappers/BaseResource.js";

export class ProficiencyMapper implements IMapper<ProficiencyApiDto, Proficiency> {

    /**
     * For mapping minimal API data to an internal object.
     */
    private readonly baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>;
    
    public constructor(baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>) {
        this.baseResourceMapper = baseResourceMapper;
    }

    map(source: ProficiencyApiDto): Proficiency {
        return {
            ...this.baseResourceMapper.map(source),
            type: source.type,
            classes: source.classes.map(classObject => this.baseResourceMapper.map(classObject)),
            races: source.races.map(race => this.baseResourceMapper.map(race)),
            reference: this.baseResourceMapper.map(source.reference)
        }
    }
}