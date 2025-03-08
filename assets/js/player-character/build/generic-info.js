import { Alignment } from "../objects/Alignment.js";
import { Background } from "../objects/Background.js";
import { Race } from "../objects/Race.js";
import { getEmptyOption, getSelectOption } from "../util.js";

/**
 * Fill all elements in the generic info section.
 */
export const fillGenericInfoElements = async function() {
    await fillRaceSelect();
    await fillBackgroundSelect();
    await fillAlignmentSelect();
}

/**
 * Fill the race select element.
 */
const fillRaceSelect = async function() {
    const allRaces = await Race.getAllAsync();

    const select = document.getElementById("race_s");

    select.appendChild(getEmptyOption());

    allRaces.results.forEach(race => {
        select.appendChild(getSelectOption(race.name, race.index));
    });
}

/**
 * Fill the background select element.
 */
const fillBackgroundSelect = async function() {
    const allBackgrounds = await Background.getAllAsync();

    const select = document.getElementById("background_s");

    select.appendChild(getEmptyOption());

    allBackgrounds.results.forEach(background => {
        select.appendChild(getSelectOption(background.name, background.index));
    });
}

/**
 * Fill the alignment select element.
 */
const fillAlignmentSelect = async function() {
    const allAlignments = await Alignment.getAllAsync();

    const select = document.getElementById("alignment_s");

    select.appendChild(getEmptyOption());

    allAlignments.results.forEach(alignment => {
        select.appendChild(getSelectOption(alignment.name, alignment.index));
    });
}