import { isProficientInSkill, isExpertInSkill, getSkillModifier, enableOrDisableProficiencyCheckbox, updateSkillModifier, enableOrDisableExpertiseCheckbox, saveNewProficiencies, saveNewExpertises } from "../util.js";

/**
 * Initialize all elements for the skills on the PC builder page.
 */
export const initSkills = function() {
    const skillsList = document.getElementById('skills-list');
    const skillsListItems = Array.from(skillsList.children);
    skillsListItems.forEach(skillListItem => {
        initSkillListItem(skillListItem);
    });
}

/**
 * Initialize a single li skill element.
 * @param {HTMLLIElement} skillListItem 
 */
const initSkillListItem = function(skillListItem) {

    const skill = window.skills.filter(skill => skill.name === skillListItem.id)[0];

    initProficiencyCheckbox(skill);
    initExpertiseCheckbox(skill);
    initSkillModifierSpan(skill);
}

/**
 * Initialize the proficiency checkbox of a skill item.
 * @param {object} skill 
 */
const initProficiencyCheckbox = function(skill) {

    const proficiencyCheckbox = document.getElementById(`${skill.name}_p`);

    proficiencyCheckbox.checked = isProficientInSkill(skill.name);
    proficiencyCheckbox.disabled = isExpertInSkill(skill.name);
    proficiencyCheckbox.onchange = function () {
        changeProficiency(skill, this.checked);
    };
}

/**
 * Add or remove a proficiency in a skill.
 * @param {object} skill
 * @param {boolean} add Wether the proficiency is added or removed.
 */
const changeProficiency = function(skill, add) {
    saveNewProficiencies(skill.name, add);
    enableOrDisableExpertiseCheckbox(skill.name);
    updateSkillModifier(skill);
}

/**
 * Initialize the expertise checkbox of a skill item.
 * @param {object} skill 
 */
const initExpertiseCheckbox = function(skill) {

    const expertiseCheckbox = document.getElementById(`${skill.name}_e`);
    
    expertiseCheckbox.checked = isExpertInSkill(skill.name);
    expertiseCheckbox.disabled = !isProficientInSkill(skill.name);
    expertiseCheckbox.onchange = function () {
        changeExpertise(skill, this.checked);
    };
}

/**
 * Add or remove a expertise in a skill.
 * @param {object} skill
 * @param {boolean} add Wether the expertise is added or removed.
 */
const changeExpertise = function(skill, add) {
    saveNewExpertises(skill.name, add);
    enableOrDisableProficiencyCheckbox(skill.name);
    updateSkillModifier(skill);
}

/**
 * Initialize the modifier span of a skill item.
 * @param {object} skill 
 */
const initSkillModifierSpan = function(skill) {

    const skillModifierSpan = document.getElementById(`${skill.name}_m`);

    skillModifierSpan.textContent = getSkillModifier(skill);
}