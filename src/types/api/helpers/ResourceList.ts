import { ApiObjectInfo } from "../resources/ApiObjectInfo.js";

export class ResourceList {

    /**
     * Total count of all results.
     * Equal to results.length.
     */
    count: number;

    /**
     * Information about the each resource.
     * Not the full resource, but includes the index, name, and url to the resource.
     */
    results: ApiObjectInfo[];

    constructor(data: Partial<ResourceList> = {}) {
        this.count = data.count ?? 0;
        this.results = (data.results ?? []).map(result => new ApiObjectInfo(result));
    }
}