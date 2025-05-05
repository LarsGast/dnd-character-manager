import { updateCharacter } from "../update-character.js";
import { PlayerCharacter } from "./PlayerCharacter.js";

/**
 * Key used for saving and loading the player character bank from localStorage.
 * @constant {string}
 */
const PLAYER_CHARACTER_BANK_KEY = "playerCharacterBank";

/**
 * The current latest version of the PC bank object.
 * This should be updated whenever a breaking change is performed on the PC bank object specification.
 * @constant {number}
 */
export const LATEST_PLAYER_CHARACTER_BANK_VERSION_NUMBER = 1;

/**
 * The current latest version of the PC bank entry object.
 * This should be updated whenever a breaking change is performed on the PC bank entry object specification.
 * @constant {number}
 */
export const LATEST_PLAYER_CHARACTER_BANK_ENTRY_VERSION_NUMBER = 1;

/**
 * Object for storing information about a playerCharacter in the PlayerCharacterBank.
 * Each PC gets their own PlayerCharacterBankEntry, and all of them are put in localStorage under the same key.
 */
export class PlayerCharacterBankEntry {

    /**
     * UUID.
     * Used for managing characters (selecting, exporting, deleting).
     * @type {`${string}-${string}-${string}-${string}-${string}`}
     */
    id = self.crypto.randomUUID();

    /**
     * Wether the playerCharacter of this entry is the active one.
     * There can only be one active PC at a time.
     * @type {boolean}
     */
    isActive = false;

    /**
     * All character data needed to load and initialize all elements on the page.
     * @type {PlayerCharacter}
     */
    playerCharacter;

    /**
     * Date and time of the last time the playerCharacter was edited.
     * This value gets updated when:
     * - The character is created (by import or manual)
     * - The character is put into storage (becomes no longer active).
     * 
     * This value does NOT get updated on each change of the PC, it is purely used for sorting the characters in storage when displaying them.
     * @type {Date}
     */
    lastEdit = new Date();

    /**
     * Version number of the player bank entry.
     * Used to upgrade the bank entries when breaking changes in the data specification occur.
     * Default 1, which might be upgraded on page load.
     * @type {number}
     */
    version = 1;

    /**
     * Constructs a new PlayerCharacterBankEntry instance.
     * If data is provided, properties are assigned from it.
     * @param {JSON} data Initial data for the character bank entry.
     */
    constructor(data = {}) {
        Object.assign(this, data);

        // Initialize objects.
        this.playerCharacter = new PlayerCharacter(this.playerCharacter);
        this.lastEdit = new Date(this.lastEdit);
    }
}

/**
 * Object that contains all information of all playerCharacters the user has saved in the page.
 * Contains both active PCs and PCs in storage.
 * Also referred to as "Player bank", "Character bank", or simply "Bank".
 */
export class PlayerCharacterBank {

    /**
     * Objects that contain all information about each saved PC.
     * @type {PlayerCharacterBankEntry[]}
     */
    playerCharacterBankEntries = [];

    /**
     * Version number of the player bank.
     * Used to upgrade the bank when breaking changes in the data specification occur.
     * Default 1, which might be upgraded on page load.
     * @type {number}
     */
    version = 1;

    /**
     * Constructs a new PlayerCharacterBank instance.
     * If data is provided, properties are assigned from it.
     * @param {JSON} data Optional initial data for the character bank.
     */
    constructor(data = {}) {
        Object.assign(this, data);

        this.playerCharacterBankEntries = this.playerCharacterBankEntries.map(entry => new PlayerCharacterBankEntry(entry));
    }

    /**
     * Loads the character bank from localStorage.
     * If no saved bank exists, returns a default bank.
     * @returns {PlayerCharacterBank} The loaded or default bank instance.
     */
    static load() {
        try {
            const playerCharactersAsString = localStorage.getItem(PLAYER_CHARACTER_BANK_KEY);

            // If no stored bank is found, create a new default one.
            // Should only occur if the user visits the site for the very first time.
            if (!playerCharactersAsString) {
                const defaultBank = PlayerCharacterBank.getDefault();
                defaultBank.save();
                return defaultBank;
            }

            const playerCharactersAsJson = JSON.parse(playerCharactersAsString);

            return new PlayerCharacterBank(playerCharactersAsJson);
        }
        catch (error) {
            console.error("Error parsing player character bank JSON:", error);
            return new PlayerCharacterBank();
        }
    }

