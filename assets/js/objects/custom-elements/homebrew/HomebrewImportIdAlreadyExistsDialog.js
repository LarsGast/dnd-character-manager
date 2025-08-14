import { globals } from "../../../load-globals.js";
import { HomebrewBankEntry } from "../../HomebrewBank.js";

/**
 * Custom HTML element for displaying the Homebrew Import ID Already Exists Dialog.
 * Extends HTMLDialogElement.
 */
export class HomebrewImportIdAlreadyExistsDialog extends HTMLDialogElement {
    
    constructor() {
        super();

        // Container for dialog content for styling.
        this.dialogContent = document.createElement('div');
        this.dialogContent.classList.add("dialog-content");

        // Create dialog heading.
        this.heading = document.createElement('h2');
        this.heading.textContent = "Object already exists";

        // Create description paragraphs.
        this.homebrewIdentifierAnchor = document.createElement('a');
        this.firstParagraph = document.createElement('p');
        this.firstParagraph.appendChild(document.createTextNode("We found an existing homebrew object with the same ID as the one you're trying to import ("));
        this.firstParagraph.appendChild(this.homebrewIdentifierAnchor);
        this.firstParagraph.appendChild(document.createTextNode("). Please choose from the options below."));

        // Cancel button.
        this.cancelImportButton = document.createElement('button');
        this.cancelImportButton.textContent = "Keep current only";
        this.cancelImportButton.type = 'button';
        this.cancelImportButton.onclick = () => this.handleCancelImportButtonClick();

        // Overwrite button.
        this.overwriteButton = document.createElement('button');
        this.overwriteButton.textContent = "Keep new only";
        this.overwriteButton.type = 'button';
        this.overwriteButton.onclick = () => this.handleOverwriteButtonClick();

        // Keep both button.
        this.keepBothButton = document.createElement('button');
        this.keepBothButton.textContent = "Keep both";
        this.keepBothButton.type = 'button';
        this.keepBothButton.onclick = () => this.handleKeepBothButtonClick();

        // Close button for the dialog.
        this.closeButton = document.createElement('button');
        this.closeButton.textContent = "Close";
        this.closeButton.type = 'button';
        this.closeButton.classList.add('close');
        this.closeButton.onclick = () => this.handleCloseButtonClick();

        this.buttonGroup = document.createElement('div');
        this.buttonGroup.classList.add('button-group');
        this.buttonGroup.appendChild(this.cancelImportButton);
        this.buttonGroup.appendChild(this.overwriteButton);
        this.buttonGroup.appendChild(this.keepBothButton);

        // Add all elements to the dialog content.
        this.dialogContent.appendChild(this.heading);
        this.dialogContent.appendChild(this.firstParagraph);
        this.dialogContent.appendChild(this.buttonGroup);
        this.dialogContent.appendChild(this.closeButton);

        // Append the content to the dialog.
        this.appendChild(this.dialogContent);        
    }

    /**
     * Called when the element is connected to the DOM.
     * Listens for the "homebrewImportIdAlreadyExists" event to show the dialog.
     */
    connectedCallback() {
        this._updateHandler = (event) => this.showDialog(event);
        document.addEventListener("homebrewImportIdAlreadyExists", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes the event listener.
     */
    disconnectedCallback() {
        document.removeEventListener("homebrewImportIdAlreadyExists", this._updateHandler);
    }

    /**
     * Displays the dialog and resets any previous file selections or preview.
     * @param {CustomEvent} event The event that triggered the dialog to open.
     */
    showDialog(event) {
        this.showModal();

        /** @type {HomebrewBankEntry} */
        this.homebrewBankEntry = event.detail.homebrewBankEntry;

        this.homebrewIdentifierAnchor.textContent = `${this.homebrewBankEntry.apiCategoryName}: ${this.homebrewBankEntry.homebrewObject.name}`;

        const existingEntry = globals.homebrewBank.getHomebrewBankEntryByObjectIndex(this.homebrewBankEntry.homebrewObject.index);

        this.homebrewIdentifierAnchor.href = `/pc-builder/homebrew/?id=${existingEntry.id}`;
        this.homebrewIdentifierAnchor.target = "_blank";
    }
  
    /**
     * Handles the cancel import button click.
     * Closes the dialog and dispatches an event to indicate import cancellation.
     */
    handleCancelImportButtonClick() {
        this.close();
        document.dispatchEvent(new Event("homebrewImportCancelled"));
    }

    /**
     * Handles the overwrite button click.
     * Overwrites the existing homebrew object with the new one and saves the homebrew bank
     */
    handleOverwriteButtonClick() {
        
        const existingEntry = globals.homebrewBank.getHomebrewBankEntryByObjectIndex(this.homebrewBankEntry.homebrewObject.index);
        existingEntry.homebrewObject = this.homebrewBankEntry.homebrewObject;

        globals.homebrewBank.save();

        this.close();

        document.dispatchEvent(new Event("homebrewImported"));
    }

    /**
     * Handles the keep both button click.
     * Creates a new homebrew object with a new UUID and appends it to the homebrew bank.
     * The new object will have the same properties as the existing one, but with a modified name.
     */
    handleKeepBothButtonClick() {
        this.homebrewBankEntry.homebrewObject.index = self.crypto.randomUUID();
        this.homebrewBankEntry.homebrewObject.name += " (copy)";

        globals.homebrewBank.addNewHomebrew(this.homebrewBankEntry.homebrewObject, this.homebrewBankEntry.apiCategoryName);
        globals.homebrewBank.save();

        this.close();

        document.dispatchEvent(new Event("homebrewImported"));
    }
  
    /**
     * Closes the dialog.
     */
    handleCloseButtonClick() {
        this.close();
    }
}

customElements.define('homebrew-object-import-id-already-exists-dialog', HomebrewImportIdAlreadyExistsDialog, { extends: 'dialog' });