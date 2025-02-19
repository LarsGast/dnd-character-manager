import { updateCharacter } from "./update-character.js";
import { buildPage } from "./build/build-page.js";
import { initPage } from "./init/init-page.js"
import { getPlayerCharacter, savePlayerCharacter } from "../local-storage-util.js";

/**
 * Starting point for all JavaScript code for the PC-Builder page.
 * This one function should bring the page to a functioning state.
 */
export const loadPage = async function() {

    // Update the current PC to the latest version so the data and inputs know how to interact with each other.
    updateCharacterToLatestVersion();

    // Build all elements that should appear on the page.
    await buildPage();

    // Initialize all elements that appear on the page.
    await initPage()
}

/**
 * If changes have occurred in the JSON definition of the PC, old versions need to be brought up to date.
 */
const updateCharacterToLatestVersion = function() {

    // Update the PC currently saved in localStorage.
    let playerCharacter = getPlayerCharacter();
    updateCharacter(playerCharacter);

    // Save the PC, wether it has changes or not.
    // We don't need to check for changes. Saving is cheap and the extra logic will only bring complexity.
    savePlayerCharacter(playerCharacter);
}