import { Skill } from "../../api/resources/Skill.js";
import { globals } from "../../../load-globals.js";

/**
 * Custom element to display the calculated skill modifier.
 * Extends HTMLElement.
 *
 * This element listens for changes in proficiency, expertise, ability modifier, and proficiency bonus, and updates its displayed value accordingly.
 */
export class SkillModifierDisplay extends HTMLElement {

    /**
     * Creates an instance of SkillModifierDisplay.
     * @param {Skill} skill The skill object.
     */
    constructor(skill) {
        super();
        this.skill = skill;
    }
    
    /**
     * Called when the element is connected to the DOM.
     * Updates the display and sets up event listeners.
     */
    connectedCallback() {
        this.updateDisplay();

        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("proficiencyBonusChanged", this._updateHandler);
        document.addEventListener("abilityScoreModifierChanged", this._updateHandler);
        document.addEventListener("skillProficiencyChanged", this._updateHandler);
        document.addEventListener("skillExpertiseChanged", this._updateHandler);
    }

    /**
     * Updates the display if the triggering event indicates a change to this skill.
     * @param {CustomEvent} event An event indicating potential changes.
     */
    updateDisplay(event) {
        if (this.getShouldUpdate(event)) {
            this.updateSkillModifier();
        }
    }

    /**
     * Determines whether to update the display based on the given event.
     * @param {CustomEvent} event The event to evaluate.
     * @returns {boolean} True if the display should update.
     */
    getShouldUpdate(event) {
        return !event ||
            event.type === "proficiencyBonusChanged" ||
            (event.type === "abilityScoreModifierChanged" && event.detail.ability === this.skill.ability_score.index) ||
            (event.type === "skillProficiencyChanged" && event.detail.skill === this.skill.index) ||
            (event.type === "skillExpertiseChanged" && event.detail.skill === this.skill.index);
    }

    /**
     * Computes and updates the text content with the skill's modifier.
     * Dispatches a "skillModifierChanged" event.
     */
    updateSkillModifier() {
        this.textContent = globals.activePlayerCharacter.getSkillModifier(this.skill);
        
        document.dispatchEvent(new CustomEvent("skillModifierChanged", {
            detail: { skill: this.skill.index },
            bubbles: true
        }));
    }
}

customElements.define("skill-modifier-display", SkillModifierDisplay);