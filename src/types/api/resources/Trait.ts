import { ApiCategory } from "../../../services/api.js";
import { Choice } from "../helpers/Choice.js";
import { ApiBaseObject } from "./ApiBaseObject.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";

export class Trait extends ApiBaseObject {

    static override apiCategory = ApiCategory.Traits;

    /**
     * Description of the trait.
     * Can consist of multiple paragraphs.
     */
    desc: string[] = [];

    /**
     * List of races that get this trait.
     */
    races: ApiObjectInfo[] = [];

    /**
     * List of subraces that get this trait.
     */
    subraces: ApiObjectInfo[] = [];

    /**
     * List of proficiencies that this trait provides.
     */
    proficiencies: ApiObjectInfo[] = [];

    /**
     * If applicable, a choice in proficiencies that the player can make when getting this trait.
     */
    proficiency_choices: Choice = new Choice();

    /**
     * If applicable, a choice in languages that the player can make when getting this trait.
     */
    language_options: Choice = new Choice();

    /**
     * Any extra trait-specific information.
     * Can differ in specification per trait.
     */
    trait_specific: any;
    
    /**
     * Constructor.
     * @param data Full object as specified in the 5e SRD API.
     */
    constructor(data: Partial<Trait> = {}) {
        super(data);

        this.desc = data.desc ?? [];
        this.races = data.races?.map(r => new ApiObjectInfo(r)) ?? [];
        this.subraces = data.subraces?.map(sr => new ApiObjectInfo(sr)) ?? [];
        this.proficiencies = data.proficiencies?.map(p => new ApiObjectInfo(p)) ?? [];
        this.proficiency_choices = Object.assign(new Choice(), data.proficiency_choices);
        this.language_options = Object.assign(new Choice(), data.language_options);
        this.trait_specific = data.trait_specific ?? {};
    }
}