import { getPlayerCharacterProperty, setPlayerCharacterProperty } from "../../../local-storage-util.js";
import { getEquipmentObjectAsync } from "../../api.js";
import { getAbilityScoreModifier } from "../../util.js";

/**
 * Init the armor section of the inventory.
 */
export const initArmor = async function() {
    await initArmorTable();
    initArmorSelect();
    initAddArmorButton();
}

/**
 * Update all armor modifiers at once.
 */
export const updateAllArmorModifiersAsync = async function() {
    const armorTable = document.getElementById('armor-table');
    const armorTableBody = armorTable.querySelector('tbody');

    for (const row of Array.from(armorTableBody.rows)) {
        await updateArmorRow(row);
    }
}

/**
 * Update a single row in the armor table.
 * @param {HTMLTableRowElement} row 
 */
const updateArmorRow = async function(row) {
    await updateEffectiveArmorClassCell(row);
}

/**
 * Save the entire armor inventory table to local storage.
 */
const saveArmorInventory = function() {
    
    const armorTable = document.getElementById('armor-table');
    const armorTableBody = armorTable.querySelector('tbody');

    const armors = Array.from(armorTableBody.rows).map(row => {
        return {
            index: row.dataset.index
        };
    })

    setPlayerCharacterProperty("inventory_armor", armors);
}

/**
 * Initialize the armor inventory table and fill it with the saved armor.
 */
const initArmorTable = async function() {

    const armors = getPlayerCharacterProperty("inventory_armor") || [];
    for (const armor of armors) {
        const armorFromApi = await getEquipmentObjectAsync(armor.index);
        addArmorRow(armorFromApi);
    }
}

/**
 * Initialize the armor select dropdown.
 */
const initArmorSelect = function() {
    const armorSelect = document.getElementById('armor-select');

    // Enable the "Add armor" button once the user has actually chosen a armor.
    armorSelect.onchange = () => {
        const addArmorButton = document.getElementById('add-armor-button');
        addArmorButton.disabled = false;
    }
}

/**
 * Initialize the button to add a new armor to the inventory.
 */
const initAddArmorButton = function() {
    const addArmorButton = document.getElementById('add-armor-button');

    addArmorButton.onclick = async () => {
        const armorSelect = document.getElementById('armor-select');
        const armor = await getEquipmentObjectAsync(armorSelect.value);

        addArmorRow(armor);

        // Disable button until a armor is chosen again.
        addArmorButton.disabled = true;
        armorSelect.value = "empty" ;

        saveArmorInventory();
    };
}

/**
 * Add a armor row to the armor table.
 * @param {object} armor Full armor object.
 * @param {string} ability Optional parameter. Required for building the initial table from storage. Used to specify the value of a dropdown.
 */
const addArmorRow = function(armor, ability = null) {

    const row = getNewRow(armor, ability);

    const armorTable = document.getElementById('armor-table');
    const armorTableBody = armorTable.querySelector('tbody');
    armorTableBody.appendChild(row);

    // Initial update to show the correct values on load.
    updateArmorRow(row);
}

/**
 * Get a new row for the armor table.
 * @param {object} armor Full armor object.
 * @returns {HTMLTableRowElement}
 */
const getNewRow = function(armor) {
    const tr = document.createElement('tr');

    tr.dataset.index = armor.index;
    tr.appendChild(getNewNameCell(armor));
    tr.appendChild(getNewTypeCell(armor));
    tr.appendChild(getNewStrengthRequirementCell(armor));
    tr.appendChild(getNewDisadvantageOnStealthCell(armor));
    tr.appendChild(getNewArmorClassCell(armor));
    tr.appendChild(getNewEffectiveArmorClassCell(armor));
    tr.appendChild(getNewButtonsCell(armor));

    return tr;
}

/**
 * Get a new cell for the "Name" column.
 * @param {object} armor Full armor object.
 * @returns {HTMLTableCellElement}
 */
const getNewNameCell = function(armor) {
    const td = getNewCell("name");

    td.textContent = armor.name;

    return td;
}

/**
 * Get a new cell for the "Type" column.
 * @param {object} armor Full armor object.
 * @returns {HTMLTableCellElement}
 */
const getNewTypeCell = function(armor) {
    const td = getNewCell("type");

    td.textContent = armor.armor_category;

    return td;
}

/**
 * Get a new cell for the "Minimum Strength" column.
 * @param {object} armor Full armor object.
 * @returns {HTMLTableCellElement}
 */
const getNewStrengthRequirementCell = function(armor) {
    const td = getNewCell("strength-requirement");

    td.textContent = armor.str_minimum == 0 ? "-" : armor.str_minimum;

    return td;
}

/**
 * Get a new cell for the "Disadvantage on stealth" column.
 * @param {object} armor Full armor object.
 * @returns {HTMLTableCellElement}
 */
const getNewDisadvantageOnStealthCell = function(armor) {
    const td = getNewCell("disadvantage-on-stealth");

    td.textContent = armor.stealth_disadvantage ? "Disadvantage" : "-";

    return td;
}

/**
 * Get a new cell for the "Armor class" column.
 * @param {object} armor Full armor object.
 * @returns {HTMLTableCellElement}
 */
const getNewArmorClassCell = function(armor) {
    const td = getNewCell("armor-class");

    let textContent = armor.armor_class.base;

    if (armor.armor_class.dex_bonus === true) {
        textContent += " + DEX";

        if (armor.armor_class.max_bonus) {
            textContent += ` (max ${armor.armor_class.max_bonus})`;
        }
    }

    td.textContent = textContent;

    return td;
}

/**
 * Get a new cell for the "Effective armor class" column.
 * @param {object} armor Full armor object.
 * @returns {HTMLTableCellElement} Empty. Will get filled in another function.
 */
const getNewEffectiveArmorClassCell = function(armor) {
    const td = getNewCell("effective-armor-class");

    return td;
}

/**
 * Get a new cell for the "Buttons" column.
 * @param {object} armor Full armor object.
 * @returns {HTMLTableCellElement}
 */
const getNewButtonsCell = function() {
    const td = getNewCell("armor_buttons");

    const deleteButton = document.createElement('button');
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    deleteButton.onclick = () => {
        const row = deleteButton.closest('tr');
        row.remove();
        saveArmorInventory();
    }

    td.appendChild(deleteButton);

    return td;
}

/**
 * Get a new generic cell for a row in the armor inventory table.
 * @param {string} headerName Name of the column header as specified in the ID of the header cell. 
 * @returns {HTMLTableCellElement}
 */
const getNewCell = function(headerName) {
    const td = document.createElement('td');

    td.headers = `armor_${headerName}`;

    return td;
}

/**
 * Update the Effective armor class column of a row.
 * @param {HTMLTableRowElement} row 
 */
const updateEffectiveArmorClassCell = async function(row) {
    const effectiveArmorClassCell = row.querySelector('[headers="armor_effective-armor-class"]');

    const armor = await getEquipmentObjectAsync(row.dataset.index);

    effectiveArmorClassCell.textContent = armor.armor_class.base + getArmorModifier(armor);
}

/**
 * Get the modifier for the given armor.
 * @param {object} armor Full armor object.
 * @returns {number}
 */
const getArmorModifier = function(armor) {

    // No DEX modifier.
    if (armor.armor_class.dex_bonus === false) {
        return 0;
    }

    const dexterityModifier = getAbilityScoreModifier("dexterity");

    // Max DEX modifier.
    if (armor.armor_class.max_bonus && dexterityModifier > armor.armor_class.max_bonus) {
        return armor.armor_class.max_bonus;
    }

    // No limit DEX modifier.
    return dexterityModifier;
}