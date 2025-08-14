import { PlayerCharacterBank } from "./objects/PlayerCharacterBank.js";
import { PlayerCharacter } from "./objects/PlayerCharacter.js";
import { HomebrewBank, HomebrewBankEntry } from "./objects/HomebrewBank.js";

/**
 * A set of global variables to be used all across the codebase.
 */
export const globals = {

    /**
     * Global singleton of the player character bank.
     * This includes all PCs, both active and inactive.
     * @type {PlayerCharacterBank}
     */
    playerCharacterBank: PlayerCharacterBank.load(),


    /**
     * Global singleton of the homebrew bank.
     * This includes all homebrew objects.
     * @type {HomebrewBank}
     */
    homebrewBank: HomebrewBank.load(),

    /**
     * The current active PC.
     * Part of the player bank, this variable can have it's properties changed by reference and will be saved if the bank is saved.
     * @type {PlayerCharacter}
     */
    get activePlayerCharacter() {
        return this.playerCharacterBank.getActivePlayerCharacterBankEntry().playerCharacter;
    },

    /**
     * The current active homebrew bank entry.
     * Part of the homebrew bank, this variable can have it's properties changed by reference and will be saved if the bank is saved.
     * @type {HomebrewBankEntry}
     */
    get activeHomebrewEntry() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        return this.homebrewBank.getHomebrewBankEntryByIndex(id);
    }
}