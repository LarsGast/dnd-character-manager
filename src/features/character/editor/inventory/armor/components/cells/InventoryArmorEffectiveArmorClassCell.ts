import { Armor } from "../../../../../../../types/api/resources/equipment/Armor.js";
import { globals } from "../../../../../../../store/load-globals.js";

/**
 * Custom table cell element that displays an armor's effective armor class.
 * Extends HTMLTableCellElement.
 *
 * This element listens for global changes in ability score modifiers (specifically "dex") and updates the displayed effective armor class accordingly.
 */
export class InventoryArmorEffectiveArmorClassCell extends HTMLTableCellElement {
    armor: Armor;
    _updateHandler?: (event: any) => void;

    /**
     * Creates an instance of InventoryArmorEffectiveArmorClassCell.
     * @param armor The armor object, containing armor class data.
     */
    constructor(armor: Armor) {
        super();

        this.armor = armor;
    }

    /**
     * Called when the element is connected to the DOM.
     * Updates the display immediately and registers an event listener for changes.
     */
    connectedCallback(): void {

        // Update display immediately.
        this.updateDisplay();

        // Listen for changes to ability scores.
        this._updateHandler = (event: any) => this.updateDisplay(event);
        document.addEventListener("abilityScoreModifierChanged", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes the event listener.
     */
    disconnectedCallback(): void {
        document.removeEventListener("abilityScoreModifierChanged", this._updateHandler!);
    }

    /**
     * Updates the cell text content if a relevant event occurs.
     * @param event An optional event triggering the update.
     */
    updateDisplay(event?: CustomEvent): void {
        if (this.shouldUpdateDisplay(event)) {
            this.textContent = this.getEffectiveArmorClassValue().toString();
        }
    }

    /**
     * Determines whether the display should be updated based on the event.
     * @param event The event to evaluate.
     * @returns True if update is necessary; false otherwise.
     */
    shouldUpdateDisplay(event?: CustomEvent): boolean {
        return !event ||
            (event.type === "abilityScoreModifierChanged" &&
             event.detail.ability === "dex" &&
             this.armor.armor_class.dex_bonus);
    }

    /**
     * Calculates and returns the effective armor class using the active player's dexterity modifier.
     * @returns The effective armor class value.
     */
    getEffectiveArmorClassValue(): number {
        return this.armor.armor_class.getEffectiveArmorClass(globals.activePlayerCharacter.getAbilityModifier("dex"));
    }
}

// Register the custom element, extending the built-in "td" element.
customElements.define("inventory-armor-effective-armor-class-cell", InventoryArmorEffectiveArmorClassCell, { extends: 'td' });