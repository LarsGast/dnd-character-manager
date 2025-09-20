import { IMapper } from "../interfaces/IMapper";
import { ChoiceApiDto } from "../types/api/helpers/ChoiceApiDto";
import { TraitApiDto } from "../types/api/resources/TraitApiDto";
import { BaseResourceApiDto } from "../types/api/wrappers/BaseResourceApiDto";
import { Choice } from "../types/domain/helpers/Choice";
import { Trait } from "../types/domain/resources/Trait";
import { BaseResource } from "../types/domain/wrappers/BaseResource";

export class TraitMapper implements IMapper<TraitApiDto, Trait> {

    /**
     * For mapping minimal API data to an internal object.
     */
    private readonly baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>;

    /**
     * For mapping choice objects to internal objects.
     */
    private readonly choiceMapper: IMapper<ChoiceApiDto, Choice>;

    public constructor(baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>, choiceMapper: IMapper<ChoiceApiDto, Choice>) {
        this.baseResourceMapper = baseResourceMapper;
        this.choiceMapper = choiceMapper;
    }

    map(source: TraitApiDto): Trait {
        return {
            ...this.baseResourceMapper.map(source),
            desc: source.desc,
            races: source.races.map(race => this.baseResourceMapper.map(race)),
            subraces: source.subraces.map(subrace => this.baseResourceMapper.map(subrace)),
            proficiencies: source.proficiencies.map(proficiency => this.baseResourceMapper.map(proficiency)),
            proficiency_choices: this.choiceMapper.map(source.proficiency_choices),
            language_options: this.choiceMapper.map(source.language_options),
            trait_specific: source.trait_specific
        };
    }
}