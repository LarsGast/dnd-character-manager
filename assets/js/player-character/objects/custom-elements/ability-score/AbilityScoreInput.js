import { globals } from "../../../load-page.js";

/**
 * Custom input element for editing an ability score.
 * Extends HTMLInputElement.
 *
 * This input element is configured to accept a number between 1 and 30.
 * It initializes its value from the active PC's ability score and updates it when the user changes the input.
 */
export class AbilityScoreInput extends HTMLInputElement {

    /**
     * Create an AbilityScoreInput.
     * @param {string} ability The ability for which the score is being input (e.g., "str", "dex").
     */
    constructor(ability) {
        super();

        // Store the ability identifier.
        this.ability = ability;

        // Set input type and limits.
        this.type = "number";
        this.min = 1;
        this.max = 30;

        // Initialize the input value from the active PC's current ability score.
        this.value = globals.activePlayerCharacter[this.ability];

        // Bind the change handler to react on user input changes.
        this.onchange = () => this.handleChange();
    }

    /**
     * Handler triggered when the input value changes.
     *
     * This method ensures the score is within accepted limits, then updates the active PC's property and dispatches a custom event to notify that the ability score has changed.
     */
    handleChange() {

        // Ensure the score does not exceed boundaries.
        this.limitScore();
        
        // Update the PC's ability score (convert input value to an integer).
        globals.activePlayerCharacter.setProperty(this.ability, parseInt(this.value));

        // Dispatch an event signaling that the ability score has changed.
        document.dispatchEvent(new CustomEvent("abilityScoreChanged", {
            detail: { 
                ability: this.ability 
            },
            bubbles: true
        }));
    }
    
    /**
     * Restrict the value to the defined boundaries (min: 1, max: 30).
     */
    limitScore() {
        if (this.value > 30) {
            this.value = 30;
        }

        if (this.value < 1) {
            this.value = 1;
        }
    }
}

// Define the custom element, specifying that this element extends an input.
customElements.define("ability-score-input", AbilityScoreInput, { extends: "input" });