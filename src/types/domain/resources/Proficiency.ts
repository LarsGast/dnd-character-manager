import { BaseResource } from '../wrappers/BaseResource.js';

export interface Proficiency extends BaseResource {
	/**
	 * The general category of the proficiency.
	 */
	type: string;

	/**
	 * Classes that start with this proficiency.
	 */
	classes: BaseResource[];
	/**
	 * Races that start with this proficiency.
	 */
	races: BaseResource[];

	/**
	 * Reference to the full description of the related resource.
	 */
	reference: BaseResource;
}
