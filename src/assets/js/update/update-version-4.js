import { PlayerCharacter } from "../objects/PlayerCharacter.js";

/**
 * Update a character from version 3 to version 4. Read the individual functions for more specific information.
 * This update includes:
 * - saving numbers as integer instead of string.
 * @param {PlayerCharacter} playerCharacter
 */
export const update_version_4 = function(playerCharacter) {
    updateStats(playerCharacter);
    updateClassLevels(playerCharacter);
}

/**
 * Update the stats of the character.
 * Parse the string values to int values.
 * @param {PlayerCharacter} playerCharacter
 */
const updateStats = function(playerCharacter) {
    playerCharacter.str = parseInt(playerCharacter.str);
    playerCharacter.dex = parseInt(playerCharacter.dex);
    playerCharacter.con = parseInt(playerCharacter.con);
    playerCharacter.int = parseInt(playerCharacter.int);
    playerCharacter.wis = parseInt(playerCharacter.wis);
    playerCharacter.cha = parseInt(playerCharacter.cha);
}

/**
 * Update the levels of the character.
 * Parse the string values to int values.
 * @param {PlayerCharacter} playerCharacter
 */
const updateClassLevels = function(playerCharacter) {
    for (let [index, val] of playerCharacter.classes.entries()) {
        playerCharacter.classes[index].level = parseInt(val.level);
    }
}