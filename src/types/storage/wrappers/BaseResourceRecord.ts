/**
 * Base interface for all D&D 5e homebrew resource records.
 * Provides common properties shared by all game resources like classes, races, spells, etc.
 * Only used for storage.
 */
export interface BaseResourceRecord {
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
	 * @example "classes", "races", "monsters"
	 */
	resourceType: string;

	/**
	 * Additional notes or comments about the resource.
	 * User-defined. Optional.
	 */
	notes?: string;
}
