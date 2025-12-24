import { IResourceTypeApiDtoTranscriber } from '../interfaces/IResourceTypeApiDtoTranscriber';
import { ResourceTypeApiDto } from '../types/api/helpers/ResourceTypeApiDto';

/**
 * Transcriber for ResourceTypeApiDto to API paths.
 */
export class ResourceTypeApiDtoTranscriber
	implements IResourceTypeApiDtoTranscriber
{
	/**
	 * @inheritdoc
	 */
	public transcribeToApiPath(resourceType: ResourceTypeApiDto): string {
		switch (resourceType) {
			case ResourceTypeApiDto.AbilityScore:
				return 'ability-scores';
			case ResourceTypeApiDto.Alignment:
				return 'alignments';
			case ResourceTypeApiDto.Background:
				return 'backgrounds';
			case ResourceTypeApiDto.Class:
				return 'classes';
			case ResourceTypeApiDto.Equipment:
				return 'equipment';
			case ResourceTypeApiDto.EquipmentCategory:
				return 'equipment-categories';
			case ResourceTypeApiDto.Feature:
				return 'features';
			case ResourceTypeApiDto.Language:
				return 'languages';
			case ResourceTypeApiDto.Proficiency:
				return 'proficiencies';
			case ResourceTypeApiDto.Race:
				return 'races';
			case ResourceTypeApiDto.Skill:
				return 'skills';
			case ResourceTypeApiDto.Spell:
				return 'spells';
			case ResourceTypeApiDto.Subclass:
				return 'subclasses';
			case ResourceTypeApiDto.Subrace:
				return 'subraces';
			case ResourceTypeApiDto.Trait:
				return 'traits';
		}
	}
}
