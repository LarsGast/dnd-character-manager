import { ResourceReferenceApiDto } from './ResourceReferenceApiDto';

/**
 * Has information about the bonuses to abilities a race can have.
 */
export interface AbilityBonusApiDto {
	/**
	 * Ability score that the bonus gets applied to.
	 */
	ability_score: ResourceReferenceApiDto;

	/**
	 * The height of the bonus.
	 */
	bonus: number;
}
