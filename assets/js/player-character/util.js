import { getPlayerCharacterProperty, setPlayerCharacterProperty } from '../local-storage-util.js';
import { ApiCategory, getApiResultsAsync } from './api.js';

/**
 * Update the classes of the PC in local storage.
 */
export const updateClasses = function() {
    const classes = getClasses();
    setPlayerCharacterProperty('classes', classes);
}

/**
 * Get all selected class objects for the PC.
 * @returns {{class: string, level: number}[]}
 */
const getClasses = function() {
    const classAndLevelList = document.getElementById('class-and-level-list');
    const classAndLevelListItems = Array.from(classAndLevelList.children);

    let classes = [];
    classAndLevelListItems.forEach(li => {
        const select = li.getElementsByTagName('select')[0];
        const input = li.getElementsByTagName('input')[0];

        const classObject = {
            index: select.value,
            level: input.value
        };

        classes.push(classObject);
    })

    return classes;
}

/**
 * Ensure that each class level is within 1 and 20.
 */
export const limitClassLevel = function() {
    const classLevelList = document.getElementById('class-and-level-list');
    const listItems = Array.from(classLevelList.children);

    listItems.forEach(listItem => {
        const inputField = listItem.getElementsByTagName('input')[0];

        if (inputField.value > 20){
            inputField.value = 20;
            inputField.onchange();
        }
        else if (inputField.value < 1) {
            inputField.value = 1;
            inputField.onchange();
        }
    })
}

/**
 * Get an empty option for select elements.
 * @returns {HTMLOptionElement}
 */
export const getEmptyOption = function() {

    const emptyOption = document.createElement('option');

    emptyOption.value = null;
    emptyOption.disabled = true;
    emptyOption.selected = true;
    emptyOption.textContent = "-- Select an option --";

    return emptyOption;
}

/**
 * Get an option for a select element.
 * @param {string} optionText Text that the user sees.
 * @param {string} optionValue Hidden value/ identifier of the option.
 * @returns {HTMLOptionElement} 
 */
export const getSelectOption = function(optionText, optionValue) {
    const option = document.createElement('option');

    option.textContent = optionText;
    option.value = optionValue ?? optionText;

    return option;
}

/**
 * Ensure that each ability score is within 1 and 30.
 * @param {string} abilityIndex 
 * @param {number} abilityScore 
 */
export const limitAbilityScore = function(abilityIndex, abilityScore) {
    const inputField = document.getElementById(`${abilityIndex}_i`);

    if (abilityScore > 30){
        inputField.value = 30;
    }
    else {
        inputField.value = 1;
    }
    
    inputField.onchange();
}

/**
 * Save the given score to the given ability.
 * @param {string} abilityIndex 
 */
export const saveAbilityScore = function(abilityIndex) {
    const abilityScore = document.getElementById(`${abilityIndex}_i`);

    setPlayerCharacterProperty(abilityIndex, abilityScore.value);
}

/**
 * Update the ability score modifier for the given ability.
 * @param {string} abilityIndex 
 */
export const updateAbilityScoreModifier = function(abilityIndex) {
    const span = document.getElementById(`${abilityIndex}_m`);

    span.textContent = getAbilityScoreModifier(abilityIndex);
}

/**
 * Update all skill modifiers at once.
 */
export const updateAllSkillModifiers = async function() {
    const skills = await getApiResultsAsync(ApiCategory.Skills);

    for (const skillInfo of skills.results) {
        const skill = await getApiResultsAsync(ApiCategory.Skills, skillInfo.index);
        updateSkillModifier(skill);
    }
}

/**
 * Get the ability score modifier from an ability score.
 * @param {string} abilityIndex
 * @returns {number}
 */
export const getAbilityScoreModifier = function(abilityIndex) {

    const abilityScore = getPlayerCharacterProperty(abilityIndex);

    return Math.floor((abilityScore - 10) / 2);
}

/**
 * Get the proficiency modifier of a player character based on the levels of that character.
 * @returns {number}
 */
export const getProficiencyModifier = function() {

    const classes = getPlayerCharacterProperty("classes");

    if (classes.length === 0) {
        return 0;
    }

    const totalLevel = classes.map(classObject => classObject.level).reduce((partialSum, level) => partialSum + Number(level), 0);
    return Math.ceil(totalLevel / 4) + 1;
}

/**
 * Check if the PC is proficient in the given skill.
 * @param {string} skillIndex 
 * @returns {boolean}
 */
export const isProficientInSkill = function(skillIndex) {
    const proficiencies = getPlayerCharacterProperty("proficiencies");
    return proficiencies.includes(skillIndex);
}

/**
 * Check if the PC has expertise in the given skill.
 * @param {string} skillIndex 
 * @returns {boolean}
 */
export const isExpertInSkill = function(skillIndex) {
    const expertises = getPlayerCharacterProperty("expertises");
    return expertises.includes(skillIndex);
}

/**
 * Check if the PC is proficient in the given weapon.
 * @param {string} weaponName 
 * @returns {boolean}
 */
export const isProficientInWeapon = function(weaponName) {
    const proficiencies = getPlayerCharacterProperty("weapon_proficiencies");
    return proficiencies.includes(weaponName);
}

/**
 * Check if the PC is proficient in the given armor.
 * @param {string} armorName 
 * @returns {boolean}
 */
export const isProficientInArmor = function(armorName) {
    const proficiencies = getPlayerCharacterProperty("armor_proficiencies");
    return proficiencies.includes(armorName);
}

/**
 * Get the modifier of the given skill for the PC in local storage.
 * @param {JSON} skill 
 * @returns {number}
 */
