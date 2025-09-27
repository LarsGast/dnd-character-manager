import { globals } from '../../../../../../store/load-globals.js';
import { Skill } from '../../../../../../types/domain/resources/Skill.js';

/**
 * Custom element to display the calculated skill modifier.
 * Extends HTMLElement.
 *
 * This element listens for changes in proficiency, expertise, ability modifier, and proficiency bonus, and updates its displayed value accordingly.
 */
export class SkillModifierDisplay extends HTMLElement {
	skill: Skill;
	_updateHandler?: (event: any) => void;

	/**
	 * Creates an instance of SkillModifierDisplay.
	 * @param skill The skill object.
	 */
	constructor(skill: Skill) {
		super();
		this.skill = skill;
	}

	/**
	 * Called when the element is connected to the DOM.
	 * Updates the display and sets up event listeners.
	 */
	connectedCallback(): void {
		this.updateDisplay();

		this._updateHandler = (event: any) => this.updateDisplay(event);
		document.addEventListener('proficiencyBonusChanged', this._updateHandler);
		document.addEventListener(
			'abilityScoreModifierChanged',
			this._updateHandler,
		);
		document.addEventListener('skillProficiencyChanged', this._updateHandler);
		document.addEventListener('skillExpertiseChanged', this._updateHandler);
	}

	/**
	 * Updates the display if the triggering event indicates a change to this skill.
	 * @param event An event indicating potential changes.
	 */
	updateDisplay(event?: CustomEvent): void {
		if (this.getShouldUpdate(event)) {
			this.updateSkillModifier();
		}
	}

	/**
	 * Determines whether to update the display based on the given event.
	 * @param event The event to evaluate.
	 * @returns True if the display should update.
	 */
	getShouldUpdate(event?: CustomEvent): boolean {
		return (
			!event ||
			event.type === 'proficiencyBonusChanged' ||
			(event.type === 'abilityScoreModifierChanged' &&
				event.detail.ability === this.skill.ability_score.index) ||
			(event.type === 'skillProficiencyChanged' &&
				event.detail.skill === this.skill.index) ||
			(event.type === 'skillExpertiseChanged' &&
				event.detail.skill === this.skill.index)
		);
	}

	/**
	 * Computes and updates the text content with the skill's modifier.
	 * Dispatches a "skillModifierChanged" event.
	 */
	updateSkillModifier(): void {
		this.textContent = globals.activePlayerCharacter
			.getSkillModifier(this.skill)
			.toString();

		document.dispatchEvent(
			new CustomEvent('skillModifierChanged', {
				detail: { skill: this.skill.index },
				bubbles: true,
			}),
		);
	}
}

customElements.define('skill-modifier-display', SkillModifierDisplay);
