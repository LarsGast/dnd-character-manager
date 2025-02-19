import { getPlayerCharacterProperty } from "../../local-storage-util.js";
import { getAbilityScoreModifier, limitAbilityScore, saveAbilityScore, updateAbilityScoreModifier, updateAllSkillModifiers } from "../util.js";
import { updateAllArmorModifiersAsync } from "./inventory/init-armor.js";
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

    const abilityIndex = abilityScoreItem.id;

    initAbilityScoreInputField(abilityIndex);
    initAbilityScoreModifierSpan(abilityIndex);
}

/**
 * Initialize the input field of the given ability.
 * @param {string} abilityIndex 
 */
const initAbilityScoreInputField = function(abilityIndex) {

    const inputField = document.getElementById(`${abilityIndex}_i`);

    inputField.value = getPlayerCharacterProperty(abilityIndex);
    inputField.onchange = async function() {
        await changeAbilityScore(abilityIndex, this.value);
    };
}

/**
 * Change the score of the given ability.
 * @param {string} abilityIndex 
 * @param {number} abilityScore 
 */
const changeAbilityScore = async function(abilityIndex, abilityScore) {
    if (abilityScore < 1 || abilityScore > 30) {
        limitAbilityScore(abilityIndex, abilityScore);
        return;
    }
    saveAbilityScore(abilityIndex);
    updateAbilityScoreModifier(abilityIndex);
    await updateAllSkillModifiers();
    updateAllWeaponModifiers();
    await updateAllArmorModifiersAsync();
}

/**
 * Initialize the ability score modifier span.
 * @param {string} abilityIndex 
 */
const initAbilityScoreModifierSpan = function(abilityIndex) {

    const span = document.getElementById(`${abilityIndex}_m`);

    span.textContent = getAbilityScoreModifier(abilityIndex);
}