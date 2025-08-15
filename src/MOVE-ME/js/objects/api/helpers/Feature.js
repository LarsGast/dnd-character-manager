import { ApiCategory } from "../../../api.js";
import { ApiBaseObject } from "../resources/ApiBaseObject.js";

export class Feature extends ApiBaseObject {

    static apiCategory = ApiCategory.Features;

    /**
     * Description of the resource.
     * @type {string[]}
     */
    desc;

    /**
     * The level this feature is gained.
     * @type {number}
     */
    level;

    /**
     * The class that this feature is a prt of.
     * @type {ApiBaseObject}
     */
    class;

    /**
     * The subclass that this feature is a prt of.
     * @type {ApiBaseObject}
     */
    subclass;

    /**
     * The parent feature that this feature is a part of.
     * undefined if this features does not have a parent.
     * @type {ApiBaseObject}
     */
    parent;

    /**
     * The prerequisites for this feature.
     * @type {object[]}
     */
    prerequisites;

    /**
     * Information specific to this feature.
     * @type {any}
     */
    feature_specific;

    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }
}