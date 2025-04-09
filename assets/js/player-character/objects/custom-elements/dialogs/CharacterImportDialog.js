import { PlayerCharacter } from "../../PlayerCharacter.js";

/**
 * Custom HTML element for displaying the Character Import Dialog.
 * Extends HTMLDialogElement.
 *
 * The dialog allows the user to import PC data from a JSON file.
 * The file's contents can be previewed, and clicking the import button replaces the current PC data and reloads the page.
 */
export class CharacterImportDialog extends HTMLDialogElement {
    
    constructor() {
        super();

        // Container for dialog content for styling.
        this.dialogContent = document.createElement('div');
        this.dialogContent.classList.add("dialog-content");

        // Create dialog heading.
        this.heading = document.createElement('h2');
        this.heading.textContent = "Import PC";

        // Create description paragraphs.
        this.firstParagraph = document.createElement('p');
        this.firstParagraph.textContent = "Use this window to import all information needed to build the PC Builder page. Only the data provided by an export should be used while importing. Using anything else may result in loss of data. Create a backup of the current data by exporting it before importing new data to prevent overwriting existing data.";
        this.secondParagraph = document.createElement('p');
        this.secondParagraph.textContent = "Select a JSON file below, then press the Import button to import the data.";

        // Container for import button, file input, and preview label.
        this.importButtonAndLabel = document.createElement('div');

        // Import button.
        this.importButton = document.createElement('button');
        this.importButton.textContent = "Import";
        this.importButton.type = 'button';
        this.importButton.classList.add('import');
        this.importButton.disabled = true;
        this.importButton.onclick = () => this.handleImportButtonClick();

        // File input for selecting a JSON file.
        this.fileInput = document.createElement('input');
        this.fileInput.type = "file";
        this.fileInput.classList.add("load");
        this.fileInput.onchange = (event) => this.handleFileInputChange(event);

        // Preview label.
        this.previewLabel = document.createElement('label');
        this.previewLabel.textContent = "Preview";
        this.previewLabel.classList.add("import-preview");

        // Preview textarea to display JSON data; editing is disabled.
        this.previewTextarea = document.createElement('textarea');
        this.previewTextarea.disabled = true;

        // Close button for the dialog.
        this.closeButton = document.createElement('button');
        this.closeButton.textContent = "Close";
        this.closeButton.type = 'button';
        this.closeButton.classList.add('close');
        this.closeButton.onclick = () => this.handleCloseButtonClick();

        // Assemble button, file input, and preview label.
        this.importButtonAndLabel.appendChild(this.importButton);
        this.importButtonAndLabel.appendChild(this.fileInput);
        this.importButtonAndLabel.appendChild(this.previewLabel);

        // Add all elements to the dialog content.
        this.dialogContent.appendChild(this.heading);
        this.dialogContent.appendChild(this.firstParagraph);
        this.dialogContent.appendChild(this.secondParagraph);
        this.dialogContent.appendChild(this.importButtonAndLabel);
        this.dialogContent.appendChild(this.previewTextarea);
        this.dialogContent.appendChild(this.closeButton);

        // Append the content to the dialog.
        this.appendChild(this.dialogContent);        
    }

    /**
     * Called when the element is connected to the DOM.
     * Listens for the "characterImportButtonClicked" event to show the dialog.
     */
    connectedCallback() {
        this._updateHandler = () => this.showDialog();
        document.addEventListener("characterImportButtonClicked", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes the event listener.
     */
    disconnectedCallback() {
        document.removeEventListener("characterImportButtonClicked", this._updateHandler);
    }

    /**
     * Displays the dialog and resets any previous file selections or preview.
     */
    showDialog() {
        this.showModal();

        // Clear previous input and disable the import button.
        this.fileInput.value = null;
        this.previewTextarea.value = null;
        this.importButton.disabled = true;
    }
  
    /**
     * Handles file input change events.
     * Reads the selected file as JSON, displays a preview, and enables the import button if valid.
     * @param {Event} event The file input change event.
     */
    handleFileInputChange(event) {
        const reader = new FileReader();

        reader.readAsText(event.target.files[0]);
        reader.onload = (readerEvent) => {
            try {

                // Try parsing the JSON data.
                var playerCharacter = JSON.parse(readerEvent.target.result);

                // Display the JSON preview.
                this.previewTextarea.value = JSON.stringify(playerCharacter, null, 2);
                this.importButton.removeAttribute("disabled");
            }
            catch {
                // On parse error, inform the user.
                this.previewTextarea.value = "Could not load file. Make sure you selected the .json file provided by the export.";
                this.importButton.setAttribute("disabled", "disabled");
            }
        }
    }
  
    /**
     * Handles the import button click. Replaces the current PC data with the imported data,
     * saves it, and reloads the page to update all elements.
     */
    handleImportButtonClick() {

        // Create a new PlayerCharacter from the JSON data.
        const playerCharacter = new PlayerCharacter(JSON.parse(this.previewTextarea.value));
        playerCharacter.save();

        // Reload the page to update all data.
        window.location.reload();
    }
  
    /**
     * Closes the dialog.
     */
    handleCloseButtonClick() {
        this.close();
    }
}

customElements.define('character-import-dialog', CharacterImportDialog, { extends: 'dialog' });