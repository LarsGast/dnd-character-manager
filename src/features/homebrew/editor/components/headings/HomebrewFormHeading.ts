import {
	homebrewRepository,
	resourceTypeRecordTranscriber,
} from '../../../../../wiring/dependencies';

/**
 * Custom heading element for homebrew forms.
 * This element displays the title of the form based on the active homebrew entry's API category.
 * In "new" mode (no ID in URL), it displays a generic heading.
 *
 * Extends <h2>.
 */
export class HomebrewFormHeading extends HTMLHeadingElement {
	constructor() {
		super();

		const params = new URLSearchParams(window.location.search);
		const id = params.get('id');

		if (!id) {
			// New mode - show generic heading
			this.textContent = 'Custom Race';
		} else {
			// Edit mode - show specific heading based on resource type
			const homebrewObject = homebrewRepository.get(id);

			if (!homebrewObject) {
				this.textContent = 'Custom Object';
				return;
			}

			const resourceTypeName =
				resourceTypeRecordTranscriber.transcribeToHumanReadableString(
					homebrewObject.resourceType,
				);

			this.textContent = `Custom ${resourceTypeName}`;
		}
	}
}

customElements.define('homebrew-object-form-heading', HomebrewFormHeading, {
	extends: 'h2',
});
