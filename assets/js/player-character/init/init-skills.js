import { ApiCategory, getApiResultsAsync } from "../api.js";
import { 
    isProficientInSkill,
    isExpertInSkill,
    getSkillModifier,
    enableOrDisableProficiencyCheckbox,
    updateSkillModifier,
    enableOrDisableExpertiseCheckbox,
    saveNewSkillProficiencies,
    saveNewSkillExpertises
} from "../util.js";

/**
 * Initialize all elements for the skills on the PC builder page.
 */
export const initSkills = async function() {
    const skillsList = document.getElementById('skills-list');
    const skillsListItems = Array.from(skillsList.children);

    for (const skillListItem of skillsListItems) {
        await initSkillListItem(skillListItem);
    }
}

/**
 * Initialize a single li skill element.
 * @param {HTMLLIElement} skillListItem 
 */
const initSkillListItem = async function(skillListItem) {

    const skill = await getApiResultsAsync(ApiCategory.Skills, skillListItem.id)

    initProficiencyCheckbox(skill);
    initExpertiseCheckbox(skill);
    initSkillModifierSpan(skill);
}

/**
 * Initialize the proficiency checkbox of a skill item.
 * @param {object} skill 
 */
const initProficiencyCheckbox = function(skill) {

    const proficiencyCheckbox = document.getElementById(`${skill.index}_p`);

    proficiencyCheckbox.checked = isProficientInSkill(skill.index);
    proficiencyCheckbox.disabled = isExpertInSkill(skill.index);
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
    saveNewSkillProficiencies(skill.index, add);
    enableOrDisableExpertiseCheckbox(skill.index);
    updateSkillModifier(skill);
}

/**
 * Initialize the expertise checkbox of a skill item.
 * @param {object} skill 
 */
const initExpertiseCheckbox = function(skill) {

    const expertiseCheckbox = document.getElementById(`${skill.index}_e`);
    
    expertiseCheckbox.checked = isExpertInSkill(skill.index);
    expertiseCheckbox.disabled = !isProficientInSkill(skill.index);
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
    saveNewSkillExpertises(skill.index, add);
    enableOrDisableProficiencyCheckbox(skill.index);
    updateSkillModifier(skill);
}

/**
 * Initialize the modifier span of a skill item.
 * @param {object} skill 
 */
const initSkillModifierSpan = function(skill) {

    const skillModifierSpan = document.getElementById(`${skill.index}_m`);

    skillModifierSpan.textContent = getSkillModifier(skill);
}