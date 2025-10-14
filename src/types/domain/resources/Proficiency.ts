import { ResourceReference } from '../helpers/ResourceReference';
import { BaseResource } from '../wrappers/BaseResource';

export interface Proficiency extends BaseResource {
	/**
	 * The general category of the proficiency.
	 */
	type: string;

	/**
	 * Classes that start with this proficiency.
	 */
	classes: ResourceReference[];
	/**
	 * Races that start with this proficiency.
	 */
	races: ResourceReference[];

	/**
	 * Reference to the full description of the related resource.
	 */
	reference: ResourceReference;
}