export const getSkillModifier = function(skill) {

    const scoreModifier = getAbilityScoreModifier(skill.ability_score.index);
    const proficiencyModifier = getProficiencyModifier();

    let skillModifier = scoreModifier;
    if (isProficientInSkill(skill.index)){
        skillModifier += proficiencyModifier;
    }
    
    if (isExpertInSkill(skill.index)){
        skillModifier += proficiencyModifier;
    }

    return skillModifier;
}

/**
 * Save the skill proficiency to local storage.
 * @param {string} skillIndex Name of the skill.
 * @param {boolean} add Wether the proficiency is added or removed.
 */
export const saveNewSkillProficiencies = function(skillIndex, add) {
    const proficiencies = getPlayerCharacterProperty("proficiencies");

    if (add === true) {
        if (!proficiencies.includes(skillIndex)) {
            proficiencies.push(skillIndex);
        }
    }
    else {
        const skillArrayIndex = proficiencies.indexOf(skillIndex);
        if (skillArrayIndex !== -1) {
            proficiencies.splice(skillArrayIndex, 1);
        }
    }

    setPlayerCharacterProperty("proficiencies", proficiencies);
}

/**
 * Save the skill expertise to local storage.
 * @param {string} skillIndex Name of the skill.
 * @param {boolean} add Wether the expertise is added or removed.
 */
export const saveNewSkillExpertises = function(skillIndex, add) {
    const expertise = getPlayerCharacterProperty("expertises");

    if (add === true) {
        if (!expertise.includes(skillIndex)) {
            expertise.push(skillIndex);
        }
    }
    else {
        const skillArrayIndex = expertise.indexOf(skillIndex);
        if (skillArrayIndex !== -1) {
            expertise.splice(skillArrayIndex, 1);
        }
    }

    setPlayerCharacterProperty("expertises", expertise);
}

/**
 * Enable or disable the expertise checkbox for the given skill based on proficiency.
 * @param {string} skillIndex Name of the skill.
 */
export const enableOrDisableExpertiseCheckbox = function(skillIndex) {
    const expertiseCheckbox = document.getElementById(`${skillIndex}_e`);

    if (isProficientInSkill(skillIndex)) {
        expertiseCheckbox.disabled = false;
    }
    else {
        expertiseCheckbox.disabled = true;
    }
}

/**
 * Enable or disable the proficiency checkbox for the given skill based on expertise.
 * @param {string} skillIndex Name of the skill.
 */
export const enableOrDisableProficiencyCheckbox = function(skillIndex) {
    const proficiencyCheckbox = document.getElementById(`${skillIndex}_p`);

    if (isExpertInSkill(skillIndex)) {
        proficiencyCheckbox.disabled = true;
    }
    else {
        proficiencyCheckbox.disabled = false;
    }
}

/**
 * Update the modifier for the given skill.
 * @param {object} skill 
 */
export const updateSkillModifier = function(skill) {
    const span = document.getElementById(`${skill.index}_m`);

    span.textContent = getSkillModifier(skill);
}

/**
 * Save the weapon proficiency to local storage.
 * @param {string} weaponName Name of the weapon.
 * @param {boolean} add Wether the proficiency is added or removed.
 */
export const saveNewWeaponProficiencies = function(weaponName, add) {
    const weaponProficiencies = getPlayerCharacterProperty("weapon_proficiencies");

    if (add === true) {
        if (!weaponProficiencies.includes(weaponName)) {
            weaponProficiencies.push(weaponName);
        }
    }
    else {
        const skillIndex = weaponProficiencies.indexOf(weaponName);
        if (skillIndex !== -1) {
            weaponProficiencies.splice(skillIndex, 1);
        }
    }

    setPlayerCharacterProperty("weapon_proficiencies", weaponProficiencies);
}

/**
 * Save the armor proficiency to local storage.
 * @param {string} armorName Name of the armor.
 * @param {boolean} add Wether the proficiency is added or removed.
 */
export const saveNewArmorProficiencies = function(armorName, add) {
    const armorProficiencies = getPlayerCharacterProperty("armor_proficiencies");

    if (add === true) {
        if (!armorProficiencies.includes(armorName)) {
            armorProficiencies.push(armorName);
        }
    }
    else {
        const skillIndex = armorProficiencies.indexOf(armorName);
        if (skillIndex !== -1) {
            armorProficiencies.splice(skillIndex, 1);
        }
    }

    setPlayerCharacterProperty("armor_proficiencies", armorProficiencies);
}

/**
 * Get the proficiency checkbox element for the given skill or equipment.
 * @param {string} proficiencyIndex 
 * @returns {HTMLInputElement}
 */
export const getProficiencyCheckbox = function(proficiencyIndex) {

    const proficiencyCheckbox = document.createElement('input');

    proficiencyCheckbox.type = "checkbox";
    proficiencyCheckbox.id = `${proficiencyIndex}_p`;

    return proficiencyCheckbox;
}

/**
 * Get the expertise checkbox element for the given skill or equipment.
 * @param {string} expertiseIndex 
 * @returns {HTMLInputElement}
 */
export const getExpertiseCheckbox = function(expertiseIndex) {

    const expertiseCheckbox = document.createElement('input');

    expertiseCheckbox.type = "checkbox";
    expertiseCheckbox.id = `${expertiseIndex}_e`;

    return expertiseCheckbox;
}

/**
 * Get the span element for the proficiency modifier number for the given skill or equipment.
 * @param {string} proficiencyIndex 
 * @returns {HTMLSpanElement}
 */
export const getProficiencyModifierSpan = function(proficiencyIndex) {

    const span = document.createElement('span');
    
    span.id = `${proficiencyIndex}_m`;

    return span;
}