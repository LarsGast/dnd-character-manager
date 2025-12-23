import { ResourceTypeRecord } from '../helpers/ResourceTypeRecord';

/**
 * Current version number for homebrew resource records.
 * Increment this number whenever the BaseResourceRecord interface has breaking changes.
 */
export const HOMEBREW_RESOURCE_RECORD_VERSION = 1;

/**
 * Base interface for all D&D 5e homebrew resource records.
 * Provides common properties shared by all game resources like classes, races, spells, etc.
 * Only used for storage.
 */
export interface BaseResourceRecord {
	/**
	 * Version number for the resource record.
	 * Used for migration and compatibility checks.
	 */
	version: number;

	/**
	 * Unique identifier for the resource.
	 * UUID.
	 */
	id: string;

	/**
	 * Human-readable display name of the resource.
	 */
	name: string;

	/**
	 * Type of the resource indicating its category.
	 * @example classes, races, monsters
	 */
	resourceType: ResourceTypeRecord;

	/**
	 * Additional notes or comments about the resource.
	 * User-defined. Optional.
	 */
	notes?: string;
}
