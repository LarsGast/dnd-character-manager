import {
	homebrewRepository,
	resourceTypeRecordTranscriber,
} from '../../../../../wiring/dependencies';

/**
 * Custom heading element for homebrew forms.
 * This element displays the title of the form based on the active homebrew entry's API category.
 *
 * Extends <h2>.
 */
export class HomebrewFormHeading extends HTMLHeadingElement {
	constructor() {
		super();

		const params = new URLSearchParams(window.location.search);
		const id = params.get('id')!;
		const homebrewObject = homebrewRepository.get(id)!;
		const resourceTypeName =
			resourceTypeRecordTranscriber.transcribeToHumanReadableString(
				homebrewObject.resourceType,
			);

		this.textContent = `Custom ${resourceTypeName}`;
	}
}

customElements.define('homebrew-object-form-heading', HomebrewFormHeading, {
	extends: 'h2',
});
