import { PlayerCharacter } from "../objects/PlayerCharacter.js";

/**
 * Update a character from version 2 to version 3. Read the individual functions for more specific information.
 * This update includes:
 * - A rename of properties to be camelCase instead of kebab-case.
 * @param {PlayerCharacter} playerCharacter
 */
export const update_version_3 = function(playerCharacter) {
    updateWeaponProficiencies(playerCharacter);
    updateArmorProficiencies(playerCharacter);
    updateInventoryWeapon(playerCharacter);
    updateInventoryArmor(playerCharacter);
}

/**
 * Update the weapon proficiencies of the character.
 * Rename of property to camelCase.
 * @param {PlayerCharacter} playerCharacter
 */
const updateWeaponProficiencies = function(playerCharacter) {
    playerCharacter.weaponProficiencies = playerCharacter.weapon_proficiencies;
}

/**
 * Update the armor proficiencies of the character.
 * Rename of property to camelCase.
 * @param {PlayerCharacter} playerCharacter
 */
const updateArmorProficiencies = function(playerCharacter) {
    playerCharacter.armorProficiencies = playerCharacter.armor_proficiencies;
}

/**
 * Update the weapon inventory of the character.
 * Rename of property to camelCase.
 * @param {PlayerCharacter} playerCharacter
 */
const updateInventoryWeapon = function(playerCharacter) {
    playerCharacter.inventoryWeapons = playerCharacter.inventory_weapons;
}

/**
 * Update the armor inventory of the character.
 * Rename of property to camelCase.
 * @param {PlayerCharacter} playerCharacter
 */
const updateInventoryArmor = function(playerCharacter) {
    playerCharacter.inventoryArmor = playerCharacter.inventory_armor;
}