import { ApiBaseObjectList } from './objects/api/resources/ApiBaseObject.js'

/**
 * Create an HTML element and add a value to the the textContent property.
 * @param {HTMLElementTagNameMap} tagName 
 * @param {string} textContent 
 * @returns {HTMLElement}
 */
export const getElementWithTextContent = function(tagName, textContent) {
    const element = document.createElement(tagName);

    element.textContent = textContent;

    return element;
}

/**
 * Populate a select element with options from a list of ApiBaseObject instances.
 * @param {HTMLSelectElement} select The select element to populate.
 * @param {ApiBaseObjectList} options The list of ApiBaseObject instances to populate the select with.
 */
export const populateSelectWithApiObjects = function(select, options) {

    select.appendChild(getSelectOptionGroup("SRD", options.srdObjects, (obj) => obj.getOptionTextAndValueFunc()));

    if (options.homebrewObjects.length > 0) {
        select.appendChild(getSelectOptionGroup("Homebrew", options.homebrewObjects, (obj) => obj.getOptionTextAndValueFunc()));
    }
}

/**
 * Get an empty option for select elements.
 * @param {string} customText Text that the user sees in this option.
 * @param {string} customValue Value of the option.
 * @returns {HTMLOptionElement}
 */
export const getEmptyOption = function(customText = "-- Select an option --", customValue = null) {

    const emptyOption = document.createElement('option');

    emptyOption.value = customValue;
    emptyOption.disabled = true;
    emptyOption.selected = true;
    emptyOption.textContent = customText;

    return emptyOption;
}

/**
 * Get an option for a select element.
 * @param {string} optionText Text that the user sees.
 * @param {string} optionValue Hidden value/ identifier of the option.
 * @returns {HTMLOptionElement} 
 */
export const getSelectOption = function(optionText, optionValue) {
    const option = document.createElement('option');

    option.textContent = optionText;
    option.value = optionValue ?? optionText;

    return option;
}

/**
 * Get a group of options for a select element.
 * @template T
 * @param {string} label Label of the group.
 * @param {T[]} options Array of objects with name and index properties.
 * @param {(option: T) => {optionText: string, optionValue: string}} getOptionTextAndValueFunc Function to get the name and index from an option object.
 * @returns {HTMLOptGroupElement}
 */
const getSelectOptionGroup = function(label, options, getOptionTextAndValueFunc) {
    const optGroup = document.createElement('optgroup');

    optGroup.label = label;

    for (const option of options) {
        const { optionText, optionValue } = getOptionTextAndValueFunc(option);
        optGroup.appendChild(getSelectOption(optionText, optionValue));
    }

    return optGroup;
}