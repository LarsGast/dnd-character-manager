export interface BaseResourceApiDto {

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
    url: URL;
}