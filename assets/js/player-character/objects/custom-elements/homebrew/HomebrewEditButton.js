/**
 * Custom HTML element for displaying and handling the button to open the Homebrew Edit Dialog.
 * Extends HTMLButtonElement.
 */
export class HomebrewEditButton extends HTMLButtonElement {
    
    constructor(homebrewId) {
        super();
        
        // Set type and text.
        this.homebrewId = homebrewId;
        this.type = 'button';
        this.textContent = "Edit";

        // Bind click event to trigger the edit dialog.
        this.onclick = () => this.handleClick();
    }
    
    /**
     * Handles the button click and dispatches a "homebrewEditButtonClicked" event.
     */
    handleClick() {
        window.location.href = `../pc-builder/homebrew/?id=${this.homebrewId}`;
    }
}

customElements.define('homebrew-object-edit-button', HomebrewEditButton, { extends: 'button' });