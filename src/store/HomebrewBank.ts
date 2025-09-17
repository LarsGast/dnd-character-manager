import { ApiCategory } from "../services/api.js";
import { BaseResourceApiDto } from "../types/api/wrappers/BaseResourceApiDto.js";
import { RaceApiDto } from "../types/api/resources/RaceApiDto.js";
import { TraitApiDto } from "../types/api/resources/TraitApiDto.js";

/**
 * Key used for saving and loading the homebrew bank from localStorage.
 * @constant {string}
 */
const CUSTOM_OBJECT_BANK_KEY = "homebrewBank";

/**
 * The current latest version of the homebrew bank object.
 * This should be updated whenever a breaking change is performed on the homebrew bank object specification.
 * @constant {number}
 */
export const LATEST_CUSTOM_OBJECT_BANK_VERSION_NUMBER = 1;

/**
 * The current latest version of the homebrew bank entry object.
 * This should be updated whenever a breaking change is performed on the homebrew bank entry object specification.
 * @constant {number}
 */
export const LATEST_CUSTOM_OBJECT_BANK_ENTRY_VERSION_NUMBER = 1;

/**
 * Object that contains all information of all homebrew objects the user has saved in the page.
 */
export class HomebrewBank {

    /**
     * Objects that contain all information about each saved homebrew object.
     */
    homebrewBankEntries: HomebrewBankEntry[];

    /**
     * Version number of the object bank.
     * Used to upgrade the bank when breaking changes in the data specification occur.
     */
    version: number;
    
    /**
     * Constructs a new HomebrewBank instance.
     * If data is provided, properties are assigned from it.
     * @param data Optional initial data for the object bank.
     */
    constructor(data: Partial<HomebrewBank> = {}) {
        this.homebrewBankEntries = (data.homebrewBankEntries ?? []).map(entry => new HomebrewBankEntry(entry));

        // Default 1, which might be upgraded on page load.
        this.version = data?.version ?? 1;
    }

    /**
     * Loads the homebrew bank from localStorage.
     * If no saved bank exists, returns a default bank.
     * @returns The loaded or default bank instance.
     */
    static load(): HomebrewBank {
        try {
            const homebrewBankAsString = localStorage.getItem(CUSTOM_OBJECT_BANK_KEY);

            // If no stored bank is found, create a new default one.
            // Should only occur if the user visits the site for the very first time.
            if (!homebrewBankAsString) {
                const defaultBank = HomebrewBank.getDefault();
                defaultBank.save();
                return defaultBank;
            }

            const homebrewBankAsJson = JSON.parse(homebrewBankAsString);

            return new HomebrewBank(homebrewBankAsJson);
        }
        catch (error) {
            console.error("Error parsing homebrew bank JSON:", error);
            return new HomebrewBank();
        }
    }

    /**
     * Returns a default HomebrewBank instance.
     * Sets the version to the latest version number.
     * @returns A new default object bank instance.
     */
    static getDefault(): HomebrewBank {
        const defaultBank = new HomebrewBank();

        defaultBank.version = LATEST_CUSTOM_OBJECT_BANK_VERSION_NUMBER;

        return defaultBank;
    }

    /**
     * Saves the homebrew bank object into localStorage to persist the data over multiple browser sessions.
     * Catches and logs any errors during saving.
     */
    save(): void {
        try {
            localStorage.setItem(CUSTOM_OBJECT_BANK_KEY, JSON.stringify(this));
        } catch (error) {
            console.error("Error while saving homebrew bank:", error);
        }
    }
    
    /**
     * Adds a single homebrew object to the bank.
     * @param homebrewObject 
     * @param apiCategoryName 
     */
    addNewHomebrew(homebrewObject: BaseResourceApiDto, apiCategoryName: string) {

        const bankEntry = new HomebrewBankEntry();

        bankEntry.homebrewObject = homebrewObject;
        bankEntry.apiCategoryName = apiCategoryName;
        bankEntry.version = LATEST_CUSTOM_OBJECT_BANK_ENTRY_VERSION_NUMBER;

        this.homebrewBankEntries.push(bankEntry);
    }

