import { ApiObjectInfo } from "./ApiObjectInfo.js";

export interface ResourceList<T extends ApiObjectInfo = ApiObjectInfo> {

    /**
     * Total count of all results.
     * Equal to results.length.
     */
    count: number;

    /**
     * Information about the each resource.
     * Not the full resource, but includes the index, name, and url to the resource.
     */
    results: T[];
}