    /**
     * Returns a default PlayerCharacterBank instance.
     * Sets the version to the latest version number.
     * @returns {PlayerCharacterBank} A new default character instance.
     */
    static getDefault() {
        const defaultBank = new PlayerCharacterBank();

        // The bank should always have a character, else the page cannot load correctly.
        defaultBank.addNewCharacter(PlayerCharacter.getDefault());
        defaultBank.version = LATEST_PLAYER_CHARACTER_BANK_VERSION_NUMBER;

        return defaultBank;
    }

    /**
     * Saves the character bank object into localStorage to persist the data over multiple browser sessions.
     * Catches and logs any errors during saving.
     */
    save() {
        try {
            localStorage.setItem(PLAYER_CHARACTER_BANK_KEY, JSON.stringify(this));
        } catch (error) {
            console.error("Error while saving player character bank:", error);
        }
    }
    
    /**
     * Empty the player bank, remove all entries.
     * This removes data which cannot be recovered.
     */
    empty() {
        this.playerCharacterBankEntries = [];
    }

    /**
     * Adds a single playerCharacter to the bank.
     * @param {PlayerCharacter} playerCharacter 
     */
    addNewCharacter(playerCharacter) {

        // Upgrade the given PC to the latest version to support legacy imports.
        updateCharacter(playerCharacter);

        const bankEntry = new PlayerCharacterBankEntry();

        bankEntry.playerCharacter = playerCharacter;

        // If the user has no other characters, then the given character becomes the active one.
        // In the user has other characters, then the given character does not become active but instead gets added to storage.
        if (this.playerCharacterBankEntries.length === 0) {
            bankEntry.isActive = true;
        }

        bankEntry.version = LATEST_PLAYER_CHARACTER_BANK_ENTRY_VERSION_NUMBER;

        this.playerCharacterBankEntries.push(bankEntry);
    }

    /**
     * Change the current active character to the character with an entry that has the given ID.
     * @param {`${string}-${string}-${string}-${string}-${string}`} id UUID.
     */
    setActiveCharacter(id) {

        // Since we put the old active character into storage, we will set the new lastEdit date.
        const oldActiveCharacterEntry = this.getActivePlayerCharacterBankEntry();
        oldActiveCharacterEntry.lastEdit = new Date();
        oldActiveCharacterEntry.isActive = false;

        // Set the given character entry to active.
        const newActiveCharacterEntry = this.getCharacterBankEntryById(id);
        newActiveCharacterEntry.isActive = true;
    }

    /**
     * Removes a single character from the PC bank.
     * @param {`${string}-${string}-${string}-${string}-${string}`} id UUID.
     */
    removeCharacterFromBank(id) {
        this.playerCharacterBankEntries = this.playerCharacterBankEntries.filter(entry => entry.id != id);
    }

    /**
     * Get a PlayerCharacterBankEntry by ID.
     * @param {`${string}-${string}-${string}-${string}-${string}`} id UUID.
     * @returns {PlayerCharacterBankEntry}
     */
    getCharacterBankEntryById(id) {
        return this.playerCharacterBankEntries.find(entry => entry.id === id);
    }

    /**
     * Get the currently active PlayerCharacterBankEntry object.
     * @returns {PlayerCharacterBankEntry}
     */
    getActivePlayerCharacterBankEntry() {
        return this.playerCharacterBankEntries.find(entry => entry.isActive);
    }
    
    /**
     * Get all inactive PlayerCharacterBankEntry objects.
     * @returns {PlayerCharacterBankEntry[]}
     */
    getInactivePlayerCharacterBankEntries() {
        return this.playerCharacterBankEntries.filter(entry => !entry.isActive);
    }
}