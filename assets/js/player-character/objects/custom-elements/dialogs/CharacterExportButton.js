/**
 * Custom HTML element for displaying and handling the button to open the Character Export Dialog.
 * Extends HTMLButtonElement.
 */
export class CharacterExportButton extends HTMLButtonElement {
    
    constructor() {
        super();
        
        // Set the button type and label.
        this.type = 'button';
        this.textContent = "Export";

        // Bind click event to handle export button click.
        this.onclick = () => this.handleClick();
    }
    
    /**
     * Handles the click event. Dispatches a custom event that the export dialog listens for.
     */
    handleClick() {
        
        // Fire an event that signals the Character Export Dialog should be shown.
        document.dispatchEvent(new Event('characterExportButtonClicked'));
    }
}

// Define the custom element, specifying that it extends a 'button' element.
customElements.define('character-export-button', CharacterExportButton, { extends: 'button' });