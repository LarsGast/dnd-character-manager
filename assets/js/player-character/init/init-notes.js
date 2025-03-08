import { globalPlayerCharacter } from "../objects/PlayerCharacter.js";

/**
 * Initialize notes section.
 */
export const initNotes = function() {
    const textArea = document.getElementById('notes');

    textArea.value = globalPlayerCharacter.notes;
    textArea.onchange = function() {
        globalPlayerCharacter.setProperty("notes", this.value);
    };
}