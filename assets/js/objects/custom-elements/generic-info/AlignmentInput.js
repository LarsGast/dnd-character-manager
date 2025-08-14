import { Alignment } from "../../api/resources/Alignment.js";
import { getEmptyOption, populateSelectWithApiObjects } from "../../../util.js";
import { globals } from "../../../load-globals.js";

/**
 * Custom select element for choosing an alignment.
 * Extends the built-in HTMLSelectElement.
 *
 * This element fetches all available alignments asynchronously, populates the select options, and sets the current selection based on the PC's current alignment.
 * Changes are reflected by updating the global state and dispatching an "alignmentUpdated" event.
 */
export class AlignmentInput extends HTMLSelectElement {
    
    constructor() {
        super();

        // Bind the change event to update the active player's alignment.
        this.onchange = () => this.handleChange();
    }

    /**
     * Called when the element is connected to the DOM.
     * Asynchronously loads all alignments and populates the select options.
     */
    async connectedCallback() {

        // Retrieve all alignments.
        const allAlignments = await Alignment.getAllAsync();

        // Add a blank option first.
        this.appendChild(getEmptyOption());

        // For each alignment, create and add a select option.
        populateSelectWithApiObjects(this, allAlignments);

        // Set the select value to the active PC's current alignment.
        this.value = globals.activePlayerCharacter.alignment;
    }

    /**
     * Handles changes in the select input.
     * Updates the active PC's alignment and dispatches an "alignmentUpdated" event.
     */
    handleChange() {
        globals.activePlayerCharacter.setProperty('alignment', this.value);
        document.dispatchEvent(new Event("alignmentUpdated"));
    }
}

// Define the custom element with the "select" extension.
customElements.define('alignment-input', AlignmentInput, { extends: 'select' });