import { getAllHeavyArmorAsync, getAllLightArmorAsync, getAllMartialMeleeWeaponsAsync, getAllMartialRangedWeaponsAsync, getAllMediumArmorAsync, getAllSimpleMeleeWeaponsAsync, getAllSimpleRangedWeaponsAsync } from "../api.js";
import { getEmptyOption } from "../util.js";

/**
 * Build the inventory section.
 */
export const buildInventory = async function() {
    await buildWeaponSelect();
    await buildArmorSelect();
}

/**
 * Build the weapons part of the inventory section.
 * Add all the weapons to the dropdown so the user can pick any supported weapon.
 */
const buildWeaponSelect = async function() {
    const select = document.getElementById('weapon-select');

    select.appendChild(getEmptyOption());
    select.appendChild(getSelectOptionGroup("Simple Melee", await getAllSimpleMeleeWeaponsAsync()));
    select.appendChild(getSelectOptionGroup("Martial Melee", await getAllMartialMeleeWeaponsAsync()));
    select.appendChild(getSelectOptionGroup("Simple Ranged", await getAllSimpleRangedWeaponsAsync()));
    select.appendChild(getSelectOptionGroup("Martial Ranged", await getAllMartialRangedWeaponsAsync()));
}

/**
 * Build the armor part of the inventory section.
 * Add all the armor to the dropdown so the user can pick any supported armor.
 */
const buildArmorSelect = async function() {
    const select = document.getElementById('armor-select');

    select.appendChild(getEmptyOption());
    select.appendChild(getSelectOptionGroup("Light", await getAllLightArmorAsync()));
    select.appendChild(getSelectOptionGroup("Medium", await getAllMediumArmorAsync()));
    select.appendChild(getSelectOptionGroup("Heavy", await getAllHeavyArmorAsync()));
}

/**
 * Get a single option group to divide the different equipment types.
 * @param {string} optgroupLabel Name of this group.
 * @param {object[]} equipmentList Full equipment objects.
 * @returns 
 */
const getSelectOptionGroup = function(optgroupLabel, equipmentList) {
    const optgroup = document.createElement('optgroup');

    optgroup.label = optgroupLabel;

    equipmentList.forEach(equipment => {
        const option = document.createElement('option');

        // Add the index as the value so we can find it later.
        option.value = equipment.index;
        option.textContent = equipment.name;

        optgroup.appendChild(option);
    });

    return optgroup;
}