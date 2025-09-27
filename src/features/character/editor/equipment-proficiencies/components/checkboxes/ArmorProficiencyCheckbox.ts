import { globals } from '../../../../../../store/load-globals.js';
import { Armor } from '../../../../../../types/domain/resources/Armor.js';

/**
 * Custom checkbox element representing an armor proficiency toggle.
 * Extends the built-in HTMLInputElement.
 *
 * This checkbox's state is determined by whether the PC is proficient in the given armor.
 * Clicking the checkbox will update the PC's proficiency and notify any listeners via a custom event.
 */
export class ArmorProficiencyCheckbox extends HTMLInputElement {
	armor: Armor;

	/**
	 * Create an ArmorProficiencyCheckbox.
	 * @param armor An Armor object representing the armor to display.
	 */
	constructor(armor: Armor) {
		super();

		this.armor = armor;

		// Set the input type to checkbox.
		this.type = 'checkbox';

		// Initialize the checked state based on PC's current proficiency.
		this.checked = globals.activePlayerCharacter.isProficientInArmor(
			this.armor.index,
		);

		// Bind the handleChange method to the click event.
		this.onclick = () => this.handleChange();
	}

	/**
	 * Event handler for checkbox state changes.
	 *
	 * When the checkbox is toggled, this method updates the active PC's armor proficiency accordingly and dispatches a custom event.
	 */
	handleChange(): void {
		// Update proficiencies.
		if (this.checked) {
			globals.activePlayerCharacter.addProficiencyInArmor(this.armor.index);
		} else {
			globals.activePlayerCharacter.removeProficiencyInArmor(this.armor.index);
		}

		// Dispatch a custom event to notify that the armor proficiency has changed.
		document.dispatchEvent(
			new CustomEvent('armorProficiencyChanged', {
				detail: {
					armor: this.armor.index,
				},
				bubbles: true,
			}),
		);
	}
}

// Define the custom element, extending the built-in "input" element.
customElements.define('armor-proficiency-checkbox', ArmorProficiencyCheckbox, {
	extends: 'input',
});
