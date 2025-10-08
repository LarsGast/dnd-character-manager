import {
	armorRepository,
	equipmentCategoryRepository,
	weaponRepository,
} from '../../../../../../wiring/dependencies';
import { ArmorProficiencyDisplay } from '../display/ArmorProficiencyDisplay';
import { WeaponProficiencyDisplay } from '../display/WeaponProficiencyDisplay';

/**
 * Custom unordered list element for displaying equipment proficiencies.
 * Extends the built-in HTMLUListElement.
 *
 * Depending on the type (armor or weapon), this component dynamically loads and appends either ArmorProficiencyDisplay or WeaponProficiencyDisplay items.
 */
export class EquipmentProficienciesList extends HTMLUListElement {
	equipmentCategoryIndex: string;
	isArmor: string;

	/**
	 * Create an EquipmentProficienciesList.
	 *
	 * Attributes:
	 *   - equipmentCategoryIndex: The index used to fetch equipment items.
	 *   - isArmor: String "true" or "false" to decide if this list is for armor.
	 */
	constructor() {
		super();

		// Attributes stored on the element for fetching data.
		this.equipmentCategoryIndex = this.getAttribute('equipmentCategoryIndex')!;
		this.isArmor = this.getAttribute('isArmor')!;

		// Setup base CSS classes for list styling.
		this.classList.add('no-style-list', 'proficiencies-list');
	}

	/**
	 * Called when the element is inserted into the DOM.
	 * Fetches the equipment data and populates the list with the corresponding proficiency displays.
	 * Adds a CSS class based on the number of equipment items.
	 */
	async connectedCallback(): Promise<void> {
		// Fetch equipment information based on the category index.
		const equipmentCategory = (await equipmentCategoryRepository.getAsync(
			this.equipmentCategoryIndex,
		))!;

		// Iterate over each equipment item to create and append the display component.
		for (const equipmentInfo of equipmentCategory.equipment) {
			if (this.isArmor === 'true') {
				const armor = await armorRepository.getAsync(equipmentInfo.index);
				this.appendChild(new ArmorProficiencyDisplay(armor!));
			} else {
				const weapon = await weaponRepository.getAsync(equipmentInfo.index);
				this.appendChild(new WeaponProficiencyDisplay(weapon!));
			}
		}

		// Apply a CSS class to manage the number of columns based on item count.
		const className = this.getNumberOfColumnsClassName(
			equipmentCategory.equipment.length,
		);
		if (className) {
			this.classList.add(className);
		}
	}

	/**
	 * Get the appropriate number-of-columns class name for styling.
	 * @param listLength The total number of equipment items.
	 * @returnsThe CSS class name defining column layout.
	 */
	getNumberOfColumnsClassName(listLength: number): string | undefined {
		if (listLength >= 9) {
			return 'three-columns-list';
		}

		if (listLength >= 4) {
			return 'two-columns-list';
		}

		return undefined;
	}
}

// Define the custom element, extending the built-in "ul" element.
customElements.define(
	'equipment-proficiencies-list',
	EquipmentProficienciesList,
	{ extends: 'ul' },
);
