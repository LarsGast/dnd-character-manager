import { ApiObjectInfoApiDto } from "../wrappers/ApiObjectInfoApiDto.js";

/**
 * Has information about the bonuses to abilities a race can have.
 */
export interface AbilityBonusApiDto {

    /**
     * Ability score that the bonus gets applied to.
     */
    ability_score: ApiObjectInfoApiDto;

    /**
     * The height of the bonus.
     */
    bonus: number;
}