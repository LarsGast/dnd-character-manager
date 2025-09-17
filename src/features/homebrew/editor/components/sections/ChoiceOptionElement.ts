import { OptionApiDto } from "../../../../../types/api/helpers/ChoiceApiDto.js";
import { ApiBaseObjectList } from "../../../../../types/api/resources/ApiBaseObject.js";
import { ApiObjectInfoApiDto } from "../../../../../types/api/wrappers/ApiObjectInfoApiDto.js";
import { getEmptyOption, populateSelectWithApiObjects } from "../../../../../utils/util.js";

/**
 * Custom element for selecting a choice option.
 * It allows the user to select an object from a list of possible objects.
 */
export class ChoiceOptionElement extends HTMLElement {
    possibleObjects: ApiBaseObjectList;
    defaultValue?: ApiObjectInfoApiDto;
    select: HTMLSelectElement;
    
    /**
     * Creates an instance of ChoiceOptionElement.
     * @param possibleObjects The list of possible objects to select from
     * @param defaultValue The default value to set in the select element
     */
    constructor(possibleObjects: ApiBaseObjectList, defaultValue?: ApiObjectInfoApiDto) {
        super();
        
        this.possibleObjects = possibleObjects;
        this.defaultValue = defaultValue;
        
        this.select = this.getItemSelect();

        this.appendChild(this.select);
        this.appendChild(this.getDeleteButton());
    }

    /**
     * Gets the select element for choosing an object.
     * It populates the select options with the provided possible objects.
     * @returns The select element with options for each possible object.
     */
    getItemSelect(): HTMLSelectElement {
        const select = document.createElement('select');

        select.appendChild(getEmptyOption());

        populateSelectWithApiObjects(select, this.possibleObjects);

        select.value = this.defaultValue?.index ?? "null";

        return select;
    }

    /**
     * Creates a delete button to remove the choice option element.
     * @returns The button element that, when clicked, will remove this element from the DOM.
     */
    getDeleteButton(): HTMLButtonElement {
        const button = document.createElement('button');

        button.textContent = "Remove";
        button.onclick = () => { this.remove() };

        return button;
    }

    /**
     * Gets the value of the choice option element.
     * @returns The constructed Option object containing the selected index and name.
     */
    getValue(): OptionApiDto {
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