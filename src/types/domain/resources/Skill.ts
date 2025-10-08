import { BaseResource } from '../wrappers/BaseResource';

export interface Skill extends BaseResource {
	/**
	 * Flavor description of the skill.
	 */
	desc: string[];

	/**
	 * The ability score that the skill is typically used as.
	 */
	ability_score: BaseResource;
}
