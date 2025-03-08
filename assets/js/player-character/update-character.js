import { LATEST_PLAYER_CHARACTER_VERSION_NUMBER, PlayerCharacter } from "./objects/PlayerCharacter.js";
import { update_version_2 } from "./update/update-version-2.js";
import { update_version_3 } from "./update/update-version-3.js";

/**
 * Update an old player character object to a new version.
 * This function should be able to convert a PC from any old version to any newer version.
 * Expand this function whenever a breaking change is performed on the PC blueprint.
 * @param {PlayerCharacter} playerCharacter
 */
export const updateCharacter = function(playerCharacter) {

    // We started counting since version 2, since before then versioning didn't exist.
    // So any PC that does not have a version is actually version 1.
    if (!playerCharacter.version) {
        playerCharacter.version = 1;
    }

    // If we don't need to update, don't update.
    if (playerCharacter.version === LATEST_PLAYER_CHARACTER_VERSION_NUMBER) {
        return;
    }

    // Version 1 -> version 2.
    if (playerCharacter.version === 1) {
        update_version_2(playerCharacter);
        playerCharacter.version = 2;
    }
    
    // Version 2 -> version 3.
    if (playerCharacter.version === 2) {
        update_version_3(playerCharacter);
        playerCharacter.version = 3;
    }

    // Clean the JSON object to remove unused properties and add missing properties.
    // After this, the PC object should have EXACTLY the properties needed for the PC-builder page.
    cleanPlayerCharacter(playerCharacter);
}

/**
 * Clean the PC so it EXACTLY has the properties needed for the PC-Builder page.
 * This is always based on the current version of the PC blueprint.
 * @param {PlayerCharacter} playerCharacter 
 */
const cleanPlayerCharacter = function(playerCharacter) {
    const defaultCharacter = PlayerCharacter.getDefault();

    // Remove unwanted keys
    for (const key in playerCharacter) {
        if (!defaultCharacter.hasOwnProperty(key)) {
            delete playerCharacter[key];
        }
    }

    // Add missing keys with default values
    // Add if key does not exist or value is undefined/ null.
    for (const key in defaultCharacter) {
        if (!playerCharacter[key]) {
            playerCharacter[key] = defaultCharacter[key];
        }
    }
}