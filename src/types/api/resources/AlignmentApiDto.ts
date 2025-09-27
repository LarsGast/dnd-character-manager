import { BaseResourceApiDto } from '../wrappers/BaseResourceApiDto.js';

export interface AlignmentApiDto extends BaseResourceApiDto {
	/**
	 * Abbreviation/initials/acronym for the alignment.
	 */
	abbreviation: string;

	/**
	 * Brief description of the alignment.
	 */
	desc: string;
}
