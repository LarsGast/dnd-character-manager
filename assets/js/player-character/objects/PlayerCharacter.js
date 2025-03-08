const PLAYER_CHARACTER_KEY = "playerCharacter";

/**
 * The current latest version of the PC object.
 * This should be updated whenever a breaking change is performed on the PC object blueprint.
 */
export const LATEST_PLAYER_CHARACTER_VERSION_NUMBER = 3;

/**
 * Contains all information of a character needed to build the PC-Builder page.
 */
export class PlayerCharacter {

    /**
     * Name of the character.
     * @type {string | null}
     */
    name = null;

    /**
     * All chosen classes of the character.
     * Empty array if none are chosen yet.
     * Each item matches the "index" property in the 5e API.
     * @type {string[]}
     */
    classes = [];

    /**
     * Chosen race of the character.
     * Null if none is chosen.
     * Matches the "index" property in the 5e API.
     * @type {string | null}
     */
    race = null;

    /**
     * Chosen subrace of the character.
     * Null if none is chosen.
     * Matches the "index" property in the 5e API.
     * @type {string | null}
     */
    subrace = null;

    /**
     * Chosen background of the character.
     * Null if none is chosen.
     * Matches the "index" property in the 5e API.
     * @type {string | null}
     */
    background = null;

    /**
     * Chosen alignment of the character.
     * Null if none is chosen.
     * Matches the "index" property in the 5e API.
     * @type {string | null}
     */
    alignment = null;

    /**
     * Strength score of the character.
     * Matches the "index" property in the 5e API.
     * @type {number}
     */
    str = 10;

    /**
     * Dexterity score of the character.
     * Matches the "index" property in the 5e API.
     * @type {number}
     */
    dex = 10;

    /**
     * Constitution score of the character.
     * Matches the "index" property in the 5e API.
     * @type {number}
     */
    con = 10;

    /**
     * Intelligence score of the character.
     * Matches the "index" property in the 5e API.
     * @type {number}
     */
    int = 10;

    /**
     * Wisdom score of the character.
     * Matches the "index" property in the 5e API.
     * @type {number}
     */
    wis = 10;

    /**
     * Charisma score of the character.
     * Matches the "index" property in the 5e API.
     * @type {number}
     */
    cha = 10;

    /**
     * All proficiencies of the character.
     * Each item matches the "index" property in the 5e API.
     * @type {string[]}
     */
    proficiencies = [];

    /**
     * All expertises of the character.
     * Each item matches the "index" property in the 5e API.
     * @type {string[]}
     */
    expertises = [];

    /**
     * All weapon proficiencies of the character.
     * Each item matches the "index" property in the 5e API.
     * @type {string[]}
     */
    weaponProficiencies = [];

    /**
     * All armor proficiencies of the character.
     * Each item matches the "index" property in the 5e API.
     * @type {string[]}
     */
    armorProficiencies = [];

    /**
     * All weapons in the inventory of the character.
     * Each item.index matches the "index" property in the 5e API.
     * @type {object[]}
     */
    inventoryWeapons = [];

    /**
     * All armor in the inventory of the character.
     * Each item.index matches the "index" property in the 5e API.
     * @type {object[]}
     */
    inventoryArmor = [];

    /**
     * Notes that the user has filled in.
     * @type {string}
     */
    notes = "";

    /**
     * Version number of the character.
     * Is used to upgrade the character when breaking changes have occurred.
     * @type {number | null}
     */
    version = null;

    constructor(data = {}) {
        Object.assign(this, data);
    }

    /**
     * Sets a property value.
     * Saves the PC automatically after change.
     * @param {string} propertyName Name of the property on the PlayerCharacter object.
     * @param {any} propertyValue Value that the property should take on.
     */
    setProperty(propertyName, propertyValue) {
        this[propertyName] = propertyValue;
        this.save();
    }
    
    /**
     * Saves the character to local storage.
     */
    save() {
        try {
            localStorage.setItem(PLAYER_CHARACTER_KEY, JSON.stringify(this));
        } catch (error) {
            console.error("Error while saving Player Character:", error);
        }
    }

    /**
     * Loads the character from local storage.
     * @returns {PlayerCharacter} A PlayerCharacter instance.
     */
    static load() {

        try {
            const playerCharacterAsString = localStorage.getItem(PLAYER_CHARACTER_KEY);

            // If no PC exists yet, create a new one with default values.
            // Should only occur if the user visits the site for the very first time.
            if (!playerCharacterAsString) {
                const defaultCharacter = PlayerCharacter.getDefault();
                defaultCharacter.save();
                return defaultCharacter;
            }

            const playerCharacterAsJson = JSON.parse(playerCharacterAsString);

            return new PlayerCharacter(playerCharacterAsJson);
        } 
        catch (error) {
            console.error("Error parsing player character JSON:", error);
            return new PlayerCharacter();
        }
    }

    /**
     * Returns a default PlayerCharacter.
     * @returns {PlayerCharacter} A PlayerCharacter instance with default values.
     */
    static getDefault() {
        const playerCharacter = new PlayerCharacter();

        // Set the version to the current one.
        // Update this value if a breaking change occurs.
        playerCharacter.version = LATEST_PLAYER_CHARACTER_VERSION_NUMBER;

        return playerCharacter;
    }
}

/**
 * Contains all information of a character needed to build the PC-Builder page.
 */
export const globalPlayerCharacter = PlayerCharacter.load();