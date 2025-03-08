import { globalPlayerCharacter } from "../../objects/PlayerCharacter.js";

/**
 * Initialize the alignment select element.
 */
export const initAlignment = function() {

    const select = document.getElementById("alignment_s");

    select.value = globalPlayerCharacter.alignment;
    select.onchange = function() {
        globalPlayerCharacter.setProperty("alignment", this.value);
    }
}