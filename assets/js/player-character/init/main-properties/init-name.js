import { globalPlayerCharacter } from "../../objects/PlayerCharacter.js";

/**
 * Initialize the name input field of the PC.
 */
export const initName = function() {
    const nameInput = document.getElementById('name_i');

    nameInput.value = globalPlayerCharacter.name;
    nameInput.onchange = function() {
        globalPlayerCharacter.setProperty("name", this.value);
    };
}