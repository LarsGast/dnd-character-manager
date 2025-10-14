import { ResourceReferenceApiDto } from '../helpers/ResourceReferenceApiDto';
import { BaseResourceApiDto } from '../wrappers/BaseResourceApiDto';

export interface ProficiencyApiDto extends BaseResourceApiDto {
	/**
	 * The general category of the proficiency.
	 */
	type: string;

	/**
	 * Classes that start with this proficiency.
	 */
	classes: ResourceReferenceApiDto[];
	/**
	 * Races that start with this proficiency.
	 */
	races: ResourceReferenceApiDto[];

	/**
	 * Reference to the full description of the related resource.
	 */
	reference: ResourceReferenceApiDto;
}
