import { Skill } from '../objects/Skill.js';
import { getExpertiseCheckbox, getProficiencyCheckbox, getProficiencyModifierSpan} from '../util.js';

export const buildSkills = async function() {
    await fillSkillList();
}

const fillSkillList = async function() {
    const ul = document.getElementById("skills-list");

    const skills = await Skill.getAllAsync();

    for (const skill of skills.results) {
        ul.appendChild(await getSkillListItem(skill.index));
    }
}

/**
 * Get the li element for the given skill.
 * @param {string} skillIndex 
 * @returns {Promise<HTMLLIElement>}
 */
const getSkillListItem = async function(skillIndex) {

    const li = document.createElement('li');

    li.id = skillIndex;
    li.appendChild(getProficiencyCheckbox(skillIndex));
    li.appendChild(getExpertiseCheckbox(skillIndex));
    li.appendChild(await getSkillLabel(skillIndex));

    return li;
}

/**
 * Get the label element for the given skill.
 * @param {string} skillIndex 
 * @returns {Promise<HTMLInputElement>}
 */
const getSkillLabel = async function(skillIndex) {

    const label = document.createElement('label');

    label.appendChild(getProficiencyModifierSpan(skillIndex));
    label.appendChild(await getSkillNameSpan(skillIndex));

    return label;
}

/**
 * Get the span element for the skill label name.
 * @param {string} skillIndex 
 * @returns {Promise<HTMLSpanElement>}
 */
const getSkillNameSpan = async function(skillIndex) {
    const span = document.createElement('span');

    const skill = await Skill.getAsync(skillIndex);
    
    span.textContent = ` ${skill.name} (${skill.ability_score.name})`;

    return span;
}