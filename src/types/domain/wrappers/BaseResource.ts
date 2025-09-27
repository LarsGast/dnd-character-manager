export interface BaseResource {

    /**
     * Unique identifier in the 5e SRD API.
     * UUID for homebrew objects.
     */
    index: string;

    /**
     * Display name of the object.
     */
    name: string;

    /**
     * Url to the object within the API.
     */
    url?: URL;

    /**
     * Type of the resource
     * @example "classes", "races", "monsters".
     */
    resourceType: string;

    /**
     * Wether this resource is created within this application (true), or fetched from an external source (false).
     */
    isHomebrew: boolean;
}