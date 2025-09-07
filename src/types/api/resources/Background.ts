import { ApiCategory } from "../../../services/api.js";
import { ApiBaseObject } from "./ApiBaseObject.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";
import { Choice } from "../helpers/Choice.js";

class BackgroundFeature {
    name: string;
    desc: string[];

    constructor(data: Partial<BackgroundFeature> = {}) {
        this.name = data.name ?? "";
        this.desc = data.desc ?? [];
    }
}

export class Background extends ApiBaseObject {

    static override apiCategory = ApiCategory.Backgrounds;

    /**
     * Starting proficiencies for all new characters of this background.
     */
    starting_proficiencies: ApiObjectInfo[];

    /**
     * Choice of languages for all new characters of this background.
     */
    language_options: Choice;

    /**
     * Starting equipment for all new characters of this background.
     */
    starting_equipment: ApiObjectInfo[];

    /**
     * Choice of equipment for all new characters of this background.
     */
    starting_equipment_options: Choice;

    /**
     * Special feature granted to new characters of this background.
     */
    feature: BackgroundFeature;

    /**
     * Choice of personality traits for all new characters of this background.
     */
    personality_traits: Choice;

    /**
     * Choice of ideals for all new characters of this background.
     */
    ideals: Choice;

    /**
     * Choice of bonds for all new characters of this background.
     */
    bonds: Choice;

    /**
     * Choice of flaws for all new characters of this background.
     */
    flaws: Choice;

    /**
     * Constructor.
     * @param data Full object as specified in the 5e SRD API.
     */
    constructor(data: Partial<Background> = {}) {
        super(data);
        
        this.starting_proficiencies = (data.starting_proficiencies ?? []).map(prof => new ApiObjectInfo(prof));
        this.language_options = new Choice(data.language_options);
        this.starting_equipment = (data.starting_equipment ?? []).map(equip => new ApiObjectInfo(equip));
        this.starting_equipment_options = new Choice(data.starting_equipment_options);
        this.feature = data.feature ? new BackgroundFeature(data.feature) : new BackgroundFeature();
        this.personality_traits = new Choice(data.personality_traits);
        this.ideals = new Choice(data.ideals);
        this.bonds = new Choice(data.bonds);
        this.flaws = new Choice(data.flaws);
    }
}