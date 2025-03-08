import { globalPlayerCharacter, PlayerCharacter } from "../objects/PlayerCharacter.js";
import { updateCharacter } from "../update-character.js";

/**
 * Initialize all export and import functionality.
 */
export const initExportImportButtons = function() {
    initResetFunctionality();
    initExportFunctionality();
    initImportFunctionality();
}

/**
 * Initialize reset functionality.
 */
const initResetFunctionality = function() {

    const dialog = document.getElementById('reset-dialog');

    initResetDialogOpenButton(dialog);
    initDialogCloseButton(dialog);
    initResetButton(dialog);
}

/**
 * Initialize export button functionality.
 */
const initExportFunctionality = function() {

    const dialog = document.getElementById('export-dialog');

    initExportDialogOpenButton(dialog);
    initDialogCloseButton(dialog);
    initExportDownloadButton(dialog);
}

/**
 * Initialize import button functionality.
 */
const initImportFunctionality = function() {

    const dialog = document.getElementById('import-dialog');

    initImportDialogOpenButton(dialog);
    initDialogCloseButton(dialog);
    initLoadFileForImportButton(dialog);
    initImportButton(dialog);
}

/**
 * Initialize the dialog close button.
 * @param {HTMLDialogElement} dialog 
 */
const initDialogCloseButton = function(dialog) {
    const closeButton = dialog.querySelector('.close');

    closeButton.onclick = () => {
        dialog.close();
    }
}

/**
 * Initialize the reset dialog open button.
 * @param {HTMLDialogElement} dialog 
 */
const initResetDialogOpenButton = function(dialog) {
    const button = document.getElementById("reset-button");

    button.onclick = () => {
        dialog.showModal();
    }
}

/**
 * Initialize the reset PC button.
 * @param {HTMLDialogElement} dialog 
 */
const initResetButton = function(dialog) {
    const closeButton = dialog.querySelector('.reset');

    closeButton.onclick = () => {
        PlayerCharacter.getDefault().save();
        window.location.reload();
    }
}

/**
 * Initialize the export dialog open button.
 * @param {HTMLDialogElement} dialog 
 */
const initExportDialogOpenButton = function(dialog) {
    const button = document.getElementById("export-button");

    button.onclick = () => {
        fillExportTextarea(dialog);
        dialog.showModal();
    }
}

/**
 * Initialize the import dialog open button.
 * @param {HTMLDialogElement} dialog 
 */
const initImportDialogOpenButton = function(dialog) {
    const button = document.getElementById("import-button");

    button.onclick = () => {
        dialog.showModal();
    }
}

/**
 * Initialize the download button in the export dialog.
 * @param {HTMLDialogElement} dialog 
 */
const initExportDownloadButton = function(dialog) {
    const downloadButton = dialog.querySelector('.download');

    downloadButton.onclick = async () => {

        // Create the blob and url for download.
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

        // Release memory to prevent potential memory leaks.
        URL.revokeObjectURL(url);
    }
}

/**
 * Fill the textarea of the export PC dialog with a stringified JSON of the PC information.
 * @param {HTMLDialogElement} dialog 
 */
const fillExportTextarea = function(dialog) {
    const textArea = dialog.querySelector('textarea');

    textArea.value = JSON.stringify(globalPlayerCharacter, null, 2);
}

/**
 * Initialize the Load File button for importing JSON files.
 * @param {HTMLDialogElement} dialog 
 */
const initLoadFileForImportButton = function(dialog) {
    const loadFileInput = dialog.querySelector('.load');

    loadFileInput.onchange = (e) => {
        const reader = new FileReader();

        reader.readAsText(e.target.files[0]);
        reader.onload = (readerEvent) => {
            const textArea = dialog.querySelector('textarea');
            const importButton = dialog.querySelector('.import');

            try {
                var playerCharacter = JSON.parse(readerEvent.target.result);
                textArea.value = JSON.stringify(playerCharacter, null, 2);
                importButton.removeAttribute("disabled");
            }
            catch {
                textArea.value = "Could not load file. Make sure you selected the .json file provided by the export.";
                importButton.setAttribute("disabled", "disabled");
            }
        }
    }
}

/**
 * Initialize the import button.
 * This sets the PC as described and reloads the page to commit changes.
 * @param {HTMLDialogElement} dialog 
 */
const initImportButton = function(dialog) {
    const importButton = dialog.querySelector('.import');

    importButton.onclick = () => {
        const textArea = dialog.querySelector('textarea');

        const playerCharacter = new PlayerCharacter(JSON.parse(textArea.value));

        // Update the character to the current version.
        updateCharacter(playerCharacter);

        playerCharacter.save();
        window.location.reload();
    }
}