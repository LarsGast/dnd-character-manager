import { ApiObjectInfo } from "../wrappers/ApiObjectInfo.js";

/**
 * Has information about the bonuses to abilities a race can have.
 */
export interface AbilityBonus {

    /**
     * Ability score that the bonus gets applied to.
     */
    ability_score: ApiObjectInfo;

    /**
     * The height of the bonus.
     */
    bonus: number;
}