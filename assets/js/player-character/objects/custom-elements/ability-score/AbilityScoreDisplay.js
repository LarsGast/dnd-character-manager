import { AbilityScoreInput } from "./AbilityScoreInput.js";
import { AbilityScoreModifierDisplay } from "./AbilityScoreModifierDisplay.js";

/**
 * Custom element for displaying an ability score along with its modifier and input control.
 * Extends HTMLElement.
 *
 * This element renders:
 * - A label showing the abbreviated ability name.
 * - A modifier display for the ability, which updates when the ability score changes.
 * - An input field for the user to adjust the ability score.
 */
export class AbilityScoreDisplay extends HTMLElement {

    constructor() {
        super();

        // Retrieve the "ability" attribute (e.g., "str", "dex").
        this.ability = this.getAttribute("ability");

        // Create a span element to display the ability's label.
        this.displayLabel = document.createElement('span');
        this.displayLabel.textContent = this.ability.toUpperCase();

        // Create the modifier display element.
        this.modifierDisplay = new AbilityScoreModifierDisplay(this.ability);

        // Create the ability score input element.
        this.scoreInput = new AbilityScoreInput(this.ability);

        // Append the label, modifier display, and input field as children.
        this.appendChild(this.displayLabel);
        this.appendChild(this.modifierDisplay);
        this.appendChild(this.scoreInput);
    }
}

// Define the custom element.
customElements.define('ability-score-display', AbilityScoreDisplay);