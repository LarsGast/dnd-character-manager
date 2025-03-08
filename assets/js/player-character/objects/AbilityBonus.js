import { ApiObjectInfo } from "./ApiObjectInfo.js";

/**
 * Has information about the bonuses to abilities a race can have.
 */
export class AbilityBonus {

    /**
     * Ability score that the bonus gets applied to.
     * @type {ApiObjectInfo}
     */
    ability_score;

    /**
     * The height of the bonus.
     * @type {number}
     */
    bonus;
}