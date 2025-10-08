import { getEmptyOption, getSelectOption } from '../../../../../utils/util';

/**
 * Custom select element for choosing the type of homebrew object.
 * This select will be used in the homebrew creation form to select the type of object (
 */
export class HomebrewTypeSelect extends HTMLSelectElement {
	constructor() {
		super();

		this.appendChild(this.getAllOptions());
		this.onchange = () => this.handleChange();
	}

	/**
	 * Handles the change event of the select element.
	 * Dispatches a custom event to notify that the type has changed.
	 */
	handleChange(): void {
		document.dispatchEvent(
			new CustomEvent('customElementTypeChanged', {
				detail: {
					apiCategoryName: this.value,
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
	getAllOptions(): DocumentFragment {
		const fragment = document.createDocumentFragment();

		fragment.appendChild(getEmptyOption('-- Select a type --'));
		fragment.appendChild(this.getTypeSelectOptions());

		return fragment;
	}

	/**
	 * Creates the options for each API category.
	 * @returns A fragment containing the options for each API category.
	 */
	getTypeSelectOptions(): DocumentFragment {
		const fragment = document.createDocumentFragment();

		fragment.appendChild(this.getTypeSelectOption('races', 'race'));
		fragment.appendChild(this.getTypeSelectOption('subclasses', 'subclass'));

		return fragment;
	}

	/**
	 * Creates a select option for a given resource type.
	 * @param resourceType The resource type to create the option for.
	 * @param resourceTypeSingularName Singular name of the resource type.
	 * @returns The created option element.
	 */
	getTypeSelectOption(
		resourceType: string,
		resourceTypeSingularName: string,
	): HTMLOptionElement {
		return getSelectOption(resourceTypeSingularName, resourceType);
	}
}

customElements.define('homebrew-object-type-select', HomebrewTypeSelect, {
	extends: 'select',
});
