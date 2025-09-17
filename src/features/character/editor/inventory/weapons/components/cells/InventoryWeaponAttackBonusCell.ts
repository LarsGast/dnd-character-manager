import { globals } from "../../../../../../../store/load-globals.js";
import { Weapon } from "../../../../../../../types/api/resources/Weapon.js";

/**
 * Custom table cell element that displays the calculated attack bonus for a weapon.
 * Extends HTMLTableCellElement.
 *
 * The cell listens for updates from proficiency, ability score modifiers, weapon proficiency, and weapon ability changes to update the displayed attack bonus.
 */
export class InventoryWeaponAttackBonusCell extends HTMLTableCellElement {
    weapon: Weapon;
    rowIndex: number;
    _updateHandler?: (event: any) => void;

    /**
     * Creates an instance of InventoryWeaponAttackBonusCell.
     * @param weapon The weapon object.
     * @param rowIndex The index of the weapon in the inventory.
     */
    constructor(weapon: Weapon, rowIndex: number) {
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

        this._updateHandler = (event: any) => this.updateDisplay(event);
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
        document.removeEventListener("proficiencyBonusChanged", this._updateHandler!);
        document.removeEventListener("abilityScoreModifierChanged", this._updateHandler!);
        document.removeEventListener("weaponProficiencyChanged", this._updateHandler!);
        document.removeEventListener("inventoryWeaponAbilityChanged", this._updateHandler!);
    }

    /**
     * Updates the cell's displayed attack bonus.
     * Also adds or removes a CSS class for positive bonus values.
     * @param event An optional event that triggers the update.
     */
    updateDisplay(event?: CustomEvent) {
        if (this.shouldUpdateDisplay(event)) {
            const attackBonusValue = this.getAttackBonusValue();
            this.textContent = attackBonusValue.toString();

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
     * @param event The event to evaluate.
     * @returns True if the cell should update; otherwise false.
     */
    shouldUpdateDisplay(event?: CustomEvent): boolean {
        const inventoryWeapon = globals.activePlayerCharacter.inventoryWeapons[this.rowIndex];

        return !event || 
            (event.type === "proficiencyBonusChanged") ||
            (event.type === "abilityScoreModifierChanged" && event.detail.ability === (inventoryWeapon as any).ability) ||
            (event.type === "weaponProficiencyChanged" && event.detail.weapon === this.weapon.index) ||
            (event.type === "inventoryWeaponAbilityChanged" && event.detail.index === this.rowIndex);
    }

    /**
     * Retrieves the calculated attack bonus for the weapon.
     * @returns The computed attack bonus.
     */
    getAttackBonusValue(): number {
        const inventoryWeapon: any = globals.activePlayerCharacter.inventoryWeapons[this.rowIndex];
        return globals.activePlayerCharacter.getWeaponAttackBonus(inventoryWeapon.index, inventoryWeapon.ability);
    }
}

// Register the custom element.
customElements.define("inventory-weapon-attack-bonus-cell", InventoryWeaponAttackBonusCell, { extends: 'td' });