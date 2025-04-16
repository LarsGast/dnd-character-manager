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
 * Get an empty option for select elements.
 * @returns {HTMLOptionElement}
 */
export const getEmptyOption = function() {

    const emptyOption = document.createElement('option');

    emptyOption.value = null;
    emptyOption.disabled = true;
    emptyOption.selected = true;
    emptyOption.textContent = "-- Select an option --";

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