import { getElementWithTextContent } from "../../../util.js";
import { HomebrewImportButton } from "./HomebrewImportButton.js";
import { HomebrewTable } from "./HomebrewTable.js";
import { HomebrewTypeSelect } from "./HomebrewTypeSelect.js";
import { NewHomebrewButton } from "./NewHomebrewButton.js";

/**
 * Custom HTML element for displaying the saved homebrew objects in storage.
 * Extends HTMLDialogElement.
 *
 * The dialog shows the user all their homebrew objects (active and inactive) and lets them switch, export, import, and delete.
 */
export class ManageHomebrewDialog extends HTMLDialogElement {
    
    constructor() {
        super();
        
        // Container div for styling the content of the dialog.
        this.dialogContent = document.createElement('div');
        this.dialogContent.classList.add("dialog-content", "manage-objects-dialog-content");

        // Create a heading for the dialog.
        this.heading = getElementWithTextContent("h2", "Manage Homebrew Objects");

        // User friendly description.
        this.firstParagraph = getElementWithTextContent("p", "Since this page only has access to the SRD, the class, subclass, race, background, or other content that you might want to add to your characters might not be available. Thats why, in this menu, you can create your own objects as homebrew.");
        
        // New homebrew button.
        this.homebrewTypeSelect = new HomebrewTypeSelect();
        this.createNewHomebrew = new NewHomebrewButton();

        // Import button.
        this.importButton = new HomebrewImportButton();

        this.homebrewTableContainer = document.createElement('div');
        this.homebrewTableContainer.className = "table-container";
        this.homebrewTableContainer.appendChild(new HomebrewTable());

        // Close button.
        this.closeButton = document.createElement('button');
        this.closeButton.textContent = "Close";
        this.closeButton.type = 'button';
        this.closeButton.classList.add('close');
        this.closeButton.onclick = () => this.handleCloseButtonClick();

        this.dialogContent.appendChild(this.heading);
        this.dialogContent.appendChild(this.firstParagraph);
        this.dialogContent.appendChild(this.homebrewTypeSelect);
        this.dialogContent.appendChild(this.createNewHomebrew);
        this.dialogContent.appendChild(this.importButton);
        this.dialogContent.appendChild(this.homebrewTableContainer);
        this.dialogContent.appendChild(this.closeButton);

        this.appendChild(this.dialogContent);
    }

    /**
     * Called when the element is connected to the DOM.
     * Listens for the "manageHomebrewButtonClicked" event to show the dialog.
     */
    connectedCallback() {
        this._updateHandler = () => this.showDialog();
        document.addEventListener("manageHomebrewButtonClicked", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes the event listener.
     */
    disconnectedCallback() {
        document.removeEventListener("manageHomebrewButtonClicked", this._updateHandler);
    }

    /**
     * Opens the dialog and fires off an event to let the page know it is opened.
     */
    showDialog() {
        this.showModal();

        document.dispatchEvent(new Event('manageHomebrewDialogOpened'));
    }
  
    /**
     * Closes the dialog.
     */
    handleCloseButtonClick() {
        this.close();
    }
}

customElements.define('manage-homebrew-dialog', ManageHomebrewDialog, { extends: 'dialog' });