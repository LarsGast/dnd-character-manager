import { initAbilityScores } from "./init-ability-scores.js";
import { initEquipmentProficiencies } from "./init-equipment-proficiencies.js";
import { initMainProperties } from "./init-main-properties.js";
import { initNotes } from "./init-notes.js";
import { initSkills } from "./init-skills.js";

/**
 * Initialize all elements on the PC builder page.
 */
export const initPage = function() {
    initMainProperties();
    initAbilityScores();
    initSkills();
    initEquipmentProficiencies()
    initNotes();
}