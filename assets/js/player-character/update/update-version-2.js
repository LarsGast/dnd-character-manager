/**
 * Update a character from version 1 to version 2. Read the individual functions for more specific information.
 * This update includes:
 * - A revision of the API data stored
 *   - Indexes as specified in the 5e API are now stored instead of names
 *   - The change: rename all "name" properties to "index" and kebab-case-ify the values
 * - Abilityscores are now saved as the lower case 3-letter abbreviation instead of the full word
 * @param {JSON} playerCharacter Full JSON character to perform the update on
 */
export const update_version_2 = function(playerCharacter) {
    updateClasses(playerCharacter);
    updateRace(playerCharacter);
    updateBackground(playerCharacter);
    updateAlignment(playerCharacter);
    updateAbilityScores(playerCharacter);
    updateProficiencies(playerCharacter);
    updateExpertises(playerCharacter);
    updateWeaponProficiencies(playerCharacter);
    updateArmorProficiencies(playerCharacter);
    updateWeaponInventory(playerCharacter);
}

/**
 * Update the classes of the character.
 * Property `name` -> `index`.
 * Value index is now kebab-case.
 * @param {JSON} playerCharacter Full JSON character to perform the update on
 */
const updateClasses = function(playerCharacter) {
    playerCharacter.classes = playerCharacter.classes?.map(classObject => {
        return updateClass(classObject);
    });
}

/**
 * Helper function to update a single class.
 * @param {JSON} oldClass Old version of the class.
 * @returns {JSON} New version of the class.
 */
const updateClass = function(oldClass) {
    return {
        index: toKebabCase(oldClass.name),
        level: oldClass.level
    }
}

/**
 * Update the race of the character.
 * Value is now kebab-case.
 * @param {JSON} playerCharacter Full JSON character to perform the update on
 */
const updateRace = function(playerCharacter) {
    playerCharacter.race = toKebabCase(playerCharacter.race);
}

/**
 * Update the background of the character.
 * Value is now kebab-case.
 * @param {JSON} playerCharacter Full JSON character to perform the update on
 */
const updateBackground = function(playerCharacter) {
    playerCharacter.background = toKebabCase(playerCharacter.background);
}

/**
 * Update the alignment of the character.
 * Value is now kebab-case.
 * @param {JSON} playerCharacter Full JSON character to perform the update on
 */
const updateAlignment = function(playerCharacter) {
    playerCharacter.alignment = toKebabCase(playerCharacter.alignment);
}

/**
 * Update the ability scores of the character.
 * Property names are shortened to their 3-letter abbreviation.
 * @param {JSON} playerCharacter Full JSON character to perform the update on
 */
const updateAbilityScores = function(playerCharacter) {
    playerCharacter.str = playerCharacter.strength;
    playerCharacter.dex = playerCharacter.dexterity;
    playerCharacter.con = playerCharacter.constitution;
    playerCharacter.int = playerCharacter.intelligence;
    playerCharacter.wis = playerCharacter.wisdom;
    playerCharacter.cha = playerCharacter.charisma;

    delete playerCharacter.strength;
    delete playerCharacter.dexterity;
    delete playerCharacter.constitution;
    delete playerCharacter.intelligence;
    delete playerCharacter.wisdom;
    delete playerCharacter.charisma;
}

/**
 * Update the skill proficiencies of the character.
 * Values are now kebab-case.
 * @param {JSON} playerCharacter Full JSON character to perform the update on
 */
const updateProficiencies = function(playerCharacter) {
    playerCharacter.proficiencies = playerCharacter.proficiencies?.map(proficiency => {
        return toKebabCase(proficiency);
    });
}

/**
 * Update the skill expertises of the character.
 * Values are now kebab-case.
 * @param {JSON} playerCharacter Full JSON character to perform the update on
 */
const updateExpertises = function(playerCharacter) {
    playerCharacter.expertises = playerCharacter.expertises?.map(expertise => {
        return toKebabCase(expertise);
    });
}

/**
 * Update the weapon proficiencies of the character.
 * Values are now kebab-case.
 * @param {JSON} playerCharacter Full JSON character to perform the update on
 */
const updateWeaponProficiencies = function(playerCharacter) {
    playerCharacter.weapon_proficiencies = playerCharacter.weapon_proficiencies?.map(proficiency => {
        return toKebabCase(proficiency);
    });
}

/**
 * Update the armor proficiencies of the character.
 * Values are now kebab-case.
 * @param {JSON} playerCharacter Full JSON character to perform the update on
 */
const updateArmorProficiencies = function(playerCharacter) {
    playerCharacter.armor_proficiencies = playerCharacter.armor_proficiencies?.map(proficiency => {
        return toKebabCase(proficiency);
    });
}

/**
 * Update the weapon inventory of the character.
 * Ability values are shortened to their 3-letter abbreviation.
 * @param {JSON} playerCharacter Full JSON character to perform the update on
 */
const updateWeaponInventory = function(playerCharacter) {
    playerCharacter.inventory_weapons = playerCharacter.inventory_weapons?.map(proficiency => {
        return updateWeapon(proficiency);
    });
}

/**
 * Helper function to update a single weapon
 * @param {JSON} oldWeapon Old version of the weapon
 * @returns {JSON} New version of the weapon.
 */
const updateWeapon = function(oldWeapon) {
    return {
        index: oldWeapon.index,
        ability: getShortAbility(oldWeapon.ability)
    }
}

/**
 * Helper function to shorten ability names.
 * Only str and dex, for updating weapons.
 * @param {string} longAbility Long version of the ability.
 * @returns {string} Short version of the ability.
 */
const getShortAbility = function(longAbility) {
    if (longAbility === "strength"){
        return "str";
    }

    return "dex";
}

/**
 * Helper function to convers a string to kebab-case.
 * @param {string} str Non kebab-case string.
 * @returns {string} Kebab-case string.
 */
const toKebabCase = function(str) {

    // To handle PC's that aren't complete yet.
    if (!str) {
        return null;
    }

    return str
        // Remove comma's
        .replace(/,/g, '')
        // Replace spaces with dashes
        .replace(/[\s]+/g, '-')
        .toLowerCase();
}