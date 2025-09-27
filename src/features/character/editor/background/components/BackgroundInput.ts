import {
	getEmptyOption,
	populateSelectWithApiObjects,
} from '../../../../../utils/util.js';
import { globals } from '../../../../../store/load-globals.js';
import { backgroundRepository } from '../../../../../wiring/dependencies.js';

/**
 * Custom select element for choosing a character background.
 * Extends the built-in HTMLSelectElement.
 *
 * This element loads all available backgrounds asynchronously, populates its options, and reflects the PC's current background selection.
 * It dispatches a "backgroundUpdated" event when the value is changed.
 */
export class BackgroundInput extends HTMLSelectElement {
	constructor() {
		super();

		// Bind the onchange event to update the global background.
		this.onchange = () => this.handleChange();
	}

	/**
	 * Called when the element is connected to the DOM.
	 * Loads all backgrounds and sets up the select options.
	 */
	async connectedCallback(): Promise<void> {
		// Retrieve all backgrounds.
		const allBackgrounds = await backgroundRepository.getAllAsync();

		// Add an empty option at the top.
		this.appendChild(getEmptyOption());

		// Populate the select element with background options.
		populateSelectWithApiObjects(this, allBackgrounds);

		// Set the current value from the active player's data.
		this.value = globals.activePlayerCharacter.background ?? 'null';
	}

	/**
	 * Handles selection changes.
	 * Updates the player's background and dispatches a "backgroundUpdated" event.
	 */
	handleChange(): void {
		globals.activePlayerCharacter.setProperty('background', this.value);
		document.dispatchEvent(new Event('backgroundUpdated'));
	}
}

// Define the custom element with the "select" extension.
customElements.define('background-input', BackgroundInput, {
	extends: 'select',
});
