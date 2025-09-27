import { BaseResourceApiDto } from "../wrappers/BaseResourceApiDto.js";

/**
 * Represents ability score bonuses that a race can provide to a character.
 * Used in the 5e API to define racial bonuses to ability scores.
 */
export interface AbilityBonusApiDto {

    /**
     * Reference to the ability score that receives the bonus.
     */
    ability_score: BaseResourceApiDto;

    /**
     * The numerical bonus value applied to the ability score.
     */
    bonus: number;
}