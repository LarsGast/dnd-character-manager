import { globalPlayerCharacter } from "../../objects/PlayerCharacter.js";
import { getAbilityScoreModifier, getProficiencyModifier, isProficientInWeapon } from "../../util.js";
import { Weapon } from "../../objects/equipment/Weapon.js";

/**
 * Init the weapons section of the inventory.
 */
export const initWeapons = async function() {
    await initWeaponTable();
    initWeaponSelect();
    initAddWeaponButton();
}

/**
 * Update all weapon modifiers at once.
 */
export const updateAllWeaponModifiers = function() {
    const weaponsTable = document.getElementById('weapons-table');
    const weaponsTableBody = weaponsTable.querySelector('tbody');

    Array.from(weaponsTableBody.rows).forEach(row => {
        updateWeaponRow(row);
    });
}

/**
 * Update a single row in the weapons table.
 * @param {HTMLTableRowElement} row 
 */
const updateWeaponRow = function(row) {
    updateAttackBonusCell(row);
    updateDamageCell(row);
}

/**
 * Save the entire weapons inventory table to local storage.
 */
const saveWeaponInventory = function() {
    
    const weaponsTable = document.getElementById('weapons-table');
    const weaponsTableBody = weaponsTable.querySelector('tbody');

    const weapons = Array.from(weaponsTableBody.rows).map(row => {
        return {
            index: row.dataset.index,
            ability: getAbility(row)
        };
    })

    globalPlayerCharacter.setProperty("inventoryWeapons", weapons);
}

/**
 * Initialize the weapon inventory table and fill it with the saved weapons.
 */
const initWeaponTable = async function() {

    const weapons = globalPlayerCharacter.inventoryWeapons;

    for (const weapon of weapons) {        
        const weaponFromApi = await Weapon.getAsync(weapon.index);
        addWeaponRow(weaponFromApi, weapon.ability);
    }
}

/**
 * Initialize the weapon select dropdown.
 */
const initWeaponSelect = function() {
    const weaponSelect = document.getElementById('weapon-select');

    // Enable the "Add weapon" button once the user has actually chosen a weapon.
    weaponSelect.onchange = () => {
        const addWeaponButton = document.getElementById('add-weapon-button');
        addWeaponButton.disabled = false;
    }
}

/**
 * Initialize the button to add a new weapon to the inventory.
 */
const initAddWeaponButton = function() {
    const addWeaponButton = document.getElementById('add-weapon-button');

    addWeaponButton.onclick = async () => {
        const weaponSelect = document.getElementById('weapon-select');
        const weapon = await Weapon.getAsync(weaponSelect.value);

        addWeaponRow(weapon);

        // Disable button until a weapon is chosen again.
        addWeaponButton.disabled = true;
        weaponSelect.value = null ;

        saveWeaponInventory();
    };
}

/**
 * Add a weapon row to the weapons table.
 * @param {Weapon} weapon Full weapon object.
 * @param {string} ability Optional parameter. Required for building the initial table from storage. Used to specify the value of a dropdown.
 */
const addWeaponRow = function(weapon, ability = null) {

    const row = getNewRow(weapon, ability);

    const weaponsTable = document.getElementById('weapons-table');
    const weaponsTableBody = weaponsTable.querySelector('tbody');
    weaponsTableBody.appendChild(row);

    // Initial update to show the correct values on load.
    updateWeaponRow(row);
}

/**
 * Get a new row for the weapons table.
 * @param {Weapon} weapon Full weapon object.
 * @param {string} ability Optional parameter. Required for building the initial table from storage. Used to specify the value of a dropdown.
 * @returns {HTMLTableRowElement}
 */
const getNewRow = function(weapon, ability = null) {
    const tr = document.createElement('tr');

    tr.dataset.index = weapon.index;
    tr.appendChild(getNewNameCell(weapon));
    tr.appendChild(getNewAbilityCell(weapon, ability));
    tr.appendChild(getNewAttackBonusCell(weapon, ability));
    tr.appendChild(getNewDamageCell(weapon, ability));
    tr.appendChild(getNewDamageTypeCell(weapon));
    tr.appendChild(getNewRangeCell(weapon));
    tr.appendChild(getNewWeightCell(weapon));
    tr.appendChild(getNewButtonsCell(weapon));

    return tr;
}

/**
 * Get a new cell for the "Name" column.
 * @param {Weapon} weapon Full weapon object.
 * @returns {HTMLTableCellElement}
 */
const getNewNameCell = function(weapon) {
    const td = getNewCell("name");

    td.textContent = weapon.name;

    return td;
}

/**
 * Get a new cell for the "Ability" column.
 * @param {Weapon} weapon Full weapon object.
 * @param {string} ability Optional parameter. Required for building the initial table from storage. Used to specify the value of a dropdown.
 * @returns {HTMLTableCellElement}
 */
const getNewAbilityCell = function(weapon, ability = null) {
    const td = getNewCell("ability");

    const abilities = getWeaponAbilities(weapon);

    if (abilities.length > 1) {
        
        // Weapons can use STR, DEX, or both.
        // In case of both, let the user specify which they want to use.
        const select = document.createElement('select');

        const strengthOption = document.createElement('option');
        strengthOption.value = "str";
        strengthOption.textContent = "STR";
        
        const dexterityOption = document.createElement('option');
        dexterityOption.value = "dex";
        dexterityOption.textContent = "DEX";
    
        select.appendChild(strengthOption);
        select.appendChild(dexterityOption);

        // If given, set the value of the dropdown.
        if (ability) {
            select.value = ability;
        }

        select.onchange = () => {
            saveWeaponInventory();

            const row = select.closest('tr');
            updateWeaponRow(row);
        }
    
        td.appendChild(select);
    }
    // There can only be one element in the list here.
    else if (abilities.includes("str")) {
        const span = document.createElement('span');

        span.textContent = "STR";
        span.dataset.ability = "str";

        td.appendChild(span);
    }
    // There can only be one element in the list here, and since it is not STR, it is DEX.
    else {
        const span = document.createElement('span');

        span.textContent = "DEX";
        span.dataset.ability = "dex";

        td.appendChild(span);
    }

    return td;
}

