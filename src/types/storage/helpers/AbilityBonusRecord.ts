import { ResourceReferenceRecord } from './ResourceReferenceRecord';

/**
 * Has information about the bonuses to abilities a race can have.
 */
export interface AbilityBonusRecord {
	/**
	 * Ability score that the bonus gets applied to.
	 */
	ability_score: ResourceReferenceRecord;

	/**
	 * The height of the bonus.
	 */
	bonus: number;
}
