import { getEmptyOption, getSelectOption } from "../../../util.js";
import { globals } from "../../../load-globals.js";
import { Race } from "../../api/resources/Race.js";

/**
 * Custom select element for choosing a subrace.
 * Extends the built-in HTMLSelectElement.
 *
 * This element updates its options based on the selected race. 
 * It listens for the "raceUpdated" event to refresh the list of subraces available for the current race. 
 * Changes are propagated by dispatching a "subraceUpdated" event.
 */
export class SubraceInput extends HTMLSelectElement {
    
    constructor() {
        super();

        // Bind the onchange event handler.
        this.onchange = () => this.handleChange();
    }

    /**
     * Called when the element is connected to the DOM.
     * Immediately updates the subrace options and registers an event listener for race updates.
     */
    async connectedCallback() {

        // Update the displayed subrace options immediately.
        await this.updateDisplay();

        // Listen for updates when the race changes.
        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("raceUpdated", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes the race update event listener.
     */
    disconnectedCallback() {
        document.removeEventListener("raceUpdated", this._updateHandler);
    }

    /**
     * Updates the subrace options based on the current race.
     * @param {Event} event Optional event triggering the update.
     */
    async updateDisplay(event) {

        // Remove all existing child options.
        this.replaceChildren();

        // Add an empty option.
        this.appendChild(getEmptyOption());

        // If a race has been selected, load its subraces.
        if (globals.activePlayerCharacter.race) {
            const race = await Race.getAsync(globals.activePlayerCharacter.race);
            for (const subrace of race.subraces) {
                this.appendChild(getSelectOption(subrace.name, subrace.index));
            }
        }

        // If the update is triggered by an event, fire another event to indicate that the subrace of the PC has changed.
        // This only happens if the user changes their PC's race, and since races don't share subraces, the subrace of the PC is set to null.
        if (event) {
            this.handleChange();
        } else {
            // Otherwise, set the value to the current global subrace.
            this.value = globals.activePlayerCharacter.subrace;
        }
    }

    /**
     * Handles changes to the subrace selection.
     * Updates the PC's subrace and dispatches a "subraceUpdated" event.
     */
    handleChange() {
        globals.activePlayerCharacter.setProperty('subrace', this.value == "null" ? null : this.value);
        document.dispatchEvent(new Event("subraceUpdated"));
    }
}

// Define the custom element, extending the "select" element.
customElements.define('subrace-input', SubraceInput, { extends: 'select' });