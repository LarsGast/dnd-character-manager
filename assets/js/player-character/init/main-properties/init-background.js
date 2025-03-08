import { globalPlayerCharacter } from "../../objects/PlayerCharacter.js";

/**
 * Initialize the background select element.
 */
export const initBackground = function() {

    const select = document.getElementById("background_s");

    select.value = globalPlayerCharacter.background;
    select.onchange = function() {
        globalPlayerCharacter.setProperty("background", this.value);
    }
}