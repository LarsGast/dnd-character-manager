import { BaseResource } from "../../../../../types/domain/wrappers/BaseResource.js";
import { ResourceList } from "../../../../../types/domain/wrappers/ResourceList.js";
import { getTooltipSpan } from "../../services/FormElementsBuilder.js";
import { ObjectSelect } from "./ObjectSelect.js";

/**
 * Custom element for a section that allows linking multiple objects.
 * It provides a way to select objects from a list of possible objects and manage them.
 */
export class LinkedObjectsSection extends HTMLElement {
    possibleObjects: ResourceList;

    /**
     * Creates an instance of LinkedObjectsSection.
     * @param label The label for the section.
     * @param possibleObjects The list of possible objects to select from.
     * @param selectedObjects The list of objects that are currently selected
     */
    constructor(label: string, possibleObjects: ResourceList, selectedObjects: BaseResource[], tooltip: string) {
        super();
        
        this.possibleObjects = possibleObjects;

        this.appendChild(this.getSectionLabel(label, tooltip));
        this.appendChild(this.getAddButton());

        for (const selectedObject of selectedObjects) {
            this.addObjectSelect(selectedObject);
        }
    }

    /**
     * Creates a label for the section with the given text and optional tooltip.
     * @param labelText The text for the label.
     * @param tooltip Optional tooltip text for the label.
     * @returns The label element with the specified text and tooltip.
     */
    getSectionLabel(labelText: string, tooltip: string): HTMLLabelElement {
        const label = document.createElement('label');

        label.textContent = labelText;

        label.appendChild(getTooltipSpan(tooltip));

        return label;
    }

    /**
     * Creates a button to add a new object select element.
     * @returns The button element that, when clicked, will add a new object select element.
     */
    getAddButton(): HTMLButtonElement {
        const button = document.createElement('button');

        button.textContent = "Add";
        button.type = "button";
        button.onclick = () => { this.addObjectSelect() };

        return button;
    }

    /**
     * Adds a new ObjectSelect element to the section.
     * @param selectedObject Optional default value for the new ObjectSelect
     */
    addObjectSelect(selectedObject?: BaseResource): void {
        this.appendChild(new ObjectSelect(this.possibleObjects, selectedObject));
    }

    /**
     * Gets the form data from the linked objects section.
     * @returns An array of ApiObjectInfo objects containing the selected values.
     */
    getValue(): BaseResource[] {
        const objectSelects: ObjectSelect[] = Array.from(this.querySelectorAll('object-select'));

        return objectSelects.map(objectSelect => objectSelect.getValue());
    }
}

customElements.define('linked-objects-section', LinkedObjectsSection);