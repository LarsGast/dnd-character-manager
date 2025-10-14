export interface ResourceReference {
	/**
	 * Unique identifier in the 5e SRD API.
	 * For homebrew objects, this will be a UUID.
	 */
	index: string;

	/**
	 * Human-readable display name of the resource.
	 */
	name: string;
}
