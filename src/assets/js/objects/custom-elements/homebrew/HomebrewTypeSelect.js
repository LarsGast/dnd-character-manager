import { ApiCategory } from "../../../api.js";
import { getEmptyOption, getSelectOption } from "../../../util.js";

/**
 * Custom select element for choosing the type of homebrew object.
 * This select will be used in the homebrew creation form to select the type of object (
 */
export class HomebrewTypeSelect extends HTMLSelectElement {
    
    constructor() {
        super();
        
        this.appendChild(this.getAllOptions());
        this.onchange = () => this.handleChange();
    }

    /**
     * Handles the change event of the select element.
     * Dispatches a custom event to notify that the type has changed.
     */
    handleChange() {
        document.dispatchEvent(new CustomEvent("customElementTypeChanged", {
            detail: { 
                apiCategoryName: this.value 
            },
            bubbles: true
        }));
    }

    /**
     * Creates and returns all options for the select element.
     * This includes an empty option and options for each API category.
     * @returns {DocumentFragment} A fragment containing all the options.
     */
    getAllOptions() {
        const fragment = document.createDocumentFragment();

        fragment.appendChild(getEmptyOption("-- Select a type --"));
        fragment.appendChild(this.getTypeSelectOptions());

        return fragment;
    }
    
    /**
     * Creates the options for each API category.
     * @returns {DocumentFragment} A fragment containing the options for each API category.
     */
    getTypeSelectOptions() {
        const fragment = document.createDocumentFragment();

        fragment.appendChild(this.getTypeSelectOption(ApiCategory.Races));

        return fragment;
    }

    /**
     * Creates a select option for a given API category.
     * @param {ApiCategory} apiCategory The API category to create the option for.
     * @returns {HTMLOptionElement} The created option element.
     */
    getTypeSelectOption(apiCategory) {
        return getSelectOption(apiCategory.getSingularName(), apiCategory.name);
    }
}

customElements.define('homebrew-object-type-select', HomebrewTypeSelect, { extends: 'select' });