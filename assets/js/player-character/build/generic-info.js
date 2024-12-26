import { getAllRaceNamesAsync, getAllBackgroundNamesAsync, getAllAlignmentNamesAsync } from "../api.js";
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
    const allRaceNames = await getAllRaceNamesAsync();

    const select = document.getElementById("race_s");

    select.appendChild(getEmptyOption());

    allRaceNames.forEach(raceName => {
        select.appendChild(getSelectOption(raceName));
    });
}

/**
 * Fill the background select element.
 */
const fillBackgroundSelect = async function() {
    const allBackgroundNames = await getAllBackgroundNamesAsync();

    const select = document.getElementById("background_s");

    select.appendChild(getEmptyOption());

    allBackgroundNames.forEach(backgroundName => {
        select.appendChild(getSelectOption(backgroundName));
    });
}

/**
 * Fill the alignment select element.
 */
const fillAlignmentSelect = async function() {
    const allAlignmentNames = await getAllAlignmentNamesAsync();

    const select = document.getElementById("alignment_s");

    select.appendChild(getEmptyOption());

    allAlignmentNames.forEach(backgroundName => {
        select.appendChild(getSelectOption(backgroundName));
    });
}