import { IMapper } from "../interfaces/IMapper";
import { AbilityBonusApiDto } from "../types/api/helpers/AbilityBonusApiDto";
import { BaseResourceApiDto } from "../types/api/wrappers/BaseResourceApiDto";
import { AbilityBonus } from "../types/domain/helpers/AbilityBonus";
import { BaseResource } from "../types/domain/wrappers/BaseResource";

export class AbilityBonusMapper implements IMapper<AbilityBonusApiDto, AbilityBonus> {

    /**
     * For mapping minimal API data to an internal object.
     */
    private readonly baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>;

    public constructor(baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>) {
        this.baseResourceMapper = baseResourceMapper;
    }

    /**
     * @inheritdoc
     */
    public map(source: AbilityBonusApiDto): AbilityBonus {
        return {
            ability_score: this.baseResourceMapper.map(source.ability_score),
            bonus: source.bonus
        }
    }
}