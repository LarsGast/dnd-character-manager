import { ResourceReferenceApiDto } from '../helpers/ResourceReferenceApiDto';
import { BaseResourceApiDto } from '../wrappers/BaseResourceApiDto';

export interface SkillApiDto extends BaseResourceApiDto {
	/**
	 * Flavor description of the skill.
	 */
	desc: string[];

	/**
	 * The ability score that the skill is typically used as.
	 */
	ability_score: ResourceReferenceApiDto;
}
