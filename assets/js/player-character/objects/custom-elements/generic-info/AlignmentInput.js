import { Alignment } from "../../api/resources/Alignment.js";
import { getEmptyOption, getSelectOption } from "../../../util.js";
import { globalPlayerCharacter } from "../../PlayerCharacter.js";

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

        // Bind the change event to update the global player's alignment.
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
        for (const alignment of allAlignments.results) {
            this.appendChild(getSelectOption(alignment.name, alignment.index));
        }

        // Set the select value to the global PC's current alignment.
        this.value = globalPlayerCharacter.alignment;
    }

    /**
     * Handles changes in the select input.
     * Updates the global PC's alignment and dispatches an "alignmentUpdated" event.
     */
    handleChange() {
        globalPlayerCharacter.setProperty('alignment', this.value);
        document.dispatchEvent(new Event("alignmentUpdated"));
    }
}

// Define the custom element with the "select" extension.
customElements.define('alignment-input', AlignmentInput, { extends: 'select' });