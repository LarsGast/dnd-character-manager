import { globals } from "../../../load-globals.js";

/**
 * Custom table cell element that displays the calculated attack bonus for a weapon.
 * Extends HTMLTableCellElement.
 *
 * The cell listens for updates from proficiency, ability score modifiers, weapon proficiency, and weapon ability changes to update the displayed attack bonus.
 */
export class InventoryWeaponAttackBonusCell extends HTMLTableCellElement {

    /**
     * Creates an instance of InventoryWeaponAttackBonusCell.
     * @param {Weapon} weapon The weapon object.
     * @param {number} rowIndex The index of the weapon in the inventory.
     */
    constructor(weapon, rowIndex) {
        super();

        this.weapon = weapon;
        this.rowIndex = rowIndex;
    }

    /**
     * Called when the element is connected to the DOM.
     * Immediately updates the display and registers event listeners.
     */
    connectedCallback() {

        this.updateDisplay();

        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("proficiencyBonusChanged", this._updateHandler);
        document.addEventListener("abilityScoreModifierChanged", this._updateHandler);
        document.addEventListener("weaponProficiencyChanged", this._updateHandler);
        document.addEventListener("inventoryWeaponAbilityChanged", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes registered event listeners.
     */
    disconnectedCallback() {
        document.removeEventListener("proficiencyBonusChanged", this._updateHandler);
        document.removeEventListener("abilityScoreModifierChanged", this._updateHandler);
        document.removeEventListener("weaponProficiencyChanged", this._updateHandler);
        document.removeEventListener("inventoryWeaponAbilityChanged", this._updateHandler);
    }

    /**
     * Updates the cell's displayed attack bonus.
     * Also adds or removes a CSS class for positive bonus values.
     * @param {CustomEvent} event An optional event that triggers the update.
     */
    updateDisplay(event) {
        if (this.shouldUpdateDisplay(event)) {
            const attackBonusValue = this.getAttackBonusValue();
            this.textContent = attackBonusValue;

            // Add a CSS class that adds the "+" sign in front of a positive number.
            if (attackBonusValue > 0) {
                this.classList.add("expressive-positive-number");
            }
            else {
                this.classList.remove("expressive-positive-number");
            }
        }
    }

    /**
     * Determines if the display should be updated based on the triggering event.
     * @param {CustomEvent} event The event to evaluate.
     * @returns {boolean} True if the cell should update; otherwise false.
     */
    shouldUpdateDisplay(event) {
        const inventoryWeapon = globals.activePlayerCharacter.inventoryWeapons[this.rowIndex];

        return !event || 
            (event.type === "proficiencyBonusChanged") ||
            (event.type === "abilityScoreModifierChanged" && event.detail.ability === inventoryWeapon.ability) ||
            (event.type === "weaponProficiencyChanged" && event.detail.weapon === this.weapon.index) ||
            (event.type === "inventoryWeaponAbilityChanged" && event.detail.index === this.rowIndex);
    }

    /**
     * Retrieves the calculated attack bonus for the weapon.
     * @returns {number} The computed attack bonus.
     */
    getAttackBonusValue() {
        const inventoryWeapon = globals.activePlayerCharacter.inventoryWeapons[this.rowIndex];
        return globals.activePlayerCharacter.getWeaponAttackBonus(inventoryWeapon.index, inventoryWeapon.ability);
    }
}

// Register the custom element.
customElements.define("inventory-weapon-attack-bonus-cell", InventoryWeaponAttackBonusCell, { extends: 'td' });