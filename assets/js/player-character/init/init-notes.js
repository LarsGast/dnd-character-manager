import { getPlayerCharacterProperty, setPlayerCharacterProperty } from "../../local-storage-util.js";

/**
 * Initialize notes section.
 */
export const initNotes = function() {
    const textArea = document.getElementById('notes');

    textArea.value = getPlayerCharacterProperty("notes") ?? '';
    textArea.onchange = function() {
        setPlayerCharacterProperty("notes", this.value);
    };
}