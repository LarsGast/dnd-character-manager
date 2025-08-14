import { InventoryWeaponAttackBonusCell } from "./InventoryWeaponAttackBonusCell.js";
import { Weapon } from "../../api/resources/equipment/Weapon.js";
import { InventoryWeaponAbilityCell } from "./InventoryWeaponAbilityCell.js";
import { InventoryDamageCell } from "./InventoryWeaponDamageCell.js";
import { InventoryWeaponButtonsCell } from "./InventoryWeaponButtonsCell.js";

/**
 * Custom table row element that represents a weapon entry in the inventory.
 * Extends HTMLTableRowElement.
 *
 * This row assembles various cells for the weapon's name, ability, attack bonus, damage, damage type, range, weight, and action buttons.
 */
export class InventoryWeaponRow extends HTMLTableRowElement {

    /**
     * Creates an instance of InventoryWeaponRow.
     * @param {Weapon} weapon The weapon object to display.
     */
    constructor(weapon) {
        super();
        this.weapon = weapon;
    }
    
    /**
     * Called when the element is connected to the DOM.
     * Creates and appends table cells with weapon details.
     */
    connectedCallback() {
        
        // Create a cell for the weapon name.
        this.nameCell = document.createElement('td');
        this.nameCell.headers = 'weapon_name';
        this.nameCell.textContent = this.weapon.name;

        // Create a cell for the ability (or select for multiple).
        this.abilityCell = new InventoryWeaponAbilityCell(this.weapon, this.rowIndex - 1);
        this.abilityCell.headers = 'weapon_ability';

        // Create a cell for the calculated attack bonus.
        this.attackBonusCell = new InventoryWeaponAttackBonusCell(this.weapon, this.rowIndex - 1);
        this.attackBonusCell.headers = 'weapon_attack-bonus';

        // Create a cell for damage (dice and bonus).
        this.damageCell = new InventoryDamageCell(this.weapon, this.rowIndex - 1);
        this.damageCell.headers = 'weapon_damage';

        // Create a cell for the weapon's damage type.
        this.damageTypeCell = document.createElement('td');
        this.damageTypeCell.headers = 'weapon_damage-type';
        this.damageTypeCell.textContent = this.weapon.damage?.damage_type.name;

        // Create a cell for the range value.
        this.rangeCell = document.createElement('td');
        this.rangeCell.headers = 'weapon_range';
        this.rangeCell.textContent = this.weapon.range.normal;

        // Create a cell for the weight.
        this.weightCell = document.createElement('td');
        this.weightCell.headers = 'weapon_weight';
        this.weightCell.textContent = this.weapon.weight;

        // Create a cell for action buttons (e.g., delete).
        this.buttonsCell = new InventoryWeaponButtonsCell(this.weapon, this.rowIndex - 1);
        this.buttonsCell.headers = 'weapon_buttons';

        // Append all cells to the row.
        this.appendChild(this.nameCell);
        this.appendChild(this.abilityCell);
        this.appendChild(this.attackBonusCell);
        this.appendChild(this.damageCell);
        this.appendChild(this.damageTypeCell);
        this.appendChild(this.rangeCell);
        this.appendChild(this.weightCell);
        this.appendChild(this.buttonsCell);
    }
}

// Register the custom element.
customElements.define("inventory-weapon-row", InventoryWeaponRow, { extends: 'tr' });