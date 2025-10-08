import { BaseResourceRecord } from '../wrappers/BaseResourceRecord';

/**
 * Has information about the bonuses to abilities a race can have.
 */
export interface AbilityBonusRecord {
	/**
	 * Ability score that the bonus gets applied to.
	 */
	ability_score: BaseResourceRecord;

	/**
	 * The height of the bonus.
	 */
	bonus: number;
}
