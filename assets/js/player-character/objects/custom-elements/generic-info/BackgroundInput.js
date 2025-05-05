import { Background } from "../../api/resources/Background.js";
import { getEmptyOption, getSelectOption } from "../../../util.js";
import { globals } from "../../../load-page.js";

/**
 * Custom select element for choosing a character background.
 * Extends the built-in HTMLSelectElement.
 *
 * This element loads all available backgrounds asynchronously, populates its options, and reflects the PC's current background selection. 
 * It dispatches a "backgroundUpdated" event when the value is changed.
 */
export class BackgroundInput extends HTMLSelectElement {
    
    constructor() {
        super();

        // Bind the onchange event to update the global background.
        this.onchange = () => this.handleChange();
    }

    /**
     * Called when the element is connected to the DOM.
     * Loads all backgrounds and sets up the select options.
     */
    async connectedCallback() {
        
        // Retrieve all backgrounds.
        const allBackgrounds = await Background.getAllAsync();

        // Add an empty option at the top.
        this.appendChild(getEmptyOption());

        // Populate the select element with background options.
        for (const background of allBackgrounds.results) {
            this.appendChild(getSelectOption(background.name, background.index));
        }

        // Set the current value from the active player's data.
        this.value = globals.activePlayerCharacter.background;
    }

    /**
     * Handles selection changes.
     * Updates the player's background and dispatches a "backgroundUpdated" event.
     */
    handleChange() {
        globals.activePlayerCharacter.setProperty('background', this.value);
        document.dispatchEvent(new Event("backgroundUpdated"));
    }
}

// Define the custom element with the "select" extension.
customElements.define('background-input', BackgroundInput, { extends: 'select' });