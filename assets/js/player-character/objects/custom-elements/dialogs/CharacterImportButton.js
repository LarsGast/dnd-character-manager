/**
 * Custom HTML element for displaying and handling the button to open the Character Import Dialog.
 * Extends HTMLButtonElement.
 */
export class CharacterImportButton extends HTMLButtonElement {
    
    constructor() {
        super();
        
        // Set type and display text.
        this.type = 'button';
        this.textContent = "Import";

        // Bind click event to dispatch an event to open the import dialog.
        this.onclick = () => this.handleClick();
    }
    
    /**
     * Handles the button click and dispatches a "characterImportButtonClicked" event.
     */
    handleClick() {
        document.dispatchEvent(new Event('characterImportButtonClicked'));
    }
}

customElements.define('character-import-button', CharacterImportButton, { extends: 'button' });