import { globalPlayerCharacter } from "../../PlayerCharacter.js";

/**
 * Custom HTML element for displaying the Character Reset Dialog.
 * Extends HTMLDialogElement.
 *
 * The dialog warns the user about data loss, upon confirmation resets the global player character, then reloads the page to update all elements.
 */
export class CharacterResetDialog extends HTMLDialogElement {
    
    constructor() {
        super();

        // Container div for dialog content.
        this.dialogContent = document.createElement('div');
        this.dialogContent.classList.add("dialog-content");

        // Dialog heading.
        this.heading = document.createElement('h2');
        this.heading.textContent = "Reset PC";

        // First paragraph describing what the reset does.
        this.firstParagraph = document.createElement('p');
        this.firstParagraph.textContent = "By resetting the PC, you will set the page to the same state it was when you loaded the page for the first time. All data will be removed and default values will be assigned to each property.";

        // Second paragraph with a warning. It contains emphasized text.
        this.secondParagraph = document.createElement('p');
        this.warningText = document.createElement('strong');
        this.warningText.textContent = "Warning: resetting the page will remove all data. Export the data first to create a backup if you do not want to lose any data.";
        this.secondParagraph.appendChild(this.warningText);

        // Reset button.
        this.resetButton = document.createElement('button');
        this.resetButton.textContent = "Reset";
        this.resetButton.type = 'button';
        this.resetButton.classList.add('reset');
        this.resetButton.onclick = () => this.handleResetButtonClick();

        // Close button.
        this.closeButton = document.createElement('button');
        this.closeButton.textContent = "Close";
        this.closeButton.type = 'button';
        this.closeButton.classList.add('close');
        this.closeButton.onclick = () => this.handleCloseButtonClick();

        // Assemble dialog content.
        this.dialogContent.appendChild(this.heading);
        this.dialogContent.appendChild(this.firstParagraph);
        this.dialogContent.appendChild(this.secondParagraph);
        this.dialogContent.appendChild(this.resetButton);
        this.dialogContent.appendChild(this.closeButton);

        this.appendChild(this.dialogContent);        
    }

    /**
     * Called when the element is connected to the DOM.
     * Registers an event listener for "characterResetButtonClicked".
     */
    connectedCallback() {
        this._updateHandler = () => this.showDialog();
        document.addEventListener("characterResetButtonClicked", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes the event listener.
     */
    disconnectedCallback() {
        document.removeEventListener("characterResetButtonClicked", this._updateHandler);
    }

    /**
     * Opens the dialog.
     */
    showDialog() {
        this.showModal();
    }
  
    /**
     * Handles reset button clicks. Resets the global character and reloads the page.
     */
    handleResetButtonClick() {
        globalPlayerCharacter.reset();
        
        // Reload the page to update all elements with default values.
        window.location.reload();
    }
  
    /**
     * Closes the dialog.
     */
    handleCloseButtonClick() {
        this.close();
    }
}

customElements.define('character-reset-dialog', CharacterResetDialog, { extends: 'dialog' });