import { BaseResource } from '../wrappers/BaseResource';

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
