import { Armor } from "../../api/resources/equipment/Armor.js";
import { globals } from "../../../load-page.js";

/**
 * Custom table cell element that displays an armor's effective armor class.
 * Extends HTMLTableCellElement.
 *
 * This element listens for global changes in ability score modifiers (specifically "dex") and updates the displayed effective armor class accordingly.
 */
export class InventoryArmorEffectiveArmorClassCell extends HTMLTableCellElement {

    /**
     * Creates an instance of InventoryArmorEffectiveArmorClassCell.
     * @param {Armor} armor The armor object, containing armor class data.
     */
    constructor(armor) {
        super();

        /** @type {Armor} */
        this.armor = armor;
    }

    /**
     * Called when the element is connected to the DOM.
     * Updates the display immediately and registers an event listener for changes.
     */
    connectedCallback() {

        // Update display immediately.
        this.updateDisplay();

        // Listen for changes to ability scores.
        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("abilityScoreModifierChanged", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes the event listener.
     */
    disconnectedCallback() {
        document.removeEventListener("abilityScoreModifierChanged", this._updateHandler);
    }

    /**
     * Updates the cell text content if a relevant event occurs.
     * @param {CustomEvent} event An optional event triggering the update.
     */
    updateDisplay(event) {
        if (this.shouldUpdateDisplay(event)) {
            this.textContent = this.getEffectiveArmorClassValue();
        }
    }

    /**
     * Determines whether the display should be updated based on the event.
     * @param {CustomEvent} event The event to evaluate.
     * @returns {boolean} True if update is necessary; false otherwise.
     */
    shouldUpdateDisplay(event) {
        return !event ||
            (event.type === "abilityScoreModifierChanged" &&
             event.detail.ability === "dex" &&
             this.armor.armor_class.dex_bonus);
    }

    /**
     * Calculates and returns the effective armor class using the active player's dexterity modifier.
     * @returns {number} The effective armor class value.
     */
    getEffectiveArmorClassValue() {
        return this.armor.armor_class.getEffectiveArmorClass(globals.activePlayerCharacter.getAbilityModifier("dex"));
    }
}

// Register the custom element, extending the built-in "td" element.
customElements.define("inventory-armor-effective-armor-class-cell", InventoryArmorEffectiveArmorClassCell, { extends: 'td' });