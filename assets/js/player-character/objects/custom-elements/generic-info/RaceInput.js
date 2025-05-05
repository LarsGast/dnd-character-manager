import { Race } from "../../api/resources/Race.js";
import { getEmptyOption, getSelectOption } from "../../../util.js";
import { globals } from "../../../load-page.js";

/**
 * Custom select element for choosing a race.
 * Extends the built-in HTMLSelectElement.
 *
 * The element loads all available races asynchronously, populates the options, and sets its value based on the active PC's data.
 * On change, the PC's race is updated and a "raceUpdated" event is dispatched.
 */
export class RaceInput extends HTMLSelectElement {
    
    constructor() {
        super();

        // Bind the onchange event handler.
        this.onchange = () => this.handleChange();
    }

    /**
     * Called when the element is connected to the DOM.
     * Loads all races and sets up the select options.
     */
    async connectedCallback() {

        // Retrieve all races.
        const allRaces = await Race.getAllAsync();

        // Add an empty default option.
        this.appendChild(getEmptyOption());

        // Populate the select element with race options.
        for (const race of allRaces.results) {
            this.appendChild(getSelectOption(race.name, race.index));
        }

        // Set the value to the current PC's race.
        this.value = globals.activePlayerCharacter.race;
    }

    /**
     * Handles changes to the race selection.
     * Updates the PC's race and dispatches a "raceUpdated" event.
     */
    handleChange() {
        globals.activePlayerCharacter.setProperty('race', this.value);
        document.dispatchEvent(new Event("raceUpdated"));
    }
}

// Define the custom element, extending the "select" element.
customElements.define('race-input', RaceInput, { extends: 'select' });