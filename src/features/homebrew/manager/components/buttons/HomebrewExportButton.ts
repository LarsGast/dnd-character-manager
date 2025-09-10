/**
 * Custom HTML element for displaying and handling the button to open the Homebrew Export Dialog.
 * Extends HTMLButtonElement.
 */
export class HomebrewExportButton extends HTMLButtonElement {
    homebrewId: string;
    
    constructor(homebrewId: string) {
        super();
        
        // Set type and text.
        this.homebrewId = homebrewId;
        this.type = 'button';
        this.textContent = "Export";

        // Bind click event to trigger the export dialog.
        this.onclick = () => this.handleClick();
    }
    
    /**
     * Handles the button click and dispatches a "homebrewExportButtonClicked" event.
     */
    handleClick(): void {
        document.dispatchEvent(new CustomEvent("homebrewExportButtonClicked", {
            detail: { 
                homebrewId: this.homebrewId 
            },
            bubbles: true
        }));
    }
}

customElements.define('homebrew-object-export-button', HomebrewExportButton, { extends: 'button' });