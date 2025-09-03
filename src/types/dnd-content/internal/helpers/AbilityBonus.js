import { DnDContentObjectInfo } from "../resources/DnDContentObjectInfo.js";

/**
 * Has information about the bonuses to abilities a race can have.
 */
export class AbilityBonus {

    /**
     * Ability score that the bonus gets applied to.
     * @type {DnDContentObjectInfo}
     */
    ability_score;

    /**
     * The height of the bonus.
     * @type {number}
     */
    bonus;
}