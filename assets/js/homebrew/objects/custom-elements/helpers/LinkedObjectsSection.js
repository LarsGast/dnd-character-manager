import { ApiBaseObjectList } from "../../../../objects/api/resources/ApiBaseObject.js";
import { ApiObjectInfo } from "../../../../objects/api/resources/ApiObjectInfo.js";
import { getTooltipSpan } from "../FormElementsBuilder.js";
import { ObjectSelect } from "./ObjectSelect.js";

/**
 * Custom element for a section that allows linking multiple objects.
 * It provides a way to select objects from a list of possible objects and manage them.
 */
export class LinkedObjectsSection extends HTMLElement {

    /**
     * Creates an instance of LinkedObjectsSection.
     * @param {string} label The label for the section.
     * @param {ApiBaseObjectList} possibleObjects The list of possible objects to select from.
     * @param {ApiObjectInfo[]} selectedObjects The list of objects that are currently selected
     */
    constructor(label, possibleObjects, selectedObjects, tooltip) {
        super();
        
        /** @type {ApiBaseObjectList} */
        this.possibleObjects = possibleObjects;

        this.appendChild(this.getSectionLabel(label, tooltip));
        this.appendChild(this.getAddButton());

        for (const selectedObject of selectedObjects) {
            this.addObjectSelect(selectedObject);
        }
    }

    /**
     * Creates a label for the section with the given text and optional tooltip.
     * @param {string} labelText The text for the label.
     * @param {string} tooltip Optional tooltip text for the label.
     * @returns {HTMLLabelElement} The label element with the specified text and tooltip.
     */
    getSectionLabel(labelText, tooltip) {
        const label = document.createElement('label');

        label.textContent = labelText;

        label.appendChild(getTooltipSpan(tooltip));

        return label;
    }

    /**
     * Creates a button to add a new object select element.
     * @returns {HTMLButtonElement} The button element that, when clicked, will add a new object select element.
     */
    getAddButton() {
        const button = document.createElement('button');

        button.textContent = "Add";
        button.type = "button";
        button.onclick = () => { this.addObjectSelect() };

        return button;
    }

    /**
     * Adds a new ObjectSelect element to the section.
     * @param {ApiObjectInfo} selectedObject Optional default value for the new ObjectSelect
     */
    addObjectSelect(selectedObject) {
        this.appendChild(new ObjectSelect(this.possibleObjects, selectedObject));
    }

    /**
     * Gets the form data from the linked objects section.
     * @returns {ObjectSelect[]} An array of ObjectSelect objects containing the selected values.
     */
    getValue() {
        /** @type {ObjectSelect[]} */
        const objectSelects = Array.from(this.querySelectorAll('object-select'));

        return objectSelects.map(objectSelect => objectSelect.getValue());
    }
}

customElements.define('linked-objects-section', LinkedObjectsSection);