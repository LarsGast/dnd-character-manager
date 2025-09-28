import { BaseResource } from '../../../../../types/domain/wrappers/BaseResource.js';
import { BaseResourceRecord } from '../../../../../types/storage/wrappers/BaseResourceRecord.js';
import { homebrewRepository } from '../../../../../wiring/dependencies.js';
import {
	getTextareaSection,
	getTextInputSection,
} from '../../services/FormElementsBuilder.js';

/**
 * Base class for homebrew object forms.
 * This class provides common functionality for homebrew object forms, such as handling form submission and saving data.
 * Inherit from this class to create specific homebrew object forms.
 */
export class HomebrewBaseForm extends HTMLFormElement {
	/**
	 * The homebrew object being edited.
	 */
	homebrewObject: BaseResource;

	/**
	 * Creates an instance of HomebrewBaseForm.
	 * @param homebrewObject
	 */
	constructor(homebrewObject: BaseResource) {
		super();

		this.homebrewObject = homebrewObject;

		// "Name" is the only required field for all homebrew objects.
		this.appendChild(
			getTextInputSection(
				'Name',
				'name',
				this.homebrewObject.name,
				true,
				'Name of the homebrew object.',
			),
		);
	}

	/**
	 * Called when the form is connected to the DOM.
	 */
	connectedCallback(): void {
		this.addEventListener('submit', this.handleSubmitAsync.bind(this));

		// Add the notes section and save button on the bottom of the form.
		this.appendChild(this.getNotesSection());
		this.appendChild(this.getSaveButton());
	}

	/**
	 * Handles the form submission.
	 * Prevents the default form submission behavior, collects the form data, updates the active homebrew entry, saves the homebrew bank, and reloads the page.
	 * Override this method in subclasses to add additional functionality.
	 * @param event
	 */
	async handleSubmitAsync(event: Event): Promise<void> {
		event.preventDefault();

		const data = await this.getFormDataAsync();

		homebrewRepository.save(data.id, data);

		window.location.reload();
	}

	/**
	 * Collects the form data and returns it as an ApiObjectInfo instance.
	 * Override this method in subclasses to add additional fields.
	 * @returns Homebrew object data collected from the form.
	 */
	async getFormDataAsync(): Promise<BaseResourceRecord> {
		const formData = new FormData(this);

		// Initialize a new ApiObjectInfo instance with the current homebrew object to keep the UUID the same.
		const params = new URLSearchParams(window.location.search);
		const id = params.get('id')!;
		const oldResource = homebrewRepository.get(id)!;

		return Promise.resolve({
			id: oldResource.id,
			name: formData.get('name')!.toString(),
			resourceType: oldResource.resourceType,
			notes: formData.get('notes')?.toString() ?? '',
		});
	}

	/**
	 * Creates and returns the notes section element.
	 * @returns Notes section element.
	 */
	private getNotesSection(): HTMLElement {
		return getTextareaSection(
			'Additional notes',
			'notes',
			this.homebrewObject.notes ?? '',
			false,
			'Additional notes for anything not covered by other fields.',
		);
	}

	/**
	 * Creates and returns a save button element.
	 * @returns Save button element.
	 */
	getSaveButton(): HTMLButtonElement {
		const button = document.createElement('button');

		button.type = 'submit';
		button.textContent = 'Save';

		return button;
	}
}

customElements.define('homebrew-object-base-form', HomebrewBaseForm, {
	extends: 'form',
});
