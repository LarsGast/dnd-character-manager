import { ArmorClass } from '../types/domain/resources/Armor.js';
import { Weapon } from '../types/domain/resources/Weapon.js';
import { BaseResource } from '../types/domain/wrappers/BaseResource.js';
import { ResourceList } from '../types/domain/wrappers/ResourceList.js';

/**
 * Create an HTML element and add a value to the the textContent property.
 * @param tagName 
 * @param textContent 
 * @returns
 */
export function getElementWithTextContent(tagName: string, textContent: string | null): HTMLElement {
    const element = document.createElement(tagName);

    element.textContent = textContent;

    return element;
}

/**
 * Populate a select element with options from a list of resources.
 * @param select The select element to populate.
 * @param resourceList The list of resources to populate the select with.
 */
export function populateSelectWithApiObjects(select: HTMLSelectElement, resourceList: ResourceList) {

    const srdResources = resourceList.results.filter(resource => !resource.isHomebrew);
    const homebrewResources = resourceList.results.filter(resource => resource.isHomebrew);

    const getOptionTextAndValueFunc = (obj: BaseResource): { optionText: string; optionValue: string; } => {
        return {
            optionText: obj.name,
            optionValue: obj.index
        }
    };

    select.appendChild(getSelectOptionGroup("SRD", srdResources, getOptionTextAndValueFunc));

    if (homebrewResources.length > 0) {
        select.appendChild(getSelectOptionGroup("Homebrew", homebrewResources, getOptionTextAndValueFunc));
    }
}

/**
 * Get an empty option for select elements.
 * @param customText Text that the user sees in this option.
 * @param customValue Value of the option.
 * @returns {HTMLOptionElement}
 */
export function getEmptyOption(customText: string = "-- Select an option --", customValue: string = "null"): HTMLOptionElement {

    const emptyOption = document.createElement('option');

    emptyOption.value = customValue;
    emptyOption.disabled = true;
    emptyOption.selected = true;
    emptyOption.textContent = customText;

    return emptyOption;
}

/**
 * Get an option for a select element.
 * @param optionText Text that the user sees.
 * @param optionValue Hidden value/ identifier of the option.
 * @returns
 */
export function getSelectOption(optionText: string, optionValue?: string): HTMLOptionElement {
    const option = document.createElement('option');

    option.textContent = optionText;
    option.value = optionValue ?? optionText;

    return option;
}

export function getEffectiveArmorClass(armorClass: ArmorClass, dexModifier?: number): number {
    if (!armorClass.dex_bonus) {
        return armorClass.base;
    }
    
    return armorClass.base + (armorClass.max_bonus ? Math.min(armorClass.max_bonus, dexModifier!) : dexModifier!);
}

export function getArmorClassDisplayString(armorClass: ArmorClass): string {
    if (!armorClass.dex_bonus) {
        return armorClass.base.toString();
    }

    if (!armorClass.max_bonus) {
        return `${armorClass.base} + DEX`;
    }

    return `${armorClass.base} + DEX (max ${armorClass.max_bonus})`;
}

export function weaponGetHasMultipleAbilities(weapon: Weapon): boolean {
    return weapon.properties.some(property => property.index === "finesse");
}

export function weaponGetStandardAbility(weapon: Weapon): string {
    if (weapon.weapon_range === "Melee") {
        return "str";
    }

    return "dex";
}

/**
 * Get a group of options for a select element.
 * @param label Label of the group.
 * @param getOptionTextAndValueFunc Function to get the name and index from an option object.
 * @returns
 */
function getSelectOptionGroup(
    label: string, 
    options: any,
    getOptionTextAndValueFunc: { (obj: BaseResource): { optionText: string; optionValue: string; }; 
}): HTMLOptGroupElement {
    const optGroup = document.createElement('optgroup');

    optGroup.label = label;

    for (const option of options) {
        const { optionText, optionValue } = getOptionTextAndValueFunc(option);
        optGroup.appendChild(getSelectOption(optionText, optionValue));
    }

    return optGroup;
}