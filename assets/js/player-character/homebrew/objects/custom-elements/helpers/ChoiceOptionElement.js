import { Option } from "../../../../objects/api/helpers/Choice.js";
import { ApiBaseObjectList } from "../../../../objects/api/resources/ApiBaseObject.js";
import { ApiObjectInfo } from "../../../../objects/api/resources/ApiObjectInfo.js";
import { getEmptyOption, populateSelectWithApiObjects } from "../../../../util.js";

/**
 * Custom element for selecting a choice option.
 * It allows the user to select an object from a list of possible objects.
 */
export class ChoiceOptionElement extends HTMLElement {
    
    /**
     * Creates an instance of ChoiceOptionElement.
     * @param {ApiBaseObjectList} possibleObjects The list of possible objects to select from
     * @param {ApiObjectInfo} defaultValue The default value to set in the select element
     */
    constructor(possibleObjects, defaultValue) {
        super();
        
        /** @type {ApiBaseObjectList} */
        this.possibleObjects = possibleObjects;

        /** @type {ApiObjectInfo} */
        this.defaultValue = defaultValue;
        
        this.select = this.getItemSelect();

        this.appendChild(this.select);
        this.appendChild(this.getDeleteButton());
    }

    /**
     * Gets the select element for choosing an object.
     * It populates the select options with the provided possible objects.
     * @returns {HTMLSelectElement} The select element with options for each possible object.
     */
    getItemSelect() {
        const select = document.createElement('select');

        select.appendChild(getEmptyOption());

        populateSelectWithApiObjects(select, this.possibleObjects);

        select.value = this.defaultValue?.index ?? null;

        return select;
    }

    /**
     * Creates a delete button to remove the choice option element.
     * @returns {HTMLButtonElement} The button element that, when clicked, will remove this element from the DOM.
     */
    getDeleteButton() {
        const button = document.createElement('button');

        button.textContent = "Remove";
        button.onclick = () => { this.remove() };

        return button;
    }

    /**
     * Gets the value of the choice option element.
     * @returns {Option} The constructed Option object containing the selected index and name.
     */
    getValue() {
        const option = new Option();

        option.option_type = "reference";

        const item = new ApiObjectInfo();
        item.index = this.select.value;
        item.name = this.select.options[this.select.selectedIndex].text;

        option.item = item;

        return option;
    }
}

customElements.define('choice-option-element', ChoiceOptionElement);