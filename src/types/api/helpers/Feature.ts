import { ApiCategory } from "../../../services/api.js";
import { ApiBaseObject } from "../resources/ApiBaseObject.js";
import { ApiObjectInfo } from "../resources/ApiObjectInfo.js";

export class Feature extends ApiBaseObject {

    static override apiCategory = ApiCategory.Features;

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

    /**
     * Constructor.
     * @param data Full object as specified in the 5e SRD API.
     */
    constructor(data: Partial<Feature> = {}) {
        super(data);
        
        this.desc = data.desc ?? [];
        this.level = data.level ?? 0;
        this.class = data.class ? new ApiObjectInfo(data.class) : new ApiObjectInfo();
        this.subclass = data.subclass ? new ApiObjectInfo(data.subclass) : new ApiObjectInfo();
        this.parent = data.parent ? new ApiObjectInfo(data.parent) : new ApiObjectInfo();
        this.prerequisites = data.prerequisites ?? [];
        this.feature_specific = data.feature_specific ?? {};
    }
}