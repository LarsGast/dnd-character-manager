import { PlayerCharacterBank } from "./PlayerCharacterBank.js"
import { PlayerCharacter } from "../types/PlayerCharacter.js";

/**
 * A set of global variables to be used all across the codebase.
 */
export const globals = {

    /**
     * Global singleton of the player character bank.
     * This includes all PCs, both active and inactive.
     */
    playerCharacterBank: PlayerCharacterBank.load(),

    /**
     * The current active PC.
     * Part of the player bank, this variable can have it's properties changed by reference and will be saved if the bank is saved.
     */
    get activePlayerCharacter(): PlayerCharacter {
        return this.playerCharacterBank.getActivePlayerCharacterBankEntry().playerCharacter;
    }
}