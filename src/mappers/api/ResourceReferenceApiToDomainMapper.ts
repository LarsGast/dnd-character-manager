import { IMapper } from '../../interfaces/IMapper';
import { ResourceReferenceApiDto } from '../../types/api/helpers/ResourceReferenceApiDto';
import { ResourceReference } from '../../types/domain/helpers/ResourceReference';

export class ResourceReferenceApiToDomainMapper
	implements IMapper<ResourceReferenceApiDto, ResourceReference>
{
	/**
	 * @inheritdoc
	 */
	public map(source: ResourceReferenceApiDto): ResourceReference {
		return {
			index: source.index,
			name: source.name,
		};
	}
}
