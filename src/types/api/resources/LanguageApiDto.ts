import { BaseResourceApiDto } from '../wrappers/BaseResourceApiDto';

export interface LanguageApiDto extends BaseResourceApiDto {
	/**
	 * Brief description of the language.
	 */
	desc: string;

	/**
	 * Possible values: [Standard, Exotic].
	 */
	type: string;

	/**
	 * Script used for writing in the language.
	 */
	script: string;

	/**
	 * List of races that tend to speak the language.
	 */
	typical_speakers: string[];
}
