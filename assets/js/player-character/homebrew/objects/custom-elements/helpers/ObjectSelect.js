import { ApiBaseObjectList } from "../../../../objects/api/resources/ApiBaseObject.js";
import { ApiObjectInfo } from "../../../../objects/api/resources/ApiObjectInfo.js";
import { getEmptyOption, populateSelectWithApiObjects } from "../../../../util.js";

/**
 * Custom element for selecting an object from a list of possible objects.
 * It allows the user to select an object and provides a delete button to remove the selection.
 */
export class ObjectSelect extends HTMLElement {

    /**
     * Creates an instance of ObjectSelect.
     * @param {ApiBaseObjectList} possibleObjects The list of possible objects to select from
     * @param {ApiObjectInfo} selectedObject The object that is currently selected, if any.
     */
    constructor(possibleObjects, selectedObject) {
        super();
        
        /** @type {ApiBaseObjectList} */
        this.possibleObjects = possibleObjects;

        this.select = this.getSelect(selectedObject);
        this.deleteButton = this.getDeleteButton();

        this.appendChild(this.select);
        this.appendChild(this.deleteButton);
    }

    /**
     * Creates a select element populated with the possible objects.
     * @param {ApiObjectInfo} defaultValue The default value to set in the select
     * @returns {HTMLSelectElement} The select element with options for each possible object.
     */
    getSelect(defaultValue) {
        const select = document.createElement('select');

        select.appendChild(getEmptyOption());

        populateSelectWithApiObjects(select, this.possibleObjects);

        select.value = defaultValue?.index ?? null;

        return select;
    }

    /**
     * Creates a delete button to remove the object select element.
     * @returns {HTMLButtonElement} The button element that, when clicked, will remove this element from the DOM.
     */
    getDeleteButton() {
        const button = document.createElement('button');

        button.textContent = "Remove";
        button.onclick = () => { this.remove() };

        return button;
    }

    /**
     * Gets the value of the selected object.
     * @returns {ApiObjectInfo} An ApiObjectInfo object containing the index and name of the selected object.
     */
    getValue() {
        const data = new ApiObjectInfo();

        data.index = this.select.value;
        data.name = this.select.options[this.select.selectedIndex].text;

        return data;
    }
}

customElements.define('object-select', ObjectSelect);