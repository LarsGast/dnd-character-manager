import { ResourceTypeRecord } from '../../../../../types/storage/helpers/ResourceTypeRecord';
import { homebrewRepository } from '../../../../../wiring/dependencies';
import { createDefaultHomebrewRecord } from '../../../../../utils/createDefaultHomebrewRecord';

/**
 * Custom HTML button element for creating new homebrew objects.
 * Extends HTMLButtonElement to provide functionality for adding custom content to the homebrew repository.
 */
export class NewHomebrewButton extends HTMLButtonElement {
	/**
	 * Event handler for custom element type changes.
	 * This is used to track changes to the homebrew category selection.
	 */
	_updateHandler?: (event: any) => void;

	/**
	 * The API category name for the type of homebrew object being created.
	 */
	resourceType?: ResourceTypeRecord;

	constructor() {
		super();

		// Set type and display text.
		this.disabled = true;
		this.type = 'button';
		this.textContent = 'New';

		// Bind click event to add a default object to the bank.
		this.onclick = () => this.handleClick();
	}

	/**
	 * Called when the element is connected to the DOM.
	 * Listens for the "customElementTypeChanged" event to show the dialog.
	 */
	connectedCallback(): void {
		this._updateHandler = (event) => this.updateButtonData(event);
		document.addEventListener('customElementTypeChanged', this._updateHandler);
	}

	/**
	 * Called when the element is disconnected from the DOM.
	 * Removes the event listener.
	 */
	disconnectedCallback(): void {
		document.removeEventListener(
			'customElementTypeChanged',
			this._updateHandler!,
		);
	}

	/**
	 * Updates the button state based on the selected homebrew category.
	 * Enables the button and sets the API category name when a valid category is selected.
	 * @param event The custom event containing the selected API category information.
	 */
	updateButtonData(event: CustomEvent): void {
		// The ID is the number representation of the ResourceTypeRecord enum.
		const resourceTypeId = Number(event.detail.resourceTypeId);
		this.resourceType = resourceTypeId as ResourceTypeRecord;
		this.disabled = false;
	}

	/**
	 * Handles the button click event by creating and saving a new homebrew object.
	 * Creates a new resource with a unique ID and default properties, then dispatches an event.
	 */
	handleClick(): void {
		const newHomebrewResource = createDefaultHomebrewRecord(this.resourceType!);

		homebrewRepository.save(newHomebrewResource.id, newHomebrewResource);

		document.dispatchEvent(new Event('newHomebrewCreated'));
	}
}

customElements.define('new-homebrew-object-button', NewHomebrewButton, {
	extends: 'button',
});
