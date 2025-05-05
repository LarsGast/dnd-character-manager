import { globals } from "../../../load-page.js";

/**
 * Custom element for displaying the proficiency bonus.
 * Extends the built-in HTMLElement.
 *
 * This element displays the proficiency bonus based on the active PC's class & level data.
 * It updates automatically when the "classesChanged" event is dispatched.
 */
export class ProficiencyBonusDisplay extends HTMLElement {

    constructor() {
        super();
    }
    
    /**
     * Called when the element is connected to the DOM.
     * Immediately updates the displayed proficiency bonus and registers an event listener for class changes.
     */
    connectedCallback() {

        // Update display immediately.
        this.updateDisplay();

        // Listen for changes in the classes data.
        this._updateHandler = () => this.updateDisplay();
        document.addEventListener("classesChanged", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes the event listener to prevent memory leaks.
     */
    disconnectedCallback() {
        document.removeEventListener("classesChanged", this._updateHandler);
    }
    
    /**
     * Updates the displayed proficiency bonus.
     * Retrieves the bonus from the PC's data and dispatches a "proficiencyBonusChanged" event.
     */
    updateDisplay() {

        // Update the element's text with the current proficiency bonus.
        this.textContent = globals.activePlayerCharacter.getProficiencyBonus();
        
        // Dispatch an event to indicate the bonus has been updated.
        document.dispatchEvent(new Event("proficiencyBonusChanged"));
    }
}
  
// Define the custom element.
customElements.define("proficiency-bonus-display", ProficiencyBonusDisplay);