import { IMapper } from "../interfaces/IMapper.js";
import { ChoiceApiDto, OptionApiDto, OptionSetApiDto } from "../types/api/helpers/ChoiceApiDto.js";
import { BaseResourceApiDto } from "../types/api/wrappers/BaseResourceApiDto.js";
import { Choice, Option, OptionSet } from "../types/domain/helpers/Choice.js";
import { BaseResource } from "../types/domain/wrappers/BaseResource.js";

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
            options: source.options === undefined ? undefined : source.options.map(option => this.mapOption(option))
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
            item: source.item === undefined ? undefined : this.baseResourceMapper.map(source.item),
            action_name: source.action_name,
            count: source.count,
            type: source.type,
            items: source.items === undefined ? undefined : source.items.map(item => this.mapOption(item)),
            choice: source.choice === undefined ? undefined : this.map(source.choice),
            string: source.string,
            desc: source.desc,
            alignments: source.alignments === undefined ? undefined : source.alignments.map(alignment => this.baseResourceMapper.map(alignment)),
            of: source.of === undefined ? undefined : this.baseResourceMapper.map(source.of),
            ability_score: source.ability_score === undefined ? undefined : this.baseResourceMapper.map(source.ability_score),
            minimum_score: source.minimum_score,
            bonus: source.bonus,
            name: source.name,
            dc: source.dc,
            damage: source.damage,
            damage_type: source.damage_type === undefined ? undefined : this.baseResourceMapper.map(source.damage_type),
            damage_dice: source.damage_dice,
            notes: source.notes
        }
    }
}