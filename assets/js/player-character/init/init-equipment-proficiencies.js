import { isProficientInArmor, isProficientInWeapon, saveNewArmorProficiencies, saveNewWeaponProficiencies } from "../util.js";
import { updateAllWeaponModifiers } from "./inventory/init-weapons.js";

/**
 * Initialize all elements for the equipment proficiencies on the PC builder page.
 */
export const initEquipmentProficiencies = function() {
    initWeaponProficiencies();
    initArmorProficiencies();
}

/**
 * Initialize the weapon proficiencies.
 */
const initWeaponProficiencies = function() {
    const weaponProficienciesList = document.getElementById('weapon-proficiencies-container');
    const weaponProficiencyItems = Array.from(weaponProficienciesList.querySelectorAll('li'));
    weaponProficiencyItems.forEach(weaponProficiencyItem => {
        initWeaponProficiencyListItem(weaponProficiencyItem);
    });
}

/**
 * Initialize a single li weapon proficiency element.
 * @param {HTMLLIElement} weaponProficiencyItem 
 */
const initWeaponProficiencyListItem = function(weaponProficiencyItem) {

    const weaponProficiencyCheckbox = weaponProficiencyItem.querySelector('input');
    const weaponIndex = weaponProficiencyCheckbox.id.replace("_p", "");

    weaponProficiencyCheckbox.checked = isProficientInWeapon(weaponIndex);
    weaponProficiencyCheckbox.onchange = function () {
        saveNewWeaponProficiencies(weaponIndex, this.checked);
        updateAllWeaponModifiers();
    };
}

/**
 * Initialize the armor proficiencies.
 */
const initArmorProficiencies = function() {
    const armorProficienciesList = document.getElementById('armor-proficiencies-container');
    const armorProficiencyItems = Array.from(armorProficienciesList.querySelectorAll('li'));
    armorProficiencyItems.forEach(armorProficiencyItem => {
        initArmorProficiencyListItem(armorProficiencyItem);
    });
}

/**
 * Initialize a single li armor proficiency element.
 * @param {HTMLLIElement} armorProficiencyItem 
 */
const initArmorProficiencyListItem = function(armorProficiencyItem) {

    const armorProficiencyCheckbox = armorProficiencyItem.querySelector('input');
    const weaponIndex = armorProficiencyCheckbox.id.replace("_p", "");

    armorProficiencyCheckbox.checked = isProficientInArmor(weaponIndex);
    armorProficiencyCheckbox.onchange = function () {
        saveNewArmorProficiencies(weaponIndex, this.checked);
    };
}