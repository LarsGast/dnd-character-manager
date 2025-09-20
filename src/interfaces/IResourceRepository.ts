import { BaseResource } from "../types/domain/wrappers/BaseResource";
import { ResourceList } from "../types/domain/wrappers/ResourceList";

/**
 * Interface for a resource repository.
 * Used for getting DnD resources of a certain type, like spells, races, classes, etc.
 */
export interface IResourceRepository<T extends BaseResource> {

    /**
     * Get a resource from the repository.
     * @param id Identifier of the resource.
     * @returns undefined if no resource exists in with given id.
     */
    getAsync(id: string): Promise<T | undefined>;

    /**
     * Get all resources of type T.
     * @returns A ResourceList, which includes minimal information about every resource of the given type.
     */
    getAllAsync(): Promise<ResourceList>;
}