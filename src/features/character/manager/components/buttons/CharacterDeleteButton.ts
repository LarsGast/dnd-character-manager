/**
 * Custom HTML element for displaying and handling the button to open the Character Delete Dialog.
 * Extends HTMLButtonElement.
 */
export class CharacterDeleteButton extends HTMLButtonElement {
    characterId: string;
    
    constructor(characterId: string) {
        super();
        
        // Set type and text.
        this.characterId = characterId;
        this.type = 'button';
        this.textContent = "Delete";

        // Bind click event to trigger the delete dialog.
        this.onclick = () => this.handleClick();
    }
    
    /**
     * Handles the button click and dispatches a "characterDeleteButtonClicked" event.
     */
    handleClick(): void {
        document.dispatchEvent(new CustomEvent("characterDeleteButtonClicked", {
            detail: { 
                characterId: this.characterId 
            },
            bubbles: true
        }));
    }
}

customElements.define('character-delete-button', CharacterDeleteButton, { extends: 'button' });