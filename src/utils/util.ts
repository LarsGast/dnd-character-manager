import { ApiBaseObjectList } from '../types/api/resources/ApiBaseObject.js'

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
 * Populate a select element with options from a list of ApiBaseObject instances.
 * @param select The select element to populate.
 * @param options The list of ApiBaseObject instances to populate the select with.
 */
export function populateSelectWithApiObjects(select: HTMLSelectElement, options: ApiBaseObjectList) {

    select.appendChild(getSelectOptionGroup("SRD", options.srdObjects, (obj: { getOptionTextAndValueFunc: () => any; }) => obj.getOptionTextAndValueFunc()));

    if (options.homebrewObjects.length > 0) {
        select.appendChild(getSelectOptionGroup("Homebrew", options.homebrewObjects, (obj: { getOptionTextAndValueFunc: () => any; }) => obj.getOptionTextAndValueFunc()));
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

/**
 * Get a group of options for a select element.
 * @param label Label of the group.
 * @param getOptionTextAndValueFunc Function to get the name and index from an option object.
 * @returns
 */
function getSelectOptionGroup(
    label: string, 
    options: any,
    getOptionTextAndValueFunc: { (obj: any): any; (obj: any): any; (arg0: any): { optionText: any; optionValue: any; }; 
}): HTMLOptGroupElement {
    const optGroup = document.createElement('optgroup');

    optGroup.label = label;

    for (const option of options) {
        const { optionText, optionValue } = getOptionTextAndValueFunc(option);
        optGroup.appendChild(getSelectOption(optionText, optionValue));
    }

    return optGroup;
}