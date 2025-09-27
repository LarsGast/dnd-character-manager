import { BaseResource } from "./BaseResource.js";

/**
 * Represents a collection of resources with metadata.
 * Used for API responses that return lists of resources like classes, races, etc.
 */
export interface ResourceList {

    /**
     * Total count of all results in the list.
     * Should equal results.length.
     */
    count: number;

    /**
     * Array of base resource objects containing summary information.
     * These are not full resource objects, but include the essential properties (index, name, url) needed to identify and fetch the complete resource.
     */
    results: BaseResource[];
}