import { Skill } from "../../api/resources/Skill.js";
import { globals } from "../../../load-page.js";

/**
 * Custom input element (checkbox) for toggling skill proficiency.
 * Extends HTMLInputElement.
 *
 * When clicked, this checkbox updates whether the PC is proficient in the skill and dispatches a "skillProficiencyChanged" event. 
 * It disables itself if the PC has expertise in the skill already.
 */
export class SkillProficiencyCheckbox extends HTMLInputElement {

    /**
     * Creates an instance of SkillProficiencyCheckbox.
     * @param {Skill} skill The skill object.
     */
    constructor(skill) {
        super();

        this.skill = skill;
        this.type = "checkbox";

        // Initialize based on the active PC's proficiency state.
        this.checked = globals.activePlayerCharacter.isProficientInSkill(this.skill.index);

        // Bind click event handler.
        this.onclick = () => this.handleChange();
    }
    
    /**
     * Called when connected to the DOM.
     * Updates display and listens for expertise changes.
     */
    connectedCallback() {
        this.updateDisplay();

        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("skillExpertiseChanged", this._updateHandler);
    }
  
    /**
     * Handles checkbox state changes for proficiency.
     */
    handleChange() {

        // Update proficiency in the skill.
        if (this.checked) {
            globals.activePlayerCharacter.addProficiencyInSkill(this.skill.index);
        } else {
            globals.activePlayerCharacter.removeProficiencyInSkill(this.skill.index);
        }

        document.dispatchEvent(new CustomEvent("skillProficiencyChanged", {
            detail: { skill: this.skill.index },
            bubbles: true
        }));
    }

    /**
     * Updates the checkbox's enabled state based on the expertise status.
     * @param {CustomEvent} event An optional event triggering the update.
     */
    updateDisplay(event) {
        if (!event || (event.type === "skillExpertiseChanged" && event.detail.skill === this.skill.index)) {
            
            // Disable if PC already has expertise in the skill.
            this.disabled = globals.activePlayerCharacter.isExpertInSkill(this.skill.index);
        }
    }
}

customElements.define("skill-proficiency-checkbox", SkillProficiencyCheckbox, { extends: 'input' });