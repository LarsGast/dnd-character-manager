import { getPlayerCharacterProperty, setPlayerCharacterProperty } from "../../../local-storage-util.js";

/**
 * Initialize the alignment select element.
 */
export const initAlignment = function() {

    const select = document.getElementById("alignment_s");

    select.value = getPlayerCharacterProperty("alignment");
    select.onchange = function() {
        setPlayerCharacterProperty("alignment", this.value);
    }
}