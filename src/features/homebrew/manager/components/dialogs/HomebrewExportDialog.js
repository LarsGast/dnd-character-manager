import { globals } from "../../../load-globals.js";

/**
 * Custom HTML element for displaying the Homebrew Export Dialog.
 * Extends HTMLDialogElement.
 *
 * The dialog warns the user about data loss, upon confirmation exports the selected homebrew object.
 */
export class HomebrewExportDialog extends HTMLDialogElement {
    
    constructor() {
        super();

        // Container div for styling the content of the dialog.
        this.dialogContent = document.createElement('div');
        this.dialogContent.classList.add("dialog-content");

        // Create a heading for the dialog.
        this.heading = document.createElement('h2');
        this.heading.textContent = "Export Custom Object";

        // Create paragraphs explaining the export process.
        this.firstParagraph = document.createElement('p');
        this.firstParagraph.textContent = "Use this window to download all information regarding the currently selected homebrew object. You can use this feature to save backups, move homebrew objects between devices, and more.";
        this.secondParagraph = document.createElement('p');
        this.secondParagraph.textContent = "Use the Import button to import the information of the homebrew object using the resulting JSON file from this export.";

        // Create a wrapper for the export button and preview label.
        this.exportButtonAndLabel = document.createElement('div');

        // Create the export (download) button.
        this.exportButton = document.createElement('button');
        this.exportButton.textContent = "Download";
        this.exportButton.type = 'button';
        this.exportButton.classList.add('download');
        this.exportButton.onclick = () => this.handleExportButtonClick();

        // Create a label for the preview section.
        this.previewLabel = document.createElement('label');
        this.previewLabel.textContent = "Preview";
        this.previewLabel.classList.add("export-preview");

        // Create a textarea to display the JSON export; editing is disabled.
        this.previewTextarea = document.createElement('textarea');
        this.previewTextarea.disabled = true;

        // Create a close button for the dialog.
        this.closeButton = document.createElement('button');
        this.closeButton.textContent = "Close";
        this.closeButton.type = 'button';
        this.closeButton.classList.add('close');
        this.closeButton.onclick = () => this.handleCloseButtonClick();

        // Append the export button and label to their container.
        this.exportButtonAndLabel.appendChild(this.exportButton);
        this.exportButtonAndLabel.appendChild(this.previewLabel);

        // Assemble dialog content.
        this.dialogContent.appendChild(this.heading);
        this.dialogContent.appendChild(this.firstParagraph);
        this.dialogContent.appendChild(this.secondParagraph);
        this.dialogContent.appendChild(this.exportButtonAndLabel);
        this.dialogContent.appendChild(this.previewTextarea);
        this.dialogContent.appendChild(this.closeButton);

        // Append the content to the dialog.
        this.appendChild(this.dialogContent);  

    }

    /**
     * Called when the element is connected to the DOM.
     * Registers an event listener for "homebrewExportButtonClicked".
     */
    connectedCallback() {
        this._updateHandler = (event) => this.showDialog(event);
        document.addEventListener("homebrewExportButtonClicked", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes the event listener.
     */
    disconnectedCallback() {
        document.removeEventListener("homebrewExportButtonClicked", this._updateHandler);
    }

    /**
     * Opens the dialog.
     * @param {CustomEvent} event Custom event containing information about the selected homebrew object.
     */
    showDialog(event) {

        this.homebrewBankEntry = globals.homebrewBank.getHomebrewBankEntryByIndex(event.detail.homebrewId);
        
        // Display the selected homebrew object as formatted JSON.
        this.previewTextarea.value = JSON.stringify(this.homebrewBankEntry, null, 2);

        this.showModal();
    }
  
    /**
     * Handles the export button click by creating a downloadable JSON file.
     */
    handleExportButtonClick() {

        // Create a Blob from the homebrew JSON data.
        const blob = new Blob(
            [JSON.stringify(this.homebrewBankEntry, null, 2)],
            { type: 'application/json' }
        );
        const url = URL.createObjectURL(blob);

        // You cannot provide a file as download with a <button> element alone, you need an <a> element.
        // That's why we create an anchor tag and trigger a click here.
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.homebrewBankEntry.homebrewObject.name}.json`;
        a.click();

        URL.revokeObjectURL(url);

        this.close();
    }

    /**
     * Closes the dialog.
     */
    handleCloseButtonClick() {
        this.close();
    }
}

customElements.define('homebrew-object-export-dialog', HomebrewExportDialog, { extends: 'dialog' });