import { ApiObjectInfoApiDto } from "../wrappers/ApiObjectInfoApiDto.js";

export interface FeatureApiDto extends ApiObjectInfoApiDto {

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
    class: ApiObjectInfoApiDto;

    /**
     * The subclass that this feature is a prt of.
     */
    subclass: ApiObjectInfoApiDto;

    /**
     * The parent feature that this feature is a part of.
     * undefined if this features does not have a parent.
     */
    parent: ApiObjectInfoApiDto;

    /**
     * The prerequisites for this feature.
     */
    prerequisites: object[];

    /**
     * Information specific to this feature.
     */
    feature_specific: any;
}