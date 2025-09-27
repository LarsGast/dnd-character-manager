import { ArmorClass } from '../types/domain/resources/Armor.js';
import { Weapon } from '../types/domain/resources/Weapon.js';
import { BaseResource } from '../types/domain/wrappers/BaseResource.js';
import { ResourceList } from '../types/domain/wrappers/ResourceList.js';

/**
 * Creates an HTML element and sets its textContent property.
 * @param tagName The HTML tag name for the element to create.
 * @param textContent The text content to set on the element.
 * @returns The created HTML element with the specified text content.
 */
export function getElementWithTextContent(
	tagName: string,
	textContent: string | null,
): HTMLElement {
	const element = document.createElement(tagName);

	element.textContent = textContent;

	return element;
}

/**
 * Populate a select element with options from a list of resources.
 * @param select The select element to populate.
 * @param resourceList The list of resources to populate the select with.
 */
export function populateSelectWithApiObjects(
	select: HTMLSelectElement,
	resourceList: ResourceList,
) {
	const srdResources = resourceList.results.filter(
		(resource) => !resource.isHomebrew,
	);
	const homebrewResources = resourceList.results.filter(
		(resource) => resource.isHomebrew,
	);

	const getOptionTextAndValueFunc = (
		obj: BaseResource,
	): { optionText: string; optionValue: string } => {
		return {
			optionText: obj.name,
			optionValue: obj.index,
		};
	};

	select.appendChild(
		getSelectOptionGroup('SRD', srdResources, getOptionTextAndValueFunc),
	);

	if (homebrewResources.length > 0) {
		select.appendChild(
			getSelectOptionGroup(
				'Homebrew',
				homebrewResources,
				getOptionTextAndValueFunc,
			),
		);
	}
}

/**
 * Creates an empty option element for select dropdowns with customizable text and value.
 * @param customText The display text for the empty option (default: "-- Select an option --").
 * @param customValue The value attribute for the empty option (default: "null").
 * @returns An HTMLOptionElement configured as a disabled, selected placeholder option.
 */
export function getEmptyOption(
	customText: string = '-- Select an option --',
	customValue: string = 'null',
): HTMLOptionElement {
	const emptyOption = document.createElement('option');

	emptyOption.value = customValue;
	emptyOption.disabled = true;
	emptyOption.selected = true;
	emptyOption.textContent = customText;

	return emptyOption;
}

/**
 * Creates an option element for a select dropdown.
 * @param optionText The display text for the option.
 * @param optionValue The value attribute for the option (defaults to optionText if not provided).
 * @returns An HTMLOptionElement with the specified text and value.
 */
export function getSelectOption(
	optionText: string,
	optionValue?: string,
): HTMLOptionElement {
	const option = document.createElement('option');

	option.textContent = optionText;
	option.value = optionValue ?? optionText;

	return option;
}

/**
 * Calculates the effective armor class including dexterity modifiers and bonuses.
 * @param armorClass The armor class object containing base AC and modifier rules.
 * @param dexModifier The character's dexterity modifier (optional).
 * @returns The effective armor class value.
 */
export function getEffectiveArmorClass(
	armorClass: ArmorClass,
	dexModifier?: number,
): number {
	if (!armorClass.dex_bonus) {
		return armorClass.base;
	}

	return (
		armorClass.base +
		(armorClass.max_bonus
			? Math.min(armorClass.max_bonus, dexModifier!)
			: dexModifier!)
	);
}

/**
 * Generates a human-readable display string for armor class information.
 * @param armorClass The armor class object to generate a display string for.
 * @returns A formatted string showing the armor class and any modifiers (e.g., "15 + DEX (max 2)").
 */
export function getArmorClassDisplayString(armorClass: ArmorClass): string {
	if (!armorClass.dex_bonus) {
		return armorClass.base.toString();
	}

	if (!armorClass.max_bonus) {
		return `${armorClass.base} + DEX`;
	}

	return `${armorClass.base} + DEX (max ${armorClass.max_bonus})`;
}

/**
 * Determines if a weapon has the finesse property, allowing it to use multiple abilities.
 * @param weapon The weapon object to check.
 * @returns True if the weapon can use multiple abilities (has finesse property), false otherwise.
 */
export function weaponGetHasMultipleAbilities(weapon: Weapon): boolean {
	return weapon.properties.some((property) => property.index === 'finesse');
}

/**
 * Determines the standard ability score used for a weapon attack.
 * Melee weapons typically use Strength, ranged weapons use Dexterity.
 * @param weapon The weapon object to determine the standard ability for.
 * @returns The ability score abbreviation ("str" for Strength, "dex" for Dexterity).
 */
export function weaponGetStandardAbility(weapon: Weapon): string {
	if (weapon.weapon_range === 'Melee') {
		return 'str';
	}

	return 'dex';
}

/**
 * Creates a group of options for a select element with a label.
 * @param label The label text for the option group.
 * @param options The array of option objects to include in the group.
 * @param getOptionTextAndValueFunc Function to extract display text and value from each option object.
 * @returns An HTMLOptGroupElement containing all the options.
 */
function getSelectOptionGroup(
	label: string,
	options: any,
	getOptionTextAndValueFunc: {
		(obj: BaseResource): { optionText: string; optionValue: string };
	},
): HTMLOptGroupElement {
	const optGroup = document.createElement('optgroup');

	optGroup.label = label;

	for (const option of options) {
		const { optionText, optionValue } = getOptionTextAndValueFunc(option);
		optGroup.appendChild(getSelectOption(optionText, optionValue));
	}

	return optGroup;
}
