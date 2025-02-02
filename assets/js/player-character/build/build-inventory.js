import { getAllMartialMeleeWeaponsAsync, getAllMartialRangedWeaponsAsync, getAllSimpleMeleeWeaponsAsync, getAllSimpleRangedWeaponsAsync } from "../api.js";
import { getEmptyOption } from "../util.js";

/**
 * Build the inventory section.
 */
export const buildInventory = async function() {
    await buildWeaponSelect();
}

/**
 * Build the weapons part of the inventory section.
 * Add all the weapons to the dropdown so the user can pick any supported weapon.
 */
const buildWeaponSelect = async function() {
    const select = document.getElementById('weapon-select');

    select.appendChild(getEmptyOption());
    select.appendChild(getWeaponOptionGroup("Simple Melee", await getAllSimpleMeleeWeaponsAsync()));
    select.appendChild(getWeaponOptionGroup("Martial Melee", await getAllMartialMeleeWeaponsAsync()));
    select.appendChild(getWeaponOptionGroup("Simple Ranged", await getAllSimpleRangedWeaponsAsync()));
    select.appendChild(getWeaponOptionGroup("Martial Ranged", await getAllMartialRangedWeaponsAsync()));
}

/**
 * Get a single option group to divide the different weapon type.
 * @param {string} optgroupLabel Name of this group.
 * @param {object[]} weapons Full weapon objects.
 * @returns 
 */
const getWeaponOptionGroup = function(optgroupLabel, weapons) {
    const optgroup = document.createElement('optgroup');

    optgroup.label = optgroupLabel;

    weapons.forEach(weapon => {
        const option = document.createElement('option');

        // Add the index as the value so we can find it later.
        option.value = weapon.index;
        option.textContent = weapon.name;

        optgroup.appendChild(option);
    });

    return optgroup;
}