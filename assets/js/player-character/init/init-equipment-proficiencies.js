import { isProficientInArmor, isProficientInWeapon, saveNewArmorProficiencies, saveNewWeaponProficiencies } from "../util.js";

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
    const weaponProficiencyLabel = weaponProficiencyItem.querySelector('label'); 

    weaponProficiencyCheckbox.checked = isProficientInWeapon(weaponProficiencyLabel.textContent);
    weaponProficiencyCheckbox.onchange = function () {
        saveNewWeaponProficiencies(weaponProficiencyLabel.textContent, this.checked);
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
    const armorProficiencyLabel = armorProficiencyItem.querySelector('label'); 

    armorProficiencyCheckbox.checked = isProficientInArmor(armorProficiencyLabel.textContent);
    armorProficiencyCheckbox.onchange = function () {
        saveNewArmorProficiencies(armorProficiencyLabel.textContent, this.checked);
    };
}