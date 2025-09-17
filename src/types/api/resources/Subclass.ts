import { ApiObjectInfo } from "../wrappers/ApiObjectInfo.js";

export interface Subclass extends ApiObjectInfo {

    /**
     * Description of the resource.
     */
    desc: string[];

    /**
     * Class that the subclass belongs to.
     */
    class: ApiObjectInfo;

    /**
     * Lore-friendly flavor text for a classes respective subclass.
     */
    subclass_flavor: string;

    /**
     * Resource url that shows the subclass level progression.
     */
    subclass_levels: string[];

    /**
     * Subclass specific spells.
     */
    spells: object[];
}