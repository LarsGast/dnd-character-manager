import { getPlayerCharacterProperty } from "../../local-storage-util.js";
import { ApiCategory, getApiResultsAsync } from "../api.js";

/**
 * Update the subrace features section based on the current subrace.
 * @returns 
 */
export const updateSubraceFeaturesSection = async function() {

    const subRaceIndex = getPlayerCharacterProperty("subrace");
    const section = document.getElementById('subrace-features');

    // If the user has not picked a subrace yet, or there is no available subrace to pick, there is nothing to set.
    if (!subRaceIndex) {
        section.style.display = "none";
        return;
    }
    
    section.style.display = "block";

    const subrace = await getApiResultsAsync(ApiCategory.Subraces, subRaceIndex);

    setSubraceName(subrace);
    setDescription(subrace);
    setAbilityBonuses(subrace);
    setTraits(subrace);
}

/**
 * Sets the name of the subrace.
 * @param {JSON} subrace Full subrace object as per the SRD API.
 */
const setSubraceName = function(subrace) {
    const p = document.getElementById("subrace_name");

    p.textContent = subrace.name;
}

/**
 * Sets the description of the subrace.
 * @param {JSON} subrace Full subrace object as per the SRD API.
 */
const setDescription = function(subrace) {
    const p = document.getElementById("subrace_description");

    p.textContent = subrace.desc;
}

/**
 * Sets the ability bonuses of the subrace.
 * @param {JSON} subrace Full subrace object as per the SRD API.
 */
const setAbilityBonuses = function(subrace) {
    const ul = document.getElementById("subrace_ability_bonuses");
    ul.replaceChildren();

    for (const abilityBonus of subrace.ability_bonuses) {
        const li = document.createElement('li');

        li.textContent = `${abilityBonus.ability_score.name} + ${abilityBonus.bonus}`;

        ul.appendChild(li);
    }
}

/**
 * Sets the traits of the subrace.
 * @param {JSON} subrace Full subrace object as per the SRD API.
 */
const setTraits = async function(subrace) {
    const div = document.getElementById("subrace_traits");
    div.replaceChildren();

    for (const traitInfo of subrace.racial_traits) {
        const trait = await getApiResultsAsync(ApiCategory.Traits, traitInfo.index);
        div.appendChild(getSubraceTraitHeading(trait));
        div.appendChild(getSubraceTraitDescription(trait));
    }
}

/**
 * Gets the heading of the given trait.
 * @param {JSON} trait Full trait object as per the SRD API.
 * @returns {HTMLHeadingElement}
 */
const getSubraceTraitHeading = function(trait) {
    const heading = document.createElement('h4');

    heading.textContent = trait.name;

    return heading;
}

/**
 * Gets the description of the given trait.
 * @param {JSON} trait Full trait object as per the SRD API.
 * @returns {HTMLParagraphElement}
 */
const getSubraceTraitDescription = function(trait) {
    const p = document.createElement('p');

    p.textContent = trait.desc;

    return p;
}