import { BaseResource } from "../types/domain/wrappers/BaseResource";

/**
 * Interface for a homebrew storage repository.
 * Used to store homebrew content.
 */
export interface IHomebrewRepository {

    /**
     * Get a homebrew resource from the repository.
     * @param key Identifier of the homebrew resource.
     * @returns undefined if no homebrew resource exists in storage with given key.
     */
    get<T extends BaseResource>(id: string): T | undefined;

    /**
     * Save a homebrew resource to the repository.
     * @param key Identifier of the homebrew resource.
     * @param value Value of the homebrew resource.
     */
    save<T extends BaseResource>(id: string, value: T): void;

    /**
     * Get all homebrew resources from the repository.
     * @returns Array of all homebrew resources in storage
     */
    getAll(): BaseResource[];

    /**
     * Get all homebrew resources from the repository by resource type
     * @param resourceType Resource to get all homebrew resources from (e.g. "classes", "races", "spells").
     * @returns All homebrew resources of given resource type.
     */
    getAllByResourceType<T extends BaseResource>(resourceType: string): T[];
}