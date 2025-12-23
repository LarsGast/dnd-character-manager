import { IMapper } from '../../interfaces/IMapper';
import { ResourceType } from '../../types/domain/helpers/ResourceType';
import { ResourceTypeRecord } from '../../types/storage/helpers/ResourceTypeRecord';

/**
 * Maps a ResourceType domain value to a ResourceTypeRecord value.
 */
export class ResourceTypeDomainToRecordMapper
	implements IMapper<ResourceType, ResourceTypeRecord>
{
	/**
	 * @inheritdoc
	 */
	public map(source: ResourceType): ResourceTypeRecord {
		switch (source) {
			case ResourceType.Race:
				return ResourceTypeRecord.Race;
			case ResourceType.Subclass:
				return ResourceTypeRecord.Subclass;
			default:
				throw new Error(
					`No mapping defined for ResourceType ${source} to ResourceTypeRecord.`,
				);
		}
	}
}
