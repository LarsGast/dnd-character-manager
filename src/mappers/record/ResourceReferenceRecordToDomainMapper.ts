import { IMapper } from '../../interfaces/IMapper';
import { ResourceReference } from '../../types/domain/helpers/ResourceReference';
import { ResourceReferenceRecord } from '../../types/storage/helpers/ResourceReferenceRecord';

export class ResourceReferenceRecordToDomainMapper
	implements IMapper<ResourceReferenceRecord, ResourceReference>
{
	/**
	 * @inheritdoc
	 */
	public map(source: ResourceReferenceRecord): ResourceReference {
		return {
			index: source.id,
			name: source.name,
		};
	}
}
