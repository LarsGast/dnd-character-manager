import { globals } from '../../../../../store/load-globals.js';

/**
 * Custom HTML element for handling the button to switch between characters.
 * Extends HTMLButtonElement.
 */
export class CharacterSelectButton extends HTMLButtonElement {
	characterId: string;

	constructor(characterId: string) {
		super();

		// Set type and text.
		this.characterId = characterId;
		this.type = 'button';
		this.textContent = 'Select';

		// Bind click event to trigger the select dialog.
		this.onclick = () => this.handleClick();
	}

	/**
	 * Handles the button click.
	 * Sets the selected character to be active and reloads the page to display the new information.
	 */
	handleClick(): void {
		globals.playerCharacterBank.setActiveCharacter(this.characterId);
		globals.playerCharacterBank.save();

		window.location.reload();
	}
}

customElements.define('character-select-button', CharacterSelectButton, {
	extends: 'button',
});
