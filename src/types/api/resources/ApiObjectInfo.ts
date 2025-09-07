import { ApiCategory } from "../../../services/api.js";

export class ApiObjectInfo {

    /**
     * Enum-like value that holds the endpoints of given class.
     * Must be implemented in every class that extends ApiBaseObject.
     */
    static apiCategory: ApiCategory;

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
    url: string | undefined;

    /**
     * Constructor.
     * @param data Full object as specified in the 5e SRD API.
     */
    constructor(data: Partial<ApiObjectInfo> = {}) {
        this.index = data.index ?? "";
        this.name = data.name ?? "";
        this.url = data.url;
    }

    /**
     * Creates a new instance of the object with default values.
     * This is used for creating new homebrew objects.
     * @returns A new instance with default values.
     */
    static getDefault(): ApiObjectInfo {
        const obj = new this();

        obj.index = self.crypto.randomUUID();
        obj.name = "New Custom Object";
    
        return obj;
    }

    /**
     * Returns the API category of the object.
     * This is used to determine the type of object when creating homebrew entries.
     */
    get apiCategory() {
        return (this.constructor as typeof ApiObjectInfo).apiCategory;
    }

    /**
     * Returns an object that can be used as an option in a select element.
     * @returns
     */
    getOptionTextAndValueFunc(): { optionText: string; optionValue: string; } {
        return {
            optionText: this.name,
            optionValue: this.index
        };
    }
}