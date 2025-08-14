import { globals } from "../../../load-globals.js";

/**
 * Custom HTML element for displaying the Homebrew Delete Dialog.
 * Extends HTMLDialogElement.
 *
 * The dialog warns the user about data loss, upon confirmation deletes the selected homebrew object.
 */
export class HomebrewDeleteDialog extends HTMLDialogElement {
    
    constructor() {
        super();

        // Container div for dialog content.
        this.dialogContent = document.createElement('div');
        this.dialogContent.classList.add("dialog-content");

        // Dialog heading.
        this.heading = document.createElement('h2');
        this.heading.textContent = "Delete Custom Object";

        // Paragraph with a warning. It contains emphasized text.
        this.firstParagraph = document.createElement('p');
        this.warningText = document.createElement('strong');
        this.warningText.textContent = "Warning: deleting this object will remove all data for the selected object. Consider exporting the object first to create a backup if you do not want to lose any data. This data cannot be recovered once deleted.";
        this.firstParagraph.appendChild(this.warningText);

        // Delete button.
        this.deleteButton = document.createElement('button');
        this.deleteButton.textContent = "Delete";
        this.deleteButton.type = 'button';
        this.deleteButton.classList.add('delete');
        this.deleteButton.onclick = () => this.handleDeleteButtonClick();

        // Close button.
        this.closeButton = document.createElement('button');
        this.closeButton.textContent = "Close";
        this.closeButton.type = 'button';
        this.closeButton.classList.add('close');
        this.closeButton.onclick = () => this.handleCloseButtonClick();

        // Assemble dialog content.
        this.dialogContent.appendChild(this.heading);
        this.dialogContent.appendChild(this.firstParagraph);
        this.dialogContent.appendChild(this.deleteButton);
        this.dialogContent.appendChild(this.closeButton);

        this.appendChild(this.dialogContent);        
    }

    /**
     * Called when the element is connected to the DOM.
     * Registers an event listener for "homebrewDeleteButtonClicked".
     */
    connectedCallback() {
        this._updateHandler = (event) => this.showDialog(event);
        document.addEventListener("homebrewDeleteButtonClicked", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes the event listener.
     */
    disconnectedCallback() {
        document.removeEventListener("homebrewDeleteButtonClicked", this._updateHandler);
    }

    /**
     * Opens the dialog.
     * @param {CustomEvent} event Custom event containing information about the selected homebrew object.
     */
    showDialog(event) {

        // Set the PC ID here to use on confirmation.
        this.homebrewId = event.detail.homebrewId;

        this.showModal();
    }
  
    /**
     * Handles reset button clicks.
     * Simply remove the homebrew object from the bank, close the dialog, and reload the UI.
     */
    handleDeleteButtonClick() {

        globals.homebrewBank.removeHomebrewFromBank(this.homebrewId);
        globals.homebrewBank.save();

        this.close();

        document.dispatchEvent(new Event("homebrewDeleted"));
    }
  
    /**
     * Closes the dialog.
     */
    handleCloseButtonClick() {
        this.close();
    }
}

customElements.define('homebrew-object-delete-dialog', HomebrewDeleteDialog, { extends: 'dialog' });