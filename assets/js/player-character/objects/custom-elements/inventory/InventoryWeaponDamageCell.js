import { Weapon } from "../../api/resources/equipment/Weapon.js";
import { globalPlayerCharacter } from "../../PlayerCharacter.js";

/**
 * Custom table cell element that displays the damage dice and damage bonus of a weapon.
 * Extends HTMLTableCellElement.
 *
 * The element shows the damage dice (if available) and a damage bonus.
 * It listens for changes in ability score modifiers and weapon ability selection to update its display.
 */
export class InventoryDamageCell extends HTMLTableCellElement {

    /**
     * Creates an instance of InventoryDamageCell.
     * @param {Weapon} weapon The weapon object.
     * @param {number} rowIndex The index of the weapon in the inventory.
     */
    constructor(weapon, rowIndex) {
        super();
        
        /** @type {Weapon} */
        this.weapon = weapon;
        this.rowIndex = rowIndex;

        // Create a span to display the damage bonus.
        this.damageBonusSpan = document.createElement('span');

        // Append text for the damage dice and then the bonus span.
        this.appendChild(document.createTextNode(this.weapon.damage?.damage_dice ?? ''));
        this.appendChild(this.damageBonusSpan);
    }

    /**
     * Called when the element is added to the DOM.
     * Updates the display immediately and registers event listeners.
     */
    connectedCallback() {
        this.updateDisplay();

        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("abilityScoreModifierChanged", this._updateHandler);
        document.addEventListener("inventoryWeaponAbilityChanged", this._updateHandler);
    }
    
    /**
     * Called when the element is removed from the DOM.
     * Removes the event listeners.
     */
    disconnectedCallback() {
        document.removeEventListener("abilityScoreModifierChanged", this._updateHandler);
        document.removeEventListener("inventoryWeaponAbilityChanged", this._updateHandler);
    }

    /**
     * Updates the displayed damage bonus.
     * Applies a special CSS class if the bonus is positive.
     * @param {CustomEvent} event An optional event that may trigger the update.
     */
    updateDisplay(event) {
        if (this.shouldUpdateDisplay(event)) {
            const damageBonusValue = this.getDamageBonusValue();
            this.damageBonusSpan.textContent = damageBonusValue;

            // Add a CSS class that adds the "+" sign in front of a positive number.
            if (damageBonusValue !== null && damageBonusValue >= 0) {
                this.damageBonusSpan.classList.add("expressive-positive-number");
            } else {
                this.damageBonusSpan.classList.remove("expressive-positive-number");
            }
        }
    }

    /**
     * Determines if the display should be updated based on the event.
     * @param {CustomEvent} event The event to examine.
     * @returns {boolean} True if update is necessary; otherwise false.
     */
    shouldUpdateDisplay(event) {
        const inventoryWeapon = globalPlayerCharacter.inventoryWeapons[this.rowIndex];

        return !event || 
            (event.type === "abilityScoreModifierChanged" && event.detail.ability === inventoryWeapon.ability) ||
            (event.type === "inventoryWeaponAbilityChanged" && event.detail.index === this.rowIndex);
    }

    /**
     * Retrieves the damage bonus value based on the current ability modifier.
     * @returns {number|null} The damage bonus or null if damage information is unavailable.
     */
    getDamageBonusValue() {
        const inventoryWeapon = globalPlayerCharacter.inventoryWeapons[this.rowIndex];

        if (!this.weapon.damage) {
            return null;
        }

        return globalPlayerCharacter.getAbilityModifier(inventoryWeapon.ability);
    }
}

// Register the custom element.
customElements.define("inventory-weapon-damage-cell", InventoryDamageCell, { extends: 'td' });