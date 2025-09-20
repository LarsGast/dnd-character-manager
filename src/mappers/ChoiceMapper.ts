import { IMapper } from "../interfaces/IMapper";
import { ChoiceApiDto, OptionApiDto, OptionSetApiDto } from "../types/api/helpers/ChoiceApiDto";
import { BaseResourceApiDto } from "../types/api/wrappers/BaseResourceApiDto";
import { Choice, Option, OptionSet } from "../types/domain/helpers/Choice";
import { BaseResource } from "../types/domain/wrappers/BaseResource";

export class ChoiceMapper implements IMapper<ChoiceApiDto, Choice> {

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
    public map(source: ChoiceApiDto): Choice {
        return {
            desc: source.desc,
            choose: source.choose,
            type: source.type,
            from: this.mapOptionSet(source.from)
        }
    }

    /**
     * Map the optionset from API to internal object.
     * @param source Optionset as described in API spec.
     * @returns Optionset as internal object.
     */
    private mapOptionSet(source: OptionSetApiDto): OptionSet {
        return {
            option_set_type: source.option_set_type,
            resource_list_url: source.resource_list_url,
            equipment_category: source.equipment_category,
            options: source.options.map(option => this.mapOption(option))
        }
    }

    /**
     * Map the option from API to internal object.
     * @param source Option as described in API spec.
     * @returns Option as internal object.
     */
    private mapOption(source: OptionApiDto): Option {
        return {
            option_type: source.option_type,
            item: this.baseResourceMapper.map(source.item),
            action_name: source.action_name,
            count: source.count,
            type: source.type,
            items: source.items.map(item => this.mapOption(item)),
            choice: this.map(source.choice),
            string: source.string,
            desc: source.desc,
            alignments: source.alignments.map(alignment => this.baseResourceMapper.map(alignment)),
            of: this.baseResourceMapper.map(source.of),
            ability_score: this.baseResourceMapper.map(source.ability_score),
            minimum_score: source.minimum_score,
            bonus: source.bonus,
            name: source.name,
            dc: source.dc,
            damage: source.damage,
            damage_type: this.baseResourceMapper.map(source.damage_type),
            damage_dice: source.damage_dice,
            notes: source.notes
        }
    }
}