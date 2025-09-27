import { BaseResource } from '../wrappers/BaseResource.js';

export interface Alignment extends BaseResource {
	/**
	 * Abbreviation/initials/acronym for the alignment.
	 */
	abbreviation: string;

	/**
	 * Brief description of the alignment.
	 */
	desc: string;
}
