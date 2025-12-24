import { ResourceTypeRecord } from '../../../../../types/storage/helpers/ResourceTypeRecord';
import { getEmptyOption, getSelectOption } from '../../../../../utils/util';
import { resourceTypeRecordTranscriber } from '../../../../../wiring/dependencies';

/**
 * Custom select element for choosing the type of homebrew object.
 * This select will be used in the homebrew creation form to select the type of object (
 */
export class HomebrewTypeSelect extends HTMLSelectElement {
	public constructor() {
		super();

		this.appendChild(this.getAllOptions());
		this.onchange = () => this.handleChange();
	}

	/**
	 * Handles the change event of the select element.
	 * Dispatches a custom event to notify that the type has changed.
	 */
	private handleChange(): void {
		document.dispatchEvent(
			new CustomEvent('customElementTypeChanged', {
				detail: {
					resourceTypeId: this.value,
				},
				bubbles: true,
			}),
		);
	}

	/**
	 * Creates and returns all options for the select element.
	 * This includes an empty option and options for each API category.
	 * @returns A fragment containing all the options.
	 */
	private getAllOptions(): DocumentFragment {
		const fragment = document.createDocumentFragment();

		fragment.appendChild(getEmptyOption('-- Select a type --'));
		fragment.appendChild(this.getTypeSelectOptions());

		return fragment;
	}

	/**
	 * Creates the options for each API category.
	 * @returns A fragment containing the options for each API category.
	 */
	private getTypeSelectOptions(): DocumentFragment {
		const fragment = document.createDocumentFragment();

		const resourceTypes = this.getAllResourceTypes();
		for (const resourceType of resourceTypes) {
			const resourceTypeSingularName =
				resourceTypeRecordTranscriber.transcribeToHumanReadableString(
					resourceType,
				);

			// Example option: <option value="0">Race</option>
			fragment.appendChild(
				getSelectOption(resourceTypeSingularName, resourceType.toString()),
			);
		}

		return fragment;
	}

	/**
	 * Retrieves all resource types defined in ResourceTypeRecord.
	 * @returns An array of resource type strings.
	 */
	private getAllResourceTypes(): ResourceTypeRecord[] {
		return Object.values(ResourceTypeRecord).filter(
			(value) => typeof value === 'number',
		) as ResourceTypeRecord[];
	}
}

customElements.define('homebrew-object-type-select', HomebrewTypeSelect, {
	extends: 'select',
});
