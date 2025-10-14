import { ResourceReferenceApiDto } from '../helpers/ResourceReferenceApiDto';
import { BaseResourceApiDto } from '../wrappers/BaseResourceApiDto';

export interface AbilityScoreApiDto extends BaseResourceApiDto {
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
	skills: ResourceReferenceApiDto[];
}