/**
 * Get a new cell for the "Attack bonus" column.
 * @returns {HTMLTableCellElement} Empty. Will get filled in another function.
 */

const getNewAttackBonusCell = function() {
    const td = getNewCell("attack-bonus");

    return td;
}

/**
 * Get a new cell for the "Damage" column.
 * @param {Weapon} weapon Full weapon object.
 * @returns {HTMLTableCellElement} Empty textContent. Will get filled in another function.
 */
const getNewDamageCell = function(weapon) {
    const td = getNewCell("damage");

    td.dataset.dice = weapon.damage.damage_dice;

    return td;
}

/**
 * Get a new cell for the "Damage type" column.
 * @param {Weapon} weapon Full weapon object.
 * @returns {HTMLTableCellElement}
 */
const getNewDamageTypeCell = function(weapon) {
    const td = getNewCell("damage-type");

    td.textContent = weapon.damage.damage_type.name;

    return td;
}

/**
 * Get a new cell for the "Range" column.
 * @param {Weapon} weapon Full weapon object.
 * @returns {HTMLTableCellElement}
 */
const getNewRangeCell = function(weapon) {
    const td = getNewCell("range");

    let rangeText = weapon.range.normal;

    // Specify a short and long range for ranged weapons.
    if (weapon.range.long) {
        rangeText += ` / ${weapon.range.long}`;
    }

    td.textContent = rangeText;

    return td;
}

/**
 * Get a new cell for the "Weight" column.
 * @param {Weapon} weapon Full weapon object.
 * @returns {HTMLTableCellElement}
 */
const getNewWeightCell = function(weapon) {
    const td = getNewCell("weight");

    td.textContent = weapon.weight;

    return td;
}

/**
 * Get a new cell for the "Buttons" column.
 * @param {Weapon} weapon Full weapon object.
 * @returns {HTMLTableCellElement}
 */
const getNewButtonsCell = function() {
    const td = getNewCell("weapon_buttons");

    const deleteButton = document.createElement('button');
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    deleteButton.onclick = () => {
        const row = deleteButton.closest('tr');
        row.remove();
        saveWeaponInventory();
    }

    td.appendChild(deleteButton);

    return td;
}

/**
 * Get a new generic cell for a row in the weapons inventory table.
 * @param {string} headerName Name of the column header as specified in the ID of the header cell. 
 * @returns {HTMLTableCellElement}
 */
const getNewCell = function(headerName) {
    const td = document.createElement('td');

    td.headers = `weapon_${headerName}`;

    return td;
}

/**
 * Get all possible abilities this weapon could use according to the SRD.
 * @param {Weapon} weapon Full weapon object.
 * @returns {string[]} Either ["str"], ["dex"], or ["str", "dex"].
 */
const getWeaponAbilities = function(weapon) {

    if (weapon.weapon_range === "Ranged") {
        return ["dex"];
    }

    if (weapon.properties.some(prop => prop.index === "finesse")) {
        return ["str", "dex"];
    }

    return ["str"];
}

/**
 * Update the Attack bonus column of a row.
 * @param {HTMLTableRowElement} row 
 */
const updateAttackBonusCell = function(row) {
    const attackBonusCell = row.querySelector('[headers="weapon_attack-bonus"]');

    // Set the value of the attack bonus.
    const weaponNameCell = row.querySelector('[headers="weapon_name"]');
    attackBonusCell.textContent = getAttackBonus(weaponNameCell.textContent, getAbility(row));

    // Add a plus sign to the number to make is more expressive and clear that it is a positive modifier.
    attackBonusCell.removeAttribute('class');
    if (attackBonusCell.textContent > 0) {
        attackBonusCell.classList.add('expressive-positive-number');
    }
}

/**
 * Get the attack bonus value of the given weapon using the given ability.
 * @param {string} weaponName As in local storage.
 * @param {string} ability Ability identifier. Lower case full word.
 * @returns {number}
 */
const getAttackBonus = function(weaponName, ability) {
    const abilityModifier = getAbilityScoreModifier(ability);
    const isProficient = isProficientInWeapon(weaponName);

    if (isProficient === false) {
        return abilityModifier;
    }

    return abilityModifier + getProficiencyModifier();
}

/**
 * Update the Damage column of a row.
 * @param {HTMLTableRowElement} row 
 */
const updateDamageCell = function(row) {

    const damageCell = row.querySelector('[headers="weapon_damage"]');
    damageCell.dataset.damageBonus = getAbilityScoreModifier(getAbility(row));

    damageCell.textContent = `${damageCell.dataset.dice}${damageCell.dataset.damageBonus >= 0 ? '+' : ''}${damageCell.dataset.damageBonus}`;
}

/**
 * Get the chosen ability used for this weapon.
 * If there is only 1 possible ability (e.g. Longsword), it will get it from a span element.
 * If there are more possible abilities (e.g. Dagger), it will get it from a select element.
 * @param {HTMLTableRowElement} row 
 * @returns {string} Ability identifier. Lower case full word.
 */
const getAbility = function(row) {
    const abilityCell = row.querySelector('[headers="weapon_ability"]');

    // 1 possible ability.
    const span = abilityCell.querySelector('span');
    if (span) {
        return span.dataset.ability;
    }

    // Multiple possible abilities.
    // User input or default.
    const select = abilityCell.querySelector('select');
    return select.value;
}