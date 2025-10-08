import { BaseResource } from '../../../../../types/domain/wrappers/BaseResource';
import { ResourceList } from '../../../../../types/domain/wrappers/ResourceList';
import { OptionRecord } from '../../../../../types/storage/helpers/ChoiceRecord';
import {
	BaseResourceRecord,
	HOMEBREW_RESOURCE_RECORD_VERSION,
} from '../../../../../types/storage/wrappers/BaseResourceRecord';
import {
	getEmptyOption,
	populateSelectWithApiObjects,
} from '../../../../../utils/util';

/**
 * Custom element for selecting a choice option.
 * It allows the user to select an object from a list of possible objects.
 */
export class ChoiceOptionElement extends HTMLElement {
	possibleObjects: ResourceList;
	defaultValue?: BaseResource;
	select: HTMLSelectElement;

	/**
	 * Creates an instance of ChoiceOptionElement.
	 * @param possibleObjects The list of possible objects to select from
	 * @param defaultValue The default value to set in the select element
	 */
	constructor(possibleObjects: ResourceList, defaultValue?: BaseResource) {
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

		select.value = this.defaultValue?.index ?? 'null';

		return select;
	}

	/**
	 * Creates a delete button to remove the choice option element.
	 * @returns The button element that, when clicked, will remove this element from the DOM.
	 */
	getDeleteButton(): HTMLButtonElement {
		const button = document.createElement('button');

		button.textContent = 'Remove';
		button.onclick = () => {
			this.remove();
		};

		return button;
	}

	/**
	 * Gets the value of the choice option element.
	 * @returns The constructed Option object containing the selected index and name.
	 */
	getValue(): OptionRecord {
		const item: BaseResourceRecord = {
			version: HOMEBREW_RESOURCE_RECORD_VERSION,
			id: this.select.value,
			name: this.select.options[this.select.selectedIndex].text,
			resourceType: '',
		};

		const option: OptionRecord = {
			option_type: 'reference',
			item: item,
		};

		return option;
	}
}

customElements.define('choice-option-element', ChoiceOptionElement);
