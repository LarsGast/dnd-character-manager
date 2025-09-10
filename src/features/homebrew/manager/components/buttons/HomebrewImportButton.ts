/**
 * Custom HTML element for displaying and handling the button to open the Homebrew Import Dialog.
 * Extends HTMLButtonElement.
 */
export class HomebrewImportButton extends HTMLButtonElement {
    
    constructor() {
        super();
        
        // Set type and text.
        this.type = 'button';
        this.textContent = "Import";

        // Bind click event to trigger the import dialog.
        this.onclick = () => this.handleClick();
    }
    
    /**
     * Handles the button click and dispatches a "homebrewImportButtonClicked" event.
     */
    handleClick(): void {
        document.dispatchEvent(new Event("homebrewImportButtonClicked"));
    }
}

customElements.define('homebrew-object-import-button', HomebrewImportButton, { extends: 'button' });