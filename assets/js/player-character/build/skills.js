import {getAbbreviationOfAbility, getExpertiseCheckbox, getProficiencyCheckbox, getProficiencyModifierSpan} from '../util.js';

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
    li.appendChild(getProficiencyCheckbox(skill.name));
    li.appendChild(getExpertiseCheckbox(skill.name));
    li.appendChild(getSkillLabel(skill));

    return li;
}

/**
 * Get the label element for the given skill.
 * @param {object} skill 
 * @returns {HTMLInputElement}
 */
const getSkillLabel = function(skill) {

    const label = document.createElement('label');

    label.appendChild(getProficiencyModifierSpan(skill.name));
    label.appendChild(getSkillNameSpan(skill));

    return label;
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