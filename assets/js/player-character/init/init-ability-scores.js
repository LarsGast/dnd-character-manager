import { getPlayerCharacterProperty } from "../../local-storage-util.js";
import { getAbilityScoreModifier, limitAbilityScore, saveAbilityScore, updateAbilityScoreModifier, updateAllSkillModifiers } from "../util.js";
import { updateAllWeaponModifiers } from "./inventory/init-weapons.js";

/**
 * Initialize all elements for the ability scores on the PC builder page.
 */
export const initAbilityScores = function() {
    const abilityScoresList = document.getElementById('ability-scores-list'); 
    const abilityScoreItems = Array.from(abilityScoresList.children);
    abilityScoreItems.forEach(abilityScoreItem => {
        initAbilityScoreItem(abilityScoreItem);
    });
}

/**
 * Initialize a single li ability score element.
 * @param {HTMLLIElement} abilityScoreItem 
 */
const initAbilityScoreItem = function(abilityScoreItem) {

    const abilityName = abilityScoreItem.id;

    initAbilityScoreInputField(abilityName);
    initAbilityScoreModifierSpan(abilityName);
}

/**
 * Initialize the input field of the given ability.
 * @param {string} abilityName 
 */
const initAbilityScoreInputField = function(abilityName) {

    const inputField = document.getElementById(`${abilityName}_i`);

    inputField.value = getPlayerCharacterProperty(abilityName);
    inputField.onchange = function() {
        changeAbilityScore(abilityName, this.value);
    };
}

/**
 * Change the score of the given ability.
 * @param {string} abilityName 
 * @param {number} abilityScore 
 */
const changeAbilityScore = function(abilityName, abilityScore) {
    if (abilityScore < 1 || abilityScore > 30) {
        limitAbilityScore(abilityName, abilityScore);
        return;
    }
    saveAbilityScore(abilityName);
    updateAbilityScoreModifier(abilityName);
    updateAllSkillModifiers();
    updateAllWeaponModifiers();
}

/**
 * Initialize the ability score modifier span.
 * @param {string} abilityName 
 */
const initAbilityScoreModifierSpan = function(abilityName) {

    const span = document.getElementById(`${abilityName}_m`);

    span.textContent = getAbilityScoreModifier(abilityName);
}