import { Skill } from "../objects/api/resources/Skill.js";

/**
 * Key used for saving and loading the player character from localStorage.
 * @constant {string}
 */
const PLAYER_CHARACTER_KEY = "playerCharacter";

/**
 * The current latest version of the PC object.
 * This should be updated whenever a breaking change is performed on the PC object blueprint.
 * @constant {number}
 */
export const LATEST_PLAYER_CHARACTER_VERSION_NUMBER = 4;

/**
 * Contains all information of a character needed to build the PC-Builder page.
 * This class also handles saving, loading, and updating the character data in localStorage.
 */
export class PlayerCharacter {

    /**
     * Name of the character.
     * @type {string|null}
     */
    name = null;

    /**
     * All chosen classes of the character.
     * Empty array if none are chosen yet.
     * Each item should match the "index" property in the 5e API.
     * @type {object[]}
     */
    classes = [];

    /**
     * Chosen race of the character.
     * Null if none is chosen.
     * Should match the "index" property in the 5e API.
     * @type {string|null}
     */
    race = null;

    /**
     * Chosen subrace of the character.
     * Null if none is chosen.
     * Should match the "index" property in the 5e API.
     * @type {string|null}
     */
    subrace = null;

    /**
     * Chosen background of the character.
     * Null if none is chosen.
     * Should match the "index" property in the 5e API.
     * @type {string|null}
     */
    background = null;

    /**
     * Chosen alignment of the character.
     * Null if none is chosen.
     * Should match the "index" property in the 5e API.
     * @type {string|null}
     */
    alignment = null;

    /**
     * Strength score of the character.
     * Default value is 10.
     * @type {number}
     */
    str = 10;

    /**
     * Dexterity score of the character.
     * Default value is 10.
     * @type {number}
     */
    dex = 10;

    /**
     * Constitution score of the character.
     * Default value is 10.
     * @type {number}
     */
    con = 10;

    /**
     * Intelligence score of the character.
     * Default value is 10.
     * @type {number}
     */
    int = 10;

    /**
     * Wisdom score of the character.
     * Default value is 10.
     * @type {number}
     */
    wis = 10;

    /**
     * Charisma score of the character.
     * Default value is 10.
     * @type {number}
     */
    cha = 10;

    /**
     * All proficiencies of the character.
     * Each item should match the "index" property in the 5e API.
     * @type {string[]}
     */
    proficiencies = [];

    /**
     * All expertises of the character.
     * Each item should match the "index" property in the 5e API.
     * @type {string[]}
     */
    expertises = [];

    /**
     * All weapon proficiencies of the character.
     * Each item should match the "index" property in the 5e API.
     * @type {string[]}
     */
    weaponProficiencies = [];

    /**
     * All armor proficiencies of the character.
     * Each item should match the "index" property in the 5e API.
     * @type {string[]}
     */
    armorProficiencies = [];

    /**
     * All weapons in the inventory of the character.
     * Each object should have an "index" property that matches the 5e API.
     * @type {object[]}
     */
    inventoryWeapons = [];

    /**
     * All armor in the inventory of the character.
     * Each object should have an "index" property that matches the 5e API.
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
     * Used to upgrade the character when breaking changes in the data occur.
     * @type {number|null}
     */
    version = null;

    /**
     * Constructs a new PlayerCharacter instance.
     * If data is provided, properties are assigned from it.
     * @param {JSON} data Optional initial data for the character.
     */
    constructor(data = {}) {
        Object.assign(this, data);
    }

    /**
     * Sets a property value on the character and immediately saves the character.
     * @param {string} propertyName The name of the property to update.
     * @param {any} propertyValue The new value for the property.
     */
    setProperty(propertyName, propertyValue) {
        this[propertyName] = propertyValue;
        this.save();
    }
    
    /**
     * Saves the character object into localStorage.
     * Catches and logs any errors during saving.
     */
    save() {
        try {
            localStorage.setItem(PLAYER_CHARACTER_KEY, JSON.stringify(this));
        } catch (error) {
            console.error("Error while saving Player Character:", error);
        }
    }

