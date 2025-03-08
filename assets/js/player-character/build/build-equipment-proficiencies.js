import { EquipmentCategoryIndex } from "../api.js";
import { ApiObjectInfo } from "../objects/ApiObjectInfo.js";
import { EquipmentCategory } from "../objects/EquipmentCategory.js";
import { getProficiencyCheckbox } from "../util.js";

/**
 * Buil the equipment proficiencies lists.
 */
export const buildEquipmentProficiencies = async function() {
    await fillWeaponProficienciesList();
    await fillArmorProficienciesList();
}

/**
 * Fill the weapon proficiencies container.
 */
const fillWeaponProficienciesList = async function() {
    const div = document.getElementById('weapon-proficiencies-container');

    div.appendChild(await getProficienciesContainer("Simple Melee", EquipmentCategoryIndex.SimpleMeleeWeapons));
    div.appendChild(await getProficienciesContainer("Martial Melee", EquipmentCategoryIndex.MartialMeleeWeapons));
    div.appendChild(await getProficienciesContainer("Simple Ranged", EquipmentCategoryIndex.SimpleRangedWeapons));
    div.appendChild(await getProficienciesContainer("Martial Ranged", EquipmentCategoryIndex.MartialRangedWeapons));
}

/**
 * Fill the armor proficiencies container.
 */
const fillArmorProficienciesList = async function() {
    const div = document.getElementById('armor-proficiencies-container');

    div.appendChild(await getProficienciesContainer("Light", EquipmentCategoryIndex.LightArmor));
    div.appendChild(await getProficienciesContainer("Medium", EquipmentCategoryIndex.MediumArmor));
    div.appendChild(await getProficienciesContainer("Heavy", EquipmentCategoryIndex.HeavyArmor));
    div.appendChild(await getProficienciesContainer("Shields", EquipmentCategoryIndex.Shields));
}

/**
 * Get a single proficiencies container div for displaying a group of proficiencies.
 * @param {string} title To display above the list as an h4 element.
 * @param {EquipmentCategoryIndex} equipmentCategoryIndex The index of the category, for getting data from the API.
 * @returns {Promise<HTMLDivElement>}
 */
const getProficienciesContainer = async function(title, equipmentCategoryIndex) {
    const div = document.createElement('div');

    div.appendChild(getProficienciesContainerHeader(title));
    div.appendChild(await getProficienciesContainerBody(equipmentCategoryIndex));

    return div
}

/**
 * Get the header for the proficiencies container.
 * @param {string} title 
 * @returns {HTMLHeadingElement}
 */
const getProficienciesContainerHeader = function(title) {
    const h4 = document.createElement('h4');

    h4.textContent = title;

    return h4;
}

/**
 * Gets the body of a proficiencies container.
 * @param {EquipmentCategoryIndex} equipmentCategoryIndex The index of the category, for getting data from the API.
 * @returns {Promise<HTMLUListElement>}
 */
const getProficienciesContainerBody = async function(equipmentCategoryIndex) {
    const ul = document.createElement('ul');

    const results = await EquipmentCategory.getAsync(equipmentCategoryIndex);

    ul.classList.add('no-style-list');
    ul.classList.add('proficiencies-list');
    ul.classList.add(getNumberOfColumnsClassName(results.equipment.length));

    results.equipment.forEach(equipment => {
        ul.appendChild(getProficiencyItem(equipment));
    })

    return ul;
}

/**
 * Get the appropriate "number of columns" class name.
 * @param {number} listLength 
 * @returns {string}
 */
const getNumberOfColumnsClassName = function(listLength) {
    if (listLength >= 9) {
        return 'three-columns-list';
    }

    if (listLength >= 4) {
        return 'two-columns-list';
    }
}

/**
 * Get a single li item to indicate proficiency.
 * @param {ApiObjectInfo} equipment Equipment information object from the SRD API.
 * @returns {HTMLLIElement}
 */
const getProficiencyItem = function(equipment) {
    const li = document.createElement('li');

    li.appendChild(getProficiencyCheckbox(equipment.index));
    li.appendChild(getEquipmentLabel(equipment.name, equipment.index));

    return li;
}

/**
 * Get the label element that belongs to the given equipment.
 * @param {string} equipmentName 
 * @param {string} checkboxIndex 
 * @returns {HTMLLabelElement}
 */
const getEquipmentLabel = function(equipmentName, checkboxIndex) {
    const label = document.createElement('label');

    label.textContent = equipmentName;
    label.htmlFor = getProficiencyCheckbox(checkboxIndex).id;

    return label;
}