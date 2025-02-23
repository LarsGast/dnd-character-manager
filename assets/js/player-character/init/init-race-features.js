import { getPlayerCharacterProperty } from "../../local-storage-util.js";
import { ApiCategory, getApiResultsAsync } from "../api.js";

/**
 * Update the race features section based on the current race.
 * @returns 
 */
export const updateRaceFeaturesSection = async function() {

    const raceIndex = getPlayerCharacterProperty("race");

    // If the user has not picked a race yet, there is nothing to set.
    if (!raceIndex) {
        return;
    }

    const race = await getApiResultsAsync(ApiCategory.Races, raceIndex);

    setRaceName(race);
    setAbilityBonuses(race);
    setSpeed(race);
    setAlignment(race);
    setAge(race);
    setSize(race);
    setLanguages(race);
    await setTraits(race);
}

/**
 * Sets the name of the race.
 * @param {JSON} race Full race object as per the SRD API.
 */
const setRaceName = function(race) {
    const span = document.getElementById("race_name");

    span.textContent = race.name;
}

/**
 * Sets the ability bonuses of the race.
 * @param {JSON} race Full race object as per the SRD API.
 */
const setAbilityBonuses = function(race) {
    const ul = document.getElementById("race_ability_bonuses");
    ul.replaceChildren();

    for (const abilityBonus of race.ability_bonuses) {
        const li = document.createElement('li');

        li.textContent = `${abilityBonus.ability_score.name} + ${abilityBonus.bonus}`;

        ul.appendChild(li);
    }
}

/**
 * Sets the speed of the race.
 * @param {JSON} race Full race object as per the SRD API.
 */
const setSpeed = function(race) {
    const p = document.getElementById("race_speed");

    p.textContent = race.speed;
}

/**
 * Sets the alignement of the race.
 * @param {JSON} race Full race object as per the SRD API.
 */
const setAlignment = function(race) {
    const p = document.getElementById("race_alignment");

    p.textContent = race.alignment;
}

/**
 * Sets the age of the race.
 * @param {JSON} race Full race object as per the SRD API.
 */
const setAge = function(race) {
    const p = document.getElementById("race_age");

    p.textContent = race.age;
}

/**
 * Sets the size of the race.
 * @param {JSON} race Full race object as per the SRD API.
 */
const setSize = function(race) {
    const p = document.getElementById("race_size");

    p.textContent = race.size_description;
}

/**
 * Sets the languages of the race.
 * @param {JSON} race Full race object as per the SRD API.
 */
const setLanguages = function(race) {
    const p = document.getElementById("race_languages");

    p.textContent = race.language_desc;
}

/**
 * Sets the traits of the race.
 * @param {JSON} race Full race object as per the SRD API.
 */
const setTraits = async function(race) {
    const div = document.getElementById("race_traits");
    div.replaceChildren();

    for (const traitInfo of race.traits) {
        const trait = await getApiResultsAsync(ApiCategory.Traits, traitInfo.index);
        div.appendChild(getRaceTraitHeading(trait));
        div.appendChild(getRaceTraitDescription(trait));
    }
}

/**
 * Gets the heading of the given trait.
 * @param {JSON} trait Full trait object as per the SRD API.
 * @returns {HTMLHeadingElement}
 */
const getRaceTraitHeading = function(trait) {
    const heading = document.createElement('h4');

    heading.textContent = trait.name;

    return heading;
}

/**
 * Gets the description of the given trait.
 * @param {JSON} trait Full trait object as per the SRD API.
 * @returns {HTMLParagraphElement}
 */
const getRaceTraitDescription = function(trait) {
    const p = document.createElement('p');

    p.textContent = trait.desc;

    return p;
}