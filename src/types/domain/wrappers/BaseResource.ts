/**
 * Base interface for all D&D 5e resources in the domain model.
 * Provides common properties shared by all game resources like classes, races, spells, etc.
 */
export interface BaseResource {

    /**
     * Unique identifier in the 5e SRD API.
     * For homebrew objects, this will be a UUID.
     */
    index: string;

    /**
     * Human-readable display name of the resource.
     */
    name: string;

    /**
     * URL to the resource within the API (optional).
     */
    url?: URL;

    /**
     * Type of the resource indicating its category.
     * @example "classes", "races", "monsters"
     */
    resourceType: string;

    /**
     * Whether this resource is user-created homebrew (true) or from the official SRD (false).
     */
    isHomebrew: boolean;
}