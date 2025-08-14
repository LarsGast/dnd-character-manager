/**
 * Custom HTML element for displaying and handling the button to manage homebrew objects.
 * Extends HTMLButtonElement.
 */
export class ManageHomebrewButton extends HTMLButtonElement {
    
    constructor() {
        super();
        
        this.type = 'button';
        this.textContent = "Manage homebrew";

        this.onclick = () => this.handleClick();
    }
    
    /**
     * Handles the button click.
     */
    handleClick() {
        document.dispatchEvent(new Event('manageHomebrewButtonClicked'));
    }
}

customElements.define('manage-homebrew-button', ManageHomebrewButton, { extends: 'button' });