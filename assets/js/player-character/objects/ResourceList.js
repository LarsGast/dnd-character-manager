import { ApiObjectInfo } from "./ApiObjectInfo.js";

export class ResourceList {

    /**
     * Total count of all results.
     * Equal to results.length.
     * @type {number}
     */
    count;

    /**
     * Information about the each resource.
     * Not the full resource, but includes the index, name, and url to the resource.
     * @type {ApiObjectInfo[]}
     */
    results;
}