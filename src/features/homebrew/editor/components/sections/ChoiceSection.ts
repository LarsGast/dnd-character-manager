import { Choice } from '../../../../../types/domain/helpers/Choice.js';
import { BaseResource } from '../../../../../types/domain/wrappers/BaseResource.js';
import { ResourceList } from '../../../../../types/domain/wrappers/ResourceList.js';
import {
	ChoiceRecord,
	OptionSetRecord,
} from '../../../../../types/storage/helpers/ChoiceRecord.js';
import { getTooltipSpan } from '../../services/FormElementsBuilder.js';
import { ChoiceOptionElement } from './ChoiceOptionElement.js';

/**
 * Custom element for a choice section.
 * It allows the user to select a number of options from a list of possible objects.
 */
export class ChoiceSection extends HTMLElement {
	possibleObjects: ResourceList;
	defaultValue?: Choice;
	descTextarea: HTMLTextAreaElement;
	chooseInput: HTMLInputElement;
	typeInput: HTMLInputElement;

	/**
	 * Creates an instance of ChoiceSection.
	 * @param sectionLabel The label for the section.
	 * @param possibleObjects The list of possible objects to choose from.
	 * @param tooltip Optional tooltip text for the section.
	 * @param defaultValue The default choice value to initialize the section.
	 */
	constructor(
		sectionLabel: string,
		possibleObjects: ResourceList,
		tooltip: string,
		defaultValue?: Choice,
	) {
		super();

		this.possibleObjects = possibleObjects;
		this.defaultValue = defaultValue;

		this.descTextarea = this.getDescTextarea();
		this.chooseInput = this.getChooseInput();
		this.typeInput = this.getTypeInput();

		this.appendChild(this.getLabel(sectionLabel, tooltip));
		this.appendChild(
			this.getLabel('Description', 'Description of the choice to be made.'),
		);
		this.appendChild(this.descTextarea);
		this.appendChild(
			this.getLabel('Choose', 'Number of items to pick from the list.'),
		);
		this.appendChild(this.chooseInput);
		this.appendChild(
			this.getLabel(
				'Type',
				"Type of the resources to choose from. e.g. 'language', 'skill'.",
			),
		);
		this.appendChild(this.typeInput);
		this.appendChild(
			this.getLabel('Options', 'List of options to choose from.'),
		);
		this.appendChild(this.getAddOptionButton());

		for (const option of this.defaultValue?.from.options ?? []) {
			this.addOption(option.item);
		}
	}

	/**
	 * Creates a label element with the given text and optional tooltip.
	 * @param labelText The text for the label.
	 * @param tooltip Optional tooltip text for the label.
	 * @returns The label element with the specified text and tooltip.
	 */
	getLabel(labelText: string | null, tooltip: string): HTMLLabelElement {
		const label = document.createElement('label');

		label.textContent = labelText;

		label.appendChild(getTooltipSpan(tooltip));

		return label;
	}

	/**
	 * Creates a textarea element for the description of the choice.
	 * @returns The textarea element for the description.
	 */
	getDescTextarea(): HTMLTextAreaElement {
		const textarea = document.createElement('textarea');

		textarea.value = this.defaultValue?.desc ?? '';

		return textarea;
	}

	/**
	 * Creates an input element for the number of choices to make.
	 * @returns The input element for the number of choices.
	 */
	getChooseInput(): HTMLInputElement {
		const input = document.createElement('input');

		input.type = 'number';
		input.value = this.defaultValue?.choose?.toString() ?? '';

		return input;
	}

	/**
	 * Creates an input element for the type of the choice.
	 * @returns The input element for the type of the choice.
	 */
	getTypeInput(): HTMLInputElement {
		const input = document.createElement('input');

		input.value = this.defaultValue?.type ?? '';

		return input;
	}

	/**
	 * Creates a button to add a new choice option.
	 * @returns The button element that, when clicked, will add a new choice option element.
	 */
	getAddOptionButton(): HTMLButtonElement {
		const button = document.createElement('button');

		button.textContent = 'Add';
		button.type = 'button';
		button.onclick = () => {
			this.addOption();
		};

		return button;
	}

	/**
	 * Adds a new choice option element to the section.
	 * @param defaultValue The default value to set in the new choice option element.
	 */
	addOption(defaultValue?: BaseResource) {
		this.appendChild(
			new ChoiceOptionElement(this.possibleObjects, defaultValue),
		);
	}

	/**
	 * Gets the form data from the choice section.
	 * @returns The constructed Choice object containing the description, number of choices,
	 */
	getValue(): ChoiceRecord {
		const options: ChoiceOptionElement[] = Array.from(
			this.querySelectorAll('choice-option-element'),
		);

		const optionSet: OptionSetRecord = {
			option_set_type: 'options_array',
			options: options.map((option) => option.getValue()),
		};

		const choice: ChoiceRecord = {
			desc: this.descTextarea.value,
			choose: parseInt(this.chooseInput.value),
			type: this.typeInput.value,
			from: optionSet,
		};

		return choice;
	}
}

customElements.define('choice-section', ChoiceSection);
