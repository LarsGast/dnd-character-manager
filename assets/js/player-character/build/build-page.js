import { buildEquipmentProficiencies } from "./build-equipment-proficiencies.js";
import { buildInventory } from "./build-inventory.js";
import { fillGenericInfoElements } from "./generic-info.js";
import { fillSkillsList } from "./skills.js";

/**
 * Build the page.
 * This means filling all elements with necessary data and such.
 */
export const buildPage = async function() {
    await fillGenericInfoElements();
    fillSkillsList();
    await buildEquipmentProficiencies();
    await buildInventory();
}