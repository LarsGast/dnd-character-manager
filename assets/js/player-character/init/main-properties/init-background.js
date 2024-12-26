import { getPlayerCharacterProperty, setPlayerCharacterProperty } from "../../../local-storage-util.js";

/**
 * Initialize the background select element.
 */
export const initBackground = function() {

    const select = document.getElementById("background_s");

    select.value = getPlayerCharacterProperty("background");
    select.onchange = function() {
        setPlayerCharacterProperty("background", this.value);
    }
}