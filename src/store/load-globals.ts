import { PlayerCharacterBank } from './PlayerCharacterBank.js';
import { PlayerCharacter } from '../types/PlayerCharacter.js';

/**
 * Global variables and application state management.
 * Provides centralized access to the player character bank and active character.
 */
export const globals = {
	/**
	 * Global singleton instance of the player character bank.
	 * Contains all player characters, both active and inactive.
	 */
	playerCharacterBank: PlayerCharacterBank.load(),

	/**
	 * The currently active player character.
	 * This is a reference to a character within the player bank, so changes made to this object will be automatically saved when the bank is saved.
	 */
	get activePlayerCharacter(): PlayerCharacter {
		return this.playerCharacterBank.getActivePlayerCharacterBankEntry()
			.playerCharacter;
	},
};
