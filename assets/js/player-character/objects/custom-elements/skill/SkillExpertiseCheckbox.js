import { Skill } from "../../api/resources/Skill.js";
import { globals } from "../../../load-globals.js";

/**
 * Custom input element (checkbox) for toggling skill expertise.
 * Extends HTMLInputElement.
 *
 * On change, it updates the active PC's expertise state for the skill and dispatches a "skillExpertiseChanged" event.
 */
export class SkillExpertiseCheckbox extends HTMLInputElement {

    /**
     * Creates an instance of SkillExpertiseCheckbox.
     * @param {Skill} skill The skill object.
     */
    constructor(skill) {
        super();

        this.skill = skill;
        this.type = "checkbox";

        // Set checkbox state based on the PC's current expertise.
        this.checked = globals.activePlayerCharacter.isExpertInSkill(this.skill.index);

        // Bind the onclick event.
        this.onclick = () => this.handleChange();
    }
    
    /**
     * Called when the element is connected to the DOM.
     * Updates its display and listens for changes in skill proficiency.
     */
    connectedCallback() {
        this.updateDisplay();

        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("skillProficiencyChanged", this._updateHandler);
    }
  
    /**
     * Handles changes to the checkbox state, updating global expertise.
     */
    handleChange() {

        // Add or remove expertise in given skill.
        if (this.checked) {
            globals.activePlayerCharacter.addExpertiseInSkill(this.skill.index);
        } else {
            globals.activePlayerCharacter.removeExpertiseInSkill(this.skill.index);
        }

        document.dispatchEvent(new CustomEvent("skillExpertiseChanged", {
            detail: { skill: this.skill.index },
            bubbles: true
        }));
    }

    /**
     * Updates the checkbox display based on the proficiency state.
     * Disables the checkbox if the PC is not yet proficient in the skill.
     * @param {CustomEvent} event An event indicating a change.
     */
    updateDisplay(event) {
        if (!event || (event.type === "skillProficiencyChanged" && event.detail.skill === this.skill.index)) {
            this.disabled = !globals.activePlayerCharacter.isProficientInSkill(this.skill.index);
        }
    }
}

customElements.define("skill-expertise-checkbox", SkillExpertiseCheckbox, { extends: 'input' });