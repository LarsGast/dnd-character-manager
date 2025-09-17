import { ApiObjectInfo } from "../wrappers/ApiObjectInfo.js";

export interface Feature extends ApiObjectInfo {

    /**
     * Description of the resource.
     */
    desc: string[];

    /**
     * The level this feature is gained.
     */
    level: number;

    /**
     * The class that this feature is a prt of.
     */
    class: ApiObjectInfo;

    /**
     * The subclass that this feature is a prt of.
     */
    subclass: ApiObjectInfo;

    /**
     * The parent feature that this feature is a part of.
     * undefined if this features does not have a parent.
     */
    parent: ApiObjectInfo;

    /**
     * The prerequisites for this feature.
     */
    prerequisites: object[];

    /**
     * Information specific to this feature.
     */
    feature_specific: any;
}