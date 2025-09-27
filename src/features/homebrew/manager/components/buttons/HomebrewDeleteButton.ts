/**
 * Custom HTML element for displaying and handling the button to open the Homebrew Delete Dialog.
 * Extends HTMLButtonElement.
 */
export class HomebrewDeleteButton extends HTMLButtonElement {
	homebrewId: string;

	constructor(homebrewId: string) {
		super();

		// Set type and text.
		this.homebrewId = homebrewId;
		this.type = 'button';
		this.textContent = 'Delete';

		// Bind click event to trigger the delete dialog.
		this.onclick = () => this.handleClick();
	}

	/**
	 * Handles the button click and dispatches a "homebrewDeleteButtonClicked" event.
	 */
	handleClick(): void {
		document.dispatchEvent(
			new CustomEvent('homebrewDeleteButtonClicked', {
				detail: {
					homebrewId: this.homebrewId,
				},
				bubbles: true,
			}),
		);
	}
}

customElements.define('homebrew-object-delete-button', HomebrewDeleteButton, {
	extends: 'button',
});
