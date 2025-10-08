import { SkillModifierDisplay } from './SkillModifierDisplay';
import { SkillProficiencyCheckbox } from '../checkboxes/SkillProficiencyCheckbox';
import { SkillExpertiseCheckbox } from '../checkboxes/SkillExpertiseCheckbox';
import { Skill } from '../../../../../../types/domain/resources/Skill';

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
	skill: Skill;
	proficiencyCheckbox: SkillProficiencyCheckbox;
	expertiseCheckbox: SkillExpertiseCheckbox;
	modifierDisplay: SkillModifierDisplay;
	skillNameDisplay: HTMLSpanElement;

	/**
	 * Creates an instance of SkillDisplay.
	 * @param skill The skill object.
	 */
	constructor(skill: Skill) {
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
