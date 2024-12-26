import { getPlayerCharacterProperty, setPlayerCharacterProperty } from "../../../local-storage-util.js";

/**
 * Initialize the name input field of the PC.
 */
export const initName = function() {
    const nameInput = document.getElementById('name_i');

    nameInput.value = getPlayerCharacterProperty("name");
    nameInput.onchange = function() {
        setPlayerCharacterProperty("name", this.value);
    };
}