    /**
     * Removes a single homebrew object from the bank.
     * @param id UUID.
     */
    removeHomebrewFromBank(id: string) {
        this.homebrewBankEntries = this.homebrewBankEntries.filter(entry => entry.id != id);
    }

    /**
     * Get a HomebrewBankEntry by ID.
     * @param id UUID.
     * @returns {HomebrewBankEntry}
     */
    getHomebrewBankEntryByIndex(id: string): HomebrewBankEntry | undefined {
        return this.homebrewBankEntries.find(entry => entry.id === id);
    }

    /**
     * Get a HomebrewBankEntry by the index of the homebrew object.
     * @param id UUID of the homebrew object.
     * @returns The homebrew bank entry if found.
     */
    getHomebrewBankEntryByObjectIndex(id: string): HomebrewBankEntry | undefined {
        return this.homebrewBankEntries.find(entry => entry.homebrewObject.index === id);
    }

    /**
     * Get a homebrew object by its ID.
     * @param id UUID.
     * @return The homebrew object if found, otherwise undefined.
     */
    getHomebrewObjectByIndex(id: string): BaseResourceApiDto | undefined  {
        return this.homebrewBankEntries.find(entry => entry.homebrewObject.index === id)?.homebrewObject;
    }

    /**
     * Get all homebrew objects that belong to a specific API category.
     * @param apiCategory The API category to filter by.
     * @return An array of homebrew objects that belong to the specified category.
     */
    getHomebrewObjectsByCategory(apiCategory: ApiCategory): BaseResourceApiDto[] {
        return this.homebrewBankEntries
            .filter(entry => entry.apiCategoryName === apiCategory.name)
            .map(entry => entry.homebrewObject);
    }

    /**
     * Checks if a homebrew object exists in the bank by its index.
     * @param id UUID of the homebrew object.
     * @returns True if the homebrew object exists, false otherwise.
     */
    getDoesHomebrewObjectExistByIndex(id: string): boolean {
        return this.homebrewBankEntries.some(entry => entry.homebrewObject.index === id);
    }
}

/**
 * Object for storing information about a homebrew object in the HomebrewBank.
 * Each homebrew object gets their own HomebrewBankEntry, and all of them are put in localStorage under the same key.
 */
export class HomebrewBankEntry {

    /**
     * ID of the entry.
     * Different from the generated UUID in ApiObjectInfo, as that ID is for managing items in the DOM, and this ID is for managing objects in storage.
     */
    id: string;

    /**
     * All data required for a homebrew object.
     */
    homebrewObject: BaseResourceApiDto;

    /**
     * Name of the API category this homebrew object belongs to.
     * Used to determine which type of homebrew object this is.
     */
    apiCategoryName: string;

    /**
     * Date and time of the last time the homebrew object was edited.
     * This value gets updated when:
     * - The object is created (by import or manual)
     * - The object is saved
     */
    lastEdit: Date;

    /**
     * Version number of the homebrew bank entry.
     * Used to upgrade the bank entries when breaking changes in the data specification occur.
     * Default 1, which might be upgraded on page load.
     */
    version: number;
    
    /**
     * Constructs a new HomebrewBankEntry instance.
     * If data is provided, properties are assigned from it.
     * @param data Initial data for the object bank entry.
     */
    constructor(data: Partial<HomebrewBankEntry> = {}) {
        this.id = data.id ?? self.crypto.randomUUID();
        this.apiCategoryName = data.apiCategoryName ?? "";
        this.homebrewObject = this.getHomebrewObject(data.homebrewObject);
        this.lastEdit = data.lastEdit ? new Date(data.lastEdit) : new Date();
        this.version = data.version ?? 1;
    }

    /**
     * Gets the initialized version of the homebrewObject property based on the apiCategoryName.
     * This is necessary because the homebrewObject can be of different types depending on the category.
     * @returns The initialized homebrew object.
     */
    private getHomebrewObject(homebrewObject: Partial<BaseResourceApiDto> = {}): BaseResourceApiDto {
        switch (this.apiCategoryName) {
            case ApiCategory.Races.name: return new Race(homebrewObject);
            case ApiCategory.Traits.name: return new Trait(homebrewObject);
            default: return new ApiObjectInfo(homebrewObject);
        }
    }
}