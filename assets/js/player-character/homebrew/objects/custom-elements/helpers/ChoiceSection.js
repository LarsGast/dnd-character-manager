import { Choice, OptionSet } from "../../../../objects/api/helpers/Choice.js";
import { ApiObjectInfo } from "../../../../objects/api/resources/ApiObjectInfo.js";
import { getTooltipSpan } from "../FormElementsBuilder.js";
import { ChoiceOptionElement } from "./ChoiceOptionElement.js";

/**
 * Custom element for a choice section.
 * It allows the user to select a number of options from a list of possible objects.
 */
export class ChoiceSection extends HTMLElement {

    /**
     * Creates an instance of ChoiceSection.
     * @param {string} sectionLabel The label for the section.
     * @param {ApiBaseObjectList} possibleObjects The list of possible objects to choose from.
     * @param {Choice} defaultValue The default choice value to initialize the section.
     * @param {string} tooltip Optional tooltip text for the section.
     */
    constructor(sectionLabel, possibleObjects, defaultValue, tooltip) {
        super();

        /** @type {ApiBaseObjectList} */
        this.possibleObjects = possibleObjects;

        /** @type {Choice} */
        this.defaultValue = defaultValue;

        this.descTextarea = this.getDescTextarea();
        this.chooseInput = this.getChooseInput();
        this.typeInput = this.getTypeInput();
        
        this.appendChild(this.getLabel(sectionLabel, tooltip));
        this.appendChild(this.getLabel("Description", "Description of the choice to be made."));
        this.appendChild(this.descTextarea);
        this.appendChild(this.getLabel("Choose", "Number of items to pick from the list."));
        this.appendChild(this.chooseInput);
        this.appendChild(this.getLabel("Type", "Type of the resources to choose from. e.g. 'language', 'skill'."));
        this.appendChild(this.typeInput);
        this.appendChild(this.getLabel("Options", "List of options to choose from."));
        this.appendChild(this.getAddOptionButton());

        for (const option of this.defaultValue.from.options) {
            this.addOption(option.item);
        }
    }

    /**
     * Creates a label element with the given text and optional tooltip.
     * @param {string} labelText The text for the label.
     * @param {string} tooltip Optional tooltip text for the label.
     * @returns {HTMLLabelElement} The label element with the specified text and tooltip.
     */
    getLabel(labelText, tooltip) {
        const label = document.createElement('label');

        label.textContent = labelText;

        label.appendChild(getTooltipSpan(tooltip));

        return label;
    }

    /**
     * Creates a textarea element for the description of the choice.
     * @returns {HTMLTextAreaElement} The textarea element for the description.
     */
    getDescTextarea() {
        const textarea = document.createElement('textarea');

        textarea.value = this.defaultValue.desc;

        return textarea;
    }

    /**
     * Creates an input element for the number of choices to make.
     * @returns {HTMLInputElement} The input element for the number of choices.
     */
    getChooseInput() {
        const input = document.createElement('input');

        input.type = 'number';
        input.value = this.defaultValue.choose;

        return input;
    }

    /**
     * Creates an input element for the type of the choice.
     * @returns {HTMLInputElement} The input element for the type of the choice.
     */
    getTypeInput() {
        const input = document.createElement('input');

        input.value = this.defaultValue.type;

        return input;
    }

    /**
     * Creates a button to add a new choice option.
     * @returns {HTMLButtonElement} The button element that, when clicked, will add a new choice option element.
     */
    getAddOptionButton() {
        const button = document.createElement('button');

        button.textContent = "Add";
        button.type = "button";
        button.onclick = () => { this.addOption() };

        return button;
    }

    /**
     * Adds a new choice option element to the section.
     * @param {ApiObjectInfo} defaultValue The default value to set in the new choice option element.
     */
    addOption(defaultValue) {
        this.appendChild(new ChoiceOptionElement(this.possibleObjects, defaultValue));
    }

    /**
     * Gets the form data from the choice section.
     * @returns {Choice} The constructed Choice object containing the description, number of choices,
     */
    getValue() {

        const choice = new Choice();

        choice.desc = this.descTextarea.value;
        choice.choose = parseInt(this.chooseInput.value);
        choice.type = this.typeInput.value;

        const optionSet = new OptionSet();
        optionSet.option_set_type = "options_array";

        /** @type {ChoiceOptionElement[]} */
        const options = Array.from(this.querySelectorAll('choice-option-element'));
        optionSet.options = options.map(option => option.getValue());

        choice.from = optionSet;

        return choice;
    }
}

customElements.define('choice-section', ChoiceSection);