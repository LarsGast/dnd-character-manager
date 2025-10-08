import { BaseResource } from '../../../../../types/domain/wrappers/BaseResource';
import { ResourceList } from '../../../../../types/domain/wrappers/ResourceList';
import {
	BaseResourceRecord,
	HOMEBREW_RESOURCE_RECORD_VERSION,
} from '../../../../../types/storage/wrappers/BaseResourceRecord';
import {
	getEmptyOption,
	populateSelectWithApiObjects,
} from '../../../../../utils/util';

/**
 * Custom element for selecting an object from a list of possible objects.
 * It allows the user to select an object and provides a delete button to remove the selection.
 */
export class ObjectSelect extends HTMLElement {
	possibleObjects: ResourceList;
	select: HTMLSelectElement;
	deleteButton: HTMLButtonElement;

	/**
	 * Creates an instance of ObjectSelect.
	 * @param possibleObjects The list of possible objects to select from
	 * @param selectedObject The object that is currently selected, if any.
	 */
	constructor(possibleObjects: ResourceList, selectedObject?: BaseResource) {
		super();

		this.possibleObjects = possibleObjects;

		this.select = this.getSelect(selectedObject);
		this.deleteButton = this.getDeleteButton();

		this.appendChild(this.select);
		this.appendChild(this.deleteButton);
	}

	/**
	 * Creates a select element populated with the possible objects.
	 * @param defaultValue The default value to set in the select
	 * @returns The select element with options for each possible object.
	 */
	getSelect(defaultValue?: BaseResource): HTMLSelectElement {
		const select = document.createElement('select');

		select.appendChild(getEmptyOption());

		populateSelectWithApiObjects(select, this.possibleObjects);

		select.value = defaultValue?.index ?? 'null';

		return select;
	}

	/**
	 * Creates a delete button to remove the object select element.
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
	 * Gets the value of the selected object.
	 * @returns An ApiObjectInfo object containing the index and name of the selected object.
	 */
	getValue(): BaseResourceRecord {
		return {
			version: HOMEBREW_RESOURCE_RECORD_VERSION,
			id: this.select.value,
			name: this.select.options[this.select.selectedIndex].text,
			resourceType: '',
		};
	}
}

customElements.define('object-select', ObjectSelect);
