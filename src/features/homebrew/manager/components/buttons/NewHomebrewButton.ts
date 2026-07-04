/**
 * Custom HTML button element for creating new homebrew objects.
 * Extends HTMLButtonElement to provide functionality for navigating to the homebrew editor.
 */
export class NewHomebrewButton extends HTMLButtonElement {
	constructor() {
		super();

		// Set type and display text.
		this.type = 'button';
		this.textContent = 'New';

		// Bind click event to navigate to the editor page.
		this.onclick = () => this.handleClick();
	}

	/**
	 * Handles the button click event by navigating to the homebrew editor in "new" mode.
	 * No ID parameter means the editor will detect this as a new resource creation.
	 */
	handleClick(): void {
		window.location.href = 'homebrew/';
	}
}

customElements.define('new-homebrew-object-button', NewHomebrewButton, {
	extends: 'button',
});
