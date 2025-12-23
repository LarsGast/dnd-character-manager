import { IMapper } from '../../interfaces/IMapper';
import { ResourceTypeApiDto } from '../../types/api/helpers/ResourceTypeApiDto';
import { ResourceType } from '../../types/domain/helpers/ResourceType';

/**
 * Maps a ResourceType domain value to a ResourceTypeApiDto value.
 */
export class ResourceTypeDomainToApiMapper
	implements IMapper<ResourceType, ResourceTypeApiDto>
{
	/**
	 * @inheritdoc
	 */
	public map(source: ResourceType): ResourceTypeApiDto {
		switch (source) {
			case ResourceType.AbilityScore:
				return ResourceTypeApiDto.AbilityScore;
			case ResourceType.Alignment:
				return ResourceTypeApiDto.Alignment;
			case ResourceType.Armor:
				return ResourceTypeApiDto.Armor;
			case ResourceType.Background:
				return ResourceTypeApiDto.Background;
			case ResourceType.Class:
				return ResourceTypeApiDto.Class;
			case ResourceType.ClassLevel:
				return ResourceTypeApiDto.ClassLevel;
			case ResourceType.Equipment:
				return ResourceTypeApiDto.Equipment;
			case ResourceType.EquipmentCategory:
				return ResourceTypeApiDto.EquipmentCategory;
			case ResourceType.Feature:
				return ResourceTypeApiDto.Feature;
			case ResourceType.Language:
				return ResourceTypeApiDto.Language;
			case ResourceType.Proficiency:
				return ResourceTypeApiDto.Proficiency;
			case ResourceType.Race:
				return ResourceTypeApiDto.Race;
			case ResourceType.Skill:
				return ResourceTypeApiDto.Skill;
			case ResourceType.Spell:
				return ResourceTypeApiDto.Spell;
			case ResourceType.Subclass:
				return ResourceTypeApiDto.Subclass;
			case ResourceType.Subrace:
				return ResourceTypeApiDto.Subrace;
			case ResourceType.Trait:
				return ResourceTypeApiDto.Trait;
			case ResourceType.Weapon:
				return ResourceTypeApiDto.Weapon;
		}
	}
}
