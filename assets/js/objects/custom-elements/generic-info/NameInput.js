import { globals } from "../../../load-globals.js";

/**
 * Custom input element for setting the character's name.
 * Extends the built-in HTMLInputElement.
 *
 * The element initializes its value from the active PC's name and dispatches a "nameChanged" event when the input changes.
 */
export class NameInput extends HTMLInputElement {
    constructor() {
        super();

        // Set the input type to text.
        this.type = 'text';

        // Initialize the value with the active PC's name.
        this.value = globals.activePlayerCharacter.name;

        // Bind the change event.
        this.onchange = () => this.handleChange();
    }

    /**
     * Handles changes in the name input.
     * Updates the PC's name and dispatches a "nameChanged" event.
     */
    handleChange() {
        globals.activePlayerCharacter.setProperty('name', this.value);
        document.dispatchEvent(new Event("nameChanged"));
    }
}

// Define the custom element, extending the "input" element.
customElements.define("name-input", NameInput, { extends: 'input' });