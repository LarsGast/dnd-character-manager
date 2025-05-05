/**
 * Custom HTML element for displaying and handling the button to manage the users characters.
 * Extends HTMLButtonElement.
 */
export class ManageCharactersButton extends HTMLButtonElement {
    
    constructor() {
        super();
        
        // Set type and text.
        this.type = 'button';
        this.textContent = "Manage characters";

        // Bind click event to trigger the reset dialog.
        this.onclick = () => this.handleClick();
    }
    
    /**
     * Handles the button click and dispatches a "manageCharactersButtonClicked" event.
     */
    handleClick() {
        document.dispatchEvent(new Event('manageCharactersButtonClicked'));
    }
}

customElements.define('manage-characters-button', ManageCharactersButton, { extends: 'button' });