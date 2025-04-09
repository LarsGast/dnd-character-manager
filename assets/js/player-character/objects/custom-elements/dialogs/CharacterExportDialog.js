import { globalPlayerCharacter } from "../../PlayerCharacter.js";

/**
 * Custom HTML element for displaying the Character Export Dialog.
 * Extends HTMLDialogElement.
 *
 * The dialog shows PC data in JSON format for preview and download.
 * It listens for the "characterExportButtonClicked" event to open the dialog.
 */
export class CharacterExportDialog extends HTMLDialogElement {
    
    constructor() {
        super();

        // Container div for styling the content of the dialog.
        this.dialogContent = document.createElement('div');
        this.dialogContent.classList.add("dialog-content");

        // Create a heading for the dialog.
        this.heading = document.createElement('h2');
        this.heading.textContent = "Export PC";

        // Create paragraphs explaining the export process.
        this.firstParagraph = document.createElement('p');
        this.firstParagraph.textContent = "Use this window to download all information needed to build the PC Builder page. You can use this feature to save backups, move characters between devices, and more.";
        this.secondParagraph = document.createElement('p');
        this.secondParagraph.textContent = "Use the Import button to import the information into the page using the resulting JSON file from this export.";

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
     * Registers an event listener for "characterExportButtonClicked".
     */
    connectedCallback() {
        this._updateHandler = () => this.showDialog();
        document.addEventListener("characterExportButtonClicked", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes the event listener.
     */
    disconnectedCallback() {
        document.removeEventListener("characterExportButtonClicked", this._updateHandler);
    }

    /**
     * Opens the dialog and populates the preview textarea with the character data as JSON.
     */
    showDialog() {
        this.showModal();

        // Display the current global PC as formatted JSON.
        this.previewTextarea.value = JSON.stringify(globalPlayerCharacter, null, 2);
    }
  
    /**
     * Handles the export button click by creating a downloadable JSON file.
     */
    handleExportButtonClick() {

        // Create a Blob from the character JSON data.
        const blob = new Blob(
            [JSON.stringify(globalPlayerCharacter, null, 2)],
            { type: 'application/json' }
        );
        const url = URL.createObjectURL(blob);

        // You cannot provide a file as download with a <button> element alone, you need an <a> element.
        // That's why we create an anchor tag and trigger a click here.
        const a = document.createElement('a');
        a.href = url;
        a.download = `${globalPlayerCharacter.name}.json`;
        a.click();

        URL.revokeObjectURL(url);
    }
  
    /**
     * Closes the dialog.
     */
    handleCloseButtonClick() {
        this.close();
    }
}

customElements.define('character-export-dialog', CharacterExportDialog, { extends: 'dialog' });