/**
 * Custom HTML element for displaying and handling the button to open the Homebrew Edit Dialog.
 * Extends HTMLButtonElement.
 */
export class HomebrewEditButton extends HTMLButtonElement {
    homebrewId: string;
    
    constructor(homebrewId: string) {
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
    handleClick(): void {
        window.location.href = `homebrew/?id=${this.homebrewId}`;
    }
}

customElements.define('homebrew-object-edit-button', HomebrewEditButton, { extends: 'button' });