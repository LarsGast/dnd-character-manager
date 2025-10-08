import { BaseResource } from '../wrappers/BaseResource';

/**
 * Has information about the bonuses to abilities a race can have.
 */
export interface AbilityBonus {
	/**
	 * Ability score that the bonus gets applied to.
	 */
	ability_score: BaseResource;

	/**
	 * The height of the bonus.
	 */
	bonus: number;
}