    /**
     * Loads the character from localStorage.
     * If no saved character exists, returns a default character.
     * @returns {PlayerCharacter} The loaded or default character instance.
     */
    static load() {
        try {
            const playerCharacterAsString = localStorage.getItem(PLAYER_CHARACTER_KEY);

            // If no stored PC is found, create a new default one.
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
     * Returns a default PlayerCharacter instance.
     * Sets the version to the latest version number.
     * @returns {PlayerCharacter} A new default character instance.
     */
    static getDefault() {
        const playerCharacter = new PlayerCharacter();

        playerCharacter.version = LATEST_PLAYER_CHARACTER_VERSION_NUMBER;

        return playerCharacter;
    }

    /**
     * Resets the character by saving a default character to localStorage.
     */
    reset() {
        PlayerCharacter.getDefault().save();
    }

    /**
     * Calculates and returns the proficiency bonus based on the total character level.
     * @returns {number} The proficiency bonus.
     */
    getProficiencyBonus() {
        const totalLevel = this.classes.reduce((sum, cls) => sum + (cls.level || 0), 0);
        return Math.ceil(totalLevel / 4) + 1;
    }

    /**
     * Computes and returns the ability modifier for a given ability.
     * @param {string} ability The ability (e.g., "str", "dex") to compute the modifier for.
     * @returns {number} The computed ability modifier.
     */
    getAbilityModifier(ability) {
        const abilityScore = this[ability];
        return Math.floor((abilityScore - 10) / 2);
    }

    /**
     * Computes and returns the modifier for a given skill.
     * Includes ability modifier, proficiency bonus (if proficient), and additional bonus for expertise.
     * @param {Skill} skill The skill object containing its ability_score and index.
     * @returns {number} The computed skill modifier.
     */
    getSkillModifier(skill) {
        let skillModifier = this.getAbilityModifier(skill.ability_score.index);

        if (this.isProficientInSkill(skill.index)) {
            skillModifier += this.getProficiencyBonus();
        }

        if (this.isExpertInSkill(skill.index)) {
            skillModifier += this.getProficiencyBonus();
        }

        return skillModifier;
    }

    /**
     * Checks if the character is proficient in a given skill.
     * @param {string} skillIndex The index of the skill.
     * @returns {boolean} True if proficient, false otherwise.
     */
    isProficientInSkill(skillIndex) {
        return this.proficiencies.includes(skillIndex);
    }

    /**
     * Checks if the character is an expert in a given skill.
     * @param {string} skillIndex The index of the skill.
     * @returns {boolean} True if expert, false otherwise.
     */
    isExpertInSkill(skillIndex) {
        return this.expertises.includes(skillIndex);
    }

    /**
     * Adds proficiency in a skill if not already proficient.
     * @param {string} skillIndex The index of the skill.
     */
    addProficiencyInSkill(skillIndex) {
        if (this.isProficientInSkill(skillIndex)) {
            return;
        }

        const proficiencies = this.proficiencies;
        proficiencies.push(skillIndex);

        this.setProperty("proficiencies", proficiencies);
    }

    /**
     * Removes proficiency in a skill if the character is proficient.
     * @param {string} skillIndex The index of the skill.
     */
    removeProficiencyInSkill(skillIndex) {
        if (!this.isProficientInSkill(skillIndex)) {
            return;
        }

        let proficiencies = this.proficiencies.filter(skill => skill !== skillIndex);

        this.setProperty("proficiencies", proficiencies);
    }

    /**
     * Adds expertise in a skill if PC is does not already have expertise in the skill.
     * @param {string} skillIndex The index of the skill.
     */
    addExpertiseInSkill(skillIndex) {
        if (this.isExpertInSkill(skillIndex)) {
            return;
        }

        const expertises = this.expertises;
        expertises.push(skillIndex);

        this.setProperty("expertises", expertises);
    }

    /**
     * Removes expertise in a skill if the PC has expertise in the skill.
     * @param {string} skillIndex The index of the skill.
     */
    removeExpertiseInSkill(skillIndex) {
        if (!this.isExpertInSkill(skillIndex)) {
            return;
        }

        let expertises = this.expertises.filter(skill => skill !== skillIndex);

        this.setProperty("expertises", expertises);
    }

    /**
     * Checks if the character is proficient in a weapon.
     * @param {string} weaponIndex The index of the weapon.
     * @returns {boolean} True if proficient, false otherwise.
     */
    isProficientInWeapon(weaponIndex) {
        return this.weaponProficiencies.includes(weaponIndex);
    }

    /**
     * Adds proficiency in a weapon if not already proficient.
     * @param {string} weaponIndex The index of the weapon.
     */
    addProficiencyInWeapon(weaponIndex) {
        if (this.isProficientInWeapon(weaponIndex)) {
            return;
        }

        const weaponProficiencies = this.weaponProficiencies;
        weaponProficiencies.push(weaponIndex);

        this.setProperty("weaponProficiencies", weaponProficiencies);
    }

    /**
     * Removes proficiency in a weapon if the character is proficient.
     * @param {string} weaponIndex The index of the weapon.
     */
    removeProficiencyInWeapon(weaponIndex) {
        if (!this.isProficientInWeapon(weaponIndex)) {
            return;
        }

        let weaponProficiencies = this.weaponProficiencies.filter(weapon => weapon !== weaponIndex);

        this.setProperty("weaponProficiencies", weaponProficiencies);
    }

    /**
     * Checks if the character is proficient in a type of armor.
     * @param {string} armorIndex The index of the armor.
     * @returns {boolean} True if proficient, false otherwise.
     */
    isProficientInArmor(armorIndex) {
        return this.armorProficiencies.includes(armorIndex);
    }

    /**
     * Adds proficiency in armor if not already proficient.
     * @param {string} armorIndex The index of the armor.
     */
    addProficiencyInArmor(armorIndex) {
        if (this.isProficientInArmor(armorIndex)) {
            return;
        }

        const armorProficiencies = this.armorProficiencies;
        armorProficiencies.push(armorIndex);

        this.setProperty("armorProficiencies", armorProficiencies);
    }

    /**
     * Removes proficiency in armor if the character is proficient.
     * @param {string} armorIndex The index of the armor.
     */
    removeProficiencyInArmor(armorIndex) {
        if (!this.isProficientInArmor(armorIndex)) {
            return;
        }

        let armorProficiencies = this.armorProficiencies.filter(armor => armor !== armorIndex);

        this.setProperty("armorProficiencies", armorProficiencies);
    }

    /**
     * Updates the ability used for a weapon in the inventory.
     * @param {number} index The index of the weapon in the inventory.
     * @param {string} ability The new ability (e.g., "str" or "dex").
     */
    editWeaponAbility(index, ability) {
        if (index > this.inventoryWeapons.length) {
            return;
        }

        const inventoryWeapons = this.inventoryWeapons;
        inventoryWeapons[index].ability = ability;

        this.setProperty("inventoryWeapons", inventoryWeapons);
    }

    /**
     * Computes and returns the attack bonus for a weapon.
     * Includes the ability modifier and proficiency bonus (if proficient).
     * @param {string} weaponIndex The index of the weapon.
     * @param {string} ability The ability used (e.g., "str" or "dex").
     * @returns {number} The computed attack bonus.
     */
    getWeaponAttackBonus(weaponIndex, ability) {
        let attackBonus = this.getAbilityModifier(ability);

        if (this.isProficientInWeapon(weaponIndex)) {
            attackBonus += this.getProficiencyBonus();
        }

        return attackBonus;
    }

    /**
     * Adds a weapon to the character's inventory.
     * @param {string} weaponIndex The index of the weapon.
     * @param {string} ability The ability used for the weapon.
     */
    addWeaponToInventory(weaponIndex, ability) {
        const inventoryWeapons = this.inventoryWeapons;
        inventoryWeapons.push({ index: weaponIndex, ability: ability });

        this.setProperty("inventoryWeapons", inventoryWeapons);
    }

    /**
     * Removes a weapon from the inventory at the specified position.
     * @param {number} index The position in the inventory to remove.
     */
    removeWeaponFromInventory(index) {
        const inventoryWeapons = this.inventoryWeapons;
        inventoryWeapons.splice(index, 1);

        this.setProperty("inventoryWeapons", inventoryWeapons);
    }

    /**
     * Adds an armor item to the character's inventory.
     * @param {string} armorIndex The index of the armor.
     */
    addArmorToInventory(armorIndex) {
        const inventoryArmor = this.inventoryArmor;
        inventoryArmor.push({ index: armorIndex });

        this.setProperty("inventoryArmor", inventoryArmor);
    }

    /**
     * Removes an armor item from the inventory at the specified position.
     * @param {number} index The position in the inventory to remove.
     */
    removeArmorFromInventory(index) {
        const inventoryArmor = this.inventoryArmor;
        inventoryArmor.splice(index, 1);

        this.setProperty("inventoryArmor", inventoryArmor);
    }
}

/**
 * Global singleton instance containing all PC information.
 * Loaded from localStorage; if no saved data exists, defaults are provided.
 * @type {PlayerCharacter}
 */
export const globalPlayerCharacter = PlayerCharacter.load();