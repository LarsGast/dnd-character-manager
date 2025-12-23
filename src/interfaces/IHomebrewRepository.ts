import { ResourceTypeRecord } from '../types/storage/helpers/ResourceTypeRecord';
import { BaseResourceRecord } from '../types/storage/wrappers/BaseResourceRecord';

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
	get<T extends BaseResourceRecord>(id: string): T | undefined;

	/**
	 * Save a homebrew resource to the repository.
	 * @param key Identifier of the homebrew resource.
	 * @param value Value of the homebrew resource.
	 */
	save<T extends BaseResourceRecord>(id: string, value: T): void;

	/**
	 * Delete a homebrew resource
	 * @param id Identifier of the homebrew resource.
	 */
	delete(id: string): void;

	/**
	 * Get all homebrew resources from the repository.
	 * @returns Array of all homebrew resources in storage
	 */
	getAll(): BaseResourceRecord[];

	/**
	 * Get all homebrew resources from the repository by resource type
	 * @param resourceType Resource to get all homebrew resources from (e.g. classes, races, spells).
	 * @returns All homebrew resources of given resource type.
	 */
	getAllByResourceType<T extends BaseResourceRecord>(
		resourceType: ResourceTypeRecord,
	): T[];
}
