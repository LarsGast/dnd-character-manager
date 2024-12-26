import {getAbbreviationOfAbility} from '../util.js';

export const fillSkillsList = function() {
    const ul = document.getElementById("skills-list");

    window.skills.forEach(skill => {
        ul.appendChild(getSkillListItem(skill));
    })
}

/**
 * Get the li element for the given skill.
 * @param {object} skill 
 * @returns {HTMLLIElement}
 */
const getSkillListItem = function(skill) {

    const li = document.createElement('li');

    li.id = skill.name;
    li.appendChild(getProficiencyCheckbox(skill));
    li.appendChild(getExpertiseCheckbox(skill));
    li.appendChild(getSkillLabel(skill));

    return li;
}

/**
 * Get the proficiency checkbox element for the given skill.
 * @param {object} skill 
 * @returns {HTMLInputElement}
 */
const getProficiencyCheckbox = function(skill) {

    const proficiencyCheckbox = document.createElement('input');

    proficiencyCheckbox.type = "checkbox";
    proficiencyCheckbox.id = `${skill.name}_p`;

    return proficiencyCheckbox;
}

/**
 * Get the expertise checkbox element for the given skill.
 * @param {object} skill 
 * @returns {HTMLInputElement}
 */
const getExpertiseCheckbox = function(skill) {

    const expertiseCheckbox = document.createElement('input');

    expertiseCheckbox.type = "checkbox";
    expertiseCheckbox.id = `${skill.name}_e`;

    return expertiseCheckbox;
}

/**
 * Get the label element for the given skill.
 * @param {object} skill 
 * @returns {HTMLInputElement}
 */
const getSkillLabel = function(skill) {

    const label = document.createElement('label');

    label.appendChild(getModifierSpan(skill));
    label.appendChild(getSkillNameSpan(skill));

    return label;
}

/**
 * Get the span element for the modifier number.
 * @param {object} skill 
 * @returns {HTMLSpanElement}
 */
const getModifierSpan = function(skill) {

    const span = document.createElement('span');
    
    span.id = `${skill.name}_m`;

    return span;
}

/**
 * Get the span element for the skill label name.
 * @param {object} skill 
 * @returns {HTMLSpanElement}
 */
const getSkillNameSpan = function(skill) {
    
    const span = document.createElement('span');
    
    span.textContent = ` ${skill.name} (${getAbbreviationOfAbility(skill.abilityName)})`;

    return span;
}