import { globals } from "../../../load-page.js";

/**
 * Custom element for displaying the modifier calculated from an ability score.
 * Extends HTMLElement.
 *
 * This element listens for changes to the corresponding ability score and updates its displayed modifier accordingly.
 * It also dispatches a custom event when updated.
 */
export class AbilityScoreModifierDisplay extends HTMLElement {

    /**
     * Create an AbilityScoreModifierDisplay.
     * @param {string} ability The ability name (e.g., "str", "dex") for which to display the modifier.
     */
    constructor(ability) {
        super();

        // Store the ability this display is associated with.
        this.ability = ability;
    }

    /**
     * Called when the element is added to the DOM.
     *
     * Sets the initial display value and registers an event listener to update the modifier when the ability score changes.
     */
    connectedCallback() {

        // Set the initial display value.
        this.updateDisplay();

        // Register an event listener for ability score changes.
        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("abilityScoreChanged", this._updateHandler);
    }

    /**
     * Called when the element is removed from the DOM.
     *
     * Ensures that the event listener is removed to prevent memory leaks.
     */
    disconnectedCallback() {
        document.removeEventListener("abilityScoreChanged", this._updateHandler);
    }

    /**
     * Update the displayed modifier.
     *
     * If an event is provided, the update only occurs if it relates to this ability.
     * It also dispatches a custom event notifying that the modifier has changed.
     *
     * @param {CustomEvent} event The event that may trigger the update.
     */
    updateDisplay(event) {

        // If there is no event or the event matches this ability, update the display.
        if (!event || event.detail.ability === this.ability) {
            
            // Retrieve and display the ability modifier from the active player character.
            this.textContent = globals.activePlayerCharacter.getAbilityModifier(this.ability);
            this.handleChange();
        }
    }

    /**
     * Dispatch a custom event indicating that the ability score modifier has changed.
     */
    handleChange() {
        document.dispatchEvent(new CustomEvent("abilityScoreModifierChanged", {
            detail: { 
                ability: this.ability 
            },
            bubbles: true
        }));
    }
}

// Define the custom element.
customElements.define("ability-score-modifier-display", AbilityScoreModifierDisplay);