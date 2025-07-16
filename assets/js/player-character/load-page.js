import { updateCharacter } from "./update-character.js";
import { PlayerCharacterBank } from "./objects/PlayerCharacterBank.js";
import { PlayerCharacter } from "./objects/PlayerCharacter.js";
import { getCache, saveCache } from "./cache.js";
import { baseUrl } from "./api.js";

/**
 * A set of global variables to be used all across the codebase.
 */
export const globals = {

    /**
     * Global singleton of the player character bank.
     * This includes all PCs, both active and inactive.
     * @type {PlayerCharacterBank}
     */
    playerCharacterBank: PlayerCharacterBank.load(),

    /**
     * The current active PC.
     * Part of the player bank, this variable can have it's properties changed by reference and will be saved if the bank is saved.
     * @type {PlayerCharacter}
     */
    get activePlayerCharacter() {
        return this.playerCharacterBank.getActivePlayerCharacterBankEntry().playerCharacter;
    }
}

/**
 * Starting point for all JavaScript code for the PC-Builder page.
 * This one function should bring the page to a functioning state.
 */
export const loadPage = function() {

    // Make sure the user has a player bank and no legacy singleton PC object.
    removeLegacyPlayerCharacterFromLocalStorage();

    // Update the current PC to the latest version so the data and inputs know how to interact with each other.
    updatePlayerBank();

    // Clean the cache.
    cleanCache();
}

/**
 * We used to save a single PlayerCharacter object in localStorage.
 * Since we now have the PlayerCharacterBank, we no longer use the PLAYER_CHARACTER_KEY in localStorage.
 * This function removes the current PC in localStorage (if it exists), and adds the current PC to the player bank so no data will be lost.
 * This function is necessary to support legacy users who have not visited the page since the player bank got introduced. 
 */
const removeLegacyPlayerCharacterFromLocalStorage = function() {

    // Legacy key we used to use to store PC info in localStorage.
    const PLAYER_CHARACTER_KEY = "playerCharacter";

    const savedPlayerCharacter = localStorage.getItem(PLAYER_CHARACTER_KEY);

    // This statement should be true if the user:
    // - Visited the site before the player bank got introduced and created a character AND
    // - Visits the site for the first time after the player bank was introduced
    // The code below will not run for users who have already visited the site and have put their character in the player bank.
    if (savedPlayerCharacter) {

        const playerCharacterAsJson = JSON.parse(savedPlayerCharacter);
        const playerCharacter = new PlayerCharacter(playerCharacterAsJson);

        // We know that the user only has the default character in the bank at this point.
        // Replace the default character with their own character.
        globals.playerCharacterBank.empty();
        globals.playerCharacterBank.addNewCharacter(playerCharacter);
        globals.playerCharacterBank.save();

        // Remove the old localStorage item.
        // This data is not recoverable.
        localStorage.removeItem(PLAYER_CHARACTER_KEY);
    }
}

/**
 * If changes have occurred in the JSON definition of the PC or the PC bank, old versions need to be brought up to date.
 */
const updatePlayerBank = function() {

    // Update all PCs currently saved in localStorage.
    for (const characterBankEntry of globals.playerCharacterBank.playerCharacterBankEntries) {
        updateCharacter(characterBankEntry.playerCharacter);
    }

    // Save the PCs, wether they have changes or not.
    // We don't need to check for changes. Saving is cheap and the extra logic will only bring complexity.
    globals.playerCharacterBank.save();
}

/**
 * Clean the cache, remove unwanted entries.
 */
const cleanCache = function() {
    const cache = getCache();

    for (const key in cache) {
        
        // Remove all entries that are not from the SRD API.
        if (!key.includes(baseUrl)) {
            delete cache[key];
        }
    }

    saveCache(cache);
}