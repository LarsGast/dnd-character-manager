import { Weapon } from "../../api/resources/equipment/Weapon.js";
import { globalPlayerCharacter } from "../../PlayerCharacter.js";

/**
 * Custom checkbox element representing a weapon proficiency toggle.
 * Extends the built-in HTMLInputElement.
 *
 * This checkbox's state is determined by whether the PC is proficient in the given weapon. 
 * Clicking the checkbox will update the PC's proficiency and notify any listeners via a custom event.
 */
export class WeaponProficiencyCheckbox extends HTMLInputElement {

    /**
     * Create a WeaponProficiencyCheckbox.
     * @param {Weapon} weapon A Weapon object representing the weapon to display.
     */
    constructor(weapon) {
        super();

        /** @type {Weapon} */
        this.weapon = weapon;
        
        // Set the checkbox type.
        this.type = "checkbox";

        // Determine initial state from the global PC's proficiencies.
        this.checked = globalPlayerCharacter.isProficientInWeapon(this.weapon.index);

        // Bind the change handler to update weapon proficiency.
        this.onclick = () => this.handleChange();
    }
  
    /**
     * Event handler for checkbox state changes.
     *
     * Updates the global player character's weapon proficiency based on checkbox state and dispatches a custom event.
     */
    handleChange() {

        // Update proficiencies.
        if (this.checked) {
            globalPlayerCharacter.addProficiencyInWeapon(this.weapon.index);
        } else {
            globalPlayerCharacter.removeProficiencyInWeapon(this.weapon.index);
        }

        // Dispatch a custom event to signal the change in weapon proficiency.
        document.dispatchEvent(new CustomEvent("weaponProficiencyChanged", {
            detail: { 
                weapon: this.weapon.index 
            },
            bubbles: true
        }));
    }
}

// Define the custom element, extending the built-in "input" element.
customElements.define("weapon-proficiency-checkbox", WeaponProficiencyCheckbox, { extends: 'input' });