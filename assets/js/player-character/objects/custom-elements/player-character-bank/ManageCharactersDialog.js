import { getElementWithTextContent } from "../../../util.js"
import { CharacterBankTable } from "./CharacterBankTable.js";
import { CharacterImportButton } from "./CharacterImportButton.js"
import { NewCharacterButton } from "./NewCharacterButton.js";

/**
 * Custom HTML element for displaying the saved characters in storage.
 * Extends HTMLDialogElement.
 *
 * The dialog shows the user all their characters (active and inactive) and lets them switch, export, import, and delete.
 */
export class ManageCharactersDialog extends HTMLDialogElement {
    
    constructor() {
        super();
        
        // Container div for styling the content of the dialog.
        this.dialogContent = document.createElement('div');
        this.dialogContent.classList.add("dialog-content", "manage-characters-dialog-content");

        // Create a heading for the dialog.
        this.heading = getElementWithTextContent("h2", "Manage characters");

        // User friendly description.
        this.firstParagraph = getElementWithTextContent("p", "Manage your characters by changing the selected character, exporting a character, deleting a character, and importing a new character.");
        this.secondParagraph = getElementWithTextContent("p", "Characters are automatically saved as you go, so you can safely switch between characters without the risk of losing data.");
        this.thirdParagraph = getElementWithTextContent("p", "When you create a new character, it will appear in the \"Character storage\" table below.");

        // New character button.
        this.createNewCharacterButton = new NewCharacterButton();

        // Import button.
        this.importButton = new CharacterImportButton();

        // Create the containers that hold the tables that show information about the characters.
        this.currentCharacterTableContainer = document.createElement('div');
        this.currentCharacterTableContainer.className = "table-container";
        this.currentCharacterTableContainer.appendChild(new CharacterBankTable(true));

        this.bankedCharactersTableContainer = document.createElement('div');
        this.bankedCharactersTableContainer.className = "table-container";
        this.bankedCharactersTableContainer.appendChild(new CharacterBankTable(false));

        // Close button.
        this.closeButton = document.createElement('button');
        this.closeButton.textContent = "Close";
        this.closeButton.type = 'button';
        this.closeButton.classList.add('close');
        this.closeButton.onclick = () => this.handleCloseButtonClick();

        this.dialogContent.appendChild(this.heading);
        this.dialogContent.appendChild(this.firstParagraph);
        this.dialogContent.appendChild(this.secondParagraph);
        this.dialogContent.appendChild(this.thirdParagraph);
        this.dialogContent.appendChild(this.createNewCharacterButton);
        this.dialogContent.appendChild(this.importButton);
        this.dialogContent.appendChild(this.currentCharacterTableContainer);
        this.dialogContent.appendChild(this.bankedCharactersTableContainer);
        this.dialogContent.appendChild(this.closeButton);

        this.appendChild(this.dialogContent);
    }

    /**
     * Called when the element is connected to the DOM.
     * Listens for the "manageCharactersButtonClicked" event to show the dialog.
     */
    connectedCallback() {
        this._updateHandler = () => this.showDialog();
        document.addEventListener("manageCharactersButtonClicked", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes the event listener.
     */
    disconnectedCallback() {
        document.removeEventListener("manageCharactersButtonClicked", this._updateHandler);
    }

    /**
     * Opens the dialog and fires off an event to let the page know it is opened.
     */
    showDialog() {
        this.showModal();

        document.dispatchEvent(new Event('manageCharactersDialogOpened'));
    }
  
    /**
     * Closes the dialog.
     */
    handleCloseButtonClick() {
        this.close();
    }
}

customElements.define('manage-characters-dialog', ManageCharactersDialog, { extends: 'dialog' });