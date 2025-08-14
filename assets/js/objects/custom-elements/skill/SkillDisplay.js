import { Skill } from "../../api/resources/Skill.js";
import { SkillModifierDisplay } from "./SkillModifierDisplay.js";
import { SkillProficiencyCheckbox } from "./SkillProficiencyCheckbox.js";
import { SkillExpertiseCheckbox } from "./SkillExpertiseCheckbox.js";

/**
 * Custom list item element for displaying a single skill.
 * Extends HTMLLIElement.
 *
 * This element contains:
 * - A proficiency checkbox (SkillProficiencyCheckbox)
 * - An expertise checkbox (SkillExpertiseCheckbox)
 * - A modifier display (SkillModifierDisplay)
 * - A text element showing the skill name and corresponding ability.
 */
export class SkillDisplay extends HTMLLIElement {

    /**
     * Creates an instance of SkillDisplay.
     * @param {Skill} skill The skill object.
     */
    constructor(skill) {
        super();

        this.skill = skill;

        // Create sub-components.
        this.proficiencyCheckbox = new SkillProficiencyCheckbox(this.skill);
        this.expertiseCheckbox = new SkillExpertiseCheckbox(this.skill);
        this.modifierDisplay = new SkillModifierDisplay(this.skill);
        this.skillNameDisplay = document.createElement('span');
        this.skillNameDisplay.textContent = ` ${this.skill.name} (${this.skill.ability_score.name})`;

        // Append all elements to the list item.
        this.appendChild(this.proficiencyCheckbox);
        this.appendChild(this.expertiseCheckbox);
        this.appendChild(this.modifierDisplay);
        this.appendChild(this.skillNameDisplay);
    }
}

customElements.define('skill-display', SkillDisplay, { extends: 'li' });