import { globalPlayerCharacter } from "../objects/PlayerCharacter.js";
import { Subrace } from "../objects/Subrace.js";
import { Trait } from "../objects/Trait.js";

/**
 * Update the subrace features section based on the current subrace.
 * @returns 
 */
export const updateSubraceFeaturesSection = async function() {

    const subRaceIndex = globalPlayerCharacter.subrace;
    const section = document.getElementById('subrace-features');

    // If the user has not picked a subrace yet, or there is no available subrace to pick, there is nothing to set.
    if (!subRaceIndex) {
        section.style.display = "none";
        return;
    }
    
    section.style.display = "block";

    const subrace = await Subrace.getAsync(subRaceIndex);

    setSubraceName(subrace);
    setDescription(subrace);
    setAbilityBonuses(subrace);
    setTraits(subrace);
}

/**
 * Sets the name of the subrace.
 * @param {Subrace} subrace
 */
const setSubraceName = function(subrace) {
    const p = document.getElementById("subrace_name");

    p.textContent = subrace.name;
}

/**
 * Sets the description of the subrace.
 * @param {Subrace} subrace
 */
const setDescription = function(subrace) {
    const p = document.getElementById("subrace_description");

    p.textContent = subrace.desc;
}

/**
 * Sets the ability bonuses of the subrace.
 * @param {Subrace} subrace
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
 * @param {Subrace} subrace
 */
const setTraits = async function(subrace) {
    const div = document.getElementById("subrace_traits");
    div.replaceChildren();

    const allTraits = await subrace.getAllTraitsAsync();

    for (const trait of allTraits) {
        div.appendChild(getSubraceTraitHeading(trait));
        div.appendChild(getSubraceTraitDescription(trait));
    }
}

/**
 * Gets the heading of the given trait.
 * @param {Trait} trait
 * @returns {HTMLHeadingElement}
 */
const getSubraceTraitHeading = function(trait) {
    const heading = document.createElement('h4');

    heading.textContent = trait.name;

    return heading;
}

/**
 * Gets the description of the given trait.
 * @param {Trait} trait
 * @returns {HTMLParagraphElement}
 */
const getSubraceTraitDescription = function(trait) {
    const p = document.createElement('p');

    p.textContent = trait.desc;

    return p;
}