import { ResourceReference } from '../helpers/ResourceReference';
import { BaseResource } from '../wrappers/BaseResource';

export interface AbilityScore extends BaseResource {
	/**
	 * Description of the resource.
	 */
	desc: string;

	/**
	 * Full name of the ability score.
	 */
	full_name: string;

	/**
	 * List of skills that use this ability score.
	 */
	skills: ResourceReference[];
}
