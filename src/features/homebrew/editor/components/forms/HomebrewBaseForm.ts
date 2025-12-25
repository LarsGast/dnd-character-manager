import { BaseResource } from '../../../../../types/domain/wrappers/BaseResource';
import {
	BaseResourceRecord,
	HOMEBREW_RESOURCE_RECORD_VERSION,
} from '../../../../../types/storage/wrappers/BaseResourceRecord';
import { homebrewRepository } from '../../../../../wiring/dependencies';
import {
	getTextareaSection,
	getTextInputSection,
} from '../../services/FormElementsBuilder';
import { ResourceTypeRecord } from '../../../../../types/storage/helpers/ResourceTypeRecord';

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
	 * The resource type for this homebrew object (needed for new resources).
	 */
	resourceType?: ResourceTypeRecord;

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

		// Check if form is valid using HTML5 validation
		if (!this.checkValidity()) {
			this.reportValidity();
			return;
		}

		const data = await this.getFormDataAsync();

		homebrewRepository.save(data.id, data);

		// Check if this is a new resource (no ID in URL)
		const params = new URLSearchParams(window.location.search);
		const currentId = params.get('id');

		if (!currentId) {
			// This is a new resource - update the URL to include the new ID
			// This transitions from "new" mode to "edit" mode
			window.location.href = `?id=${data.id}`;
		} else {
			// This is an edit - just reload the page
			window.location.reload();
		}
	}

	/**
	 * Collects the form data and returns it as an ApiObjectInfo instance.
	 * Override this method in subclasses to add additional fields.
	 * @returns Homebrew object data collected from the form.
	 */
	async getFormDataAsync(): Promise<BaseResourceRecord> {
		const formData = new FormData(this);

		// Check if we're editing an existing resource or creating a new one
		const params = new URLSearchParams(window.location.search);
		const id = params.get('id');

		let resourceId: string;
		let version: number;
		let resourceType: ResourceTypeRecord;

		if (id) {
			// Editing existing resource - preserve its ID, version, and type
			const oldResource = homebrewRepository.get(id)!;
			resourceId = oldResource.id;
			version = oldResource.version;
			resourceType = oldResource.resourceType;
		} else {
			// Creating new resource - generate new ID
			resourceId = self.crypto.randomUUID();
			version = HOMEBREW_RESOURCE_RECORD_VERSION;
			resourceType = this.resourceType!;
		}

		return Promise.resolve({
			version,
			id: resourceId,
			name: formData.get('name')!.toString(),
			resourceType,
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
