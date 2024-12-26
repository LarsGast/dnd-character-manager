import { getPlayerCharacterProperty, setPlayerCharacterProperty } from "../../../local-storage-util.js";

/**
 * Initialize the race select element.
 */
export const initRace = function() {

    const select = document.getElementById("race_s");

    select.value = getPlayerCharacterProperty("race");
    select.onchange = function() {
        setPlayerCharacterProperty("race", this.value);
    }
}