/**
 * Custom HTML element for displaying and handling the button to open the Character Reset Dialog.
 * Extends HTMLButtonElement.
 */
export class CharacterResetButton extends HTMLButtonElement {
    
    constructor() {
        super();
        
        // Set type and text.
        this.type = 'button';
        this.textContent = "Reset";

        // Bind click event to trigger the reset dialog.
        this.onclick = () => this.handleClick();
    }
    
    /**
     * Handles the button click and dispatches a "characterResetButtonClicked" event.
     */
    handleClick() {
        document.dispatchEvent(new Event('characterResetButtonClicked'));
    }
}

customElements.define('character-reset-button', CharacterResetButton, { extends: 'button' });