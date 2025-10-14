import { IMapper } from '../../interfaces/IMapper';
import { ResourceReferenceApiDto } from '../../types/api/helpers/ResourceReferenceApiDto';
import { ResourceReference } from '../../types/domain/helpers/ResourceReference';

export class ResourceReferenceApiToDomainMapper
	implements IMapper<ResourceReferenceApiDto, ResourceReference>
{
	/**
	 * Maps a minimal API resource reference (index + name) to the internal
	 * ResourceReference domain object used for lightweight relationships.
	 */
	public map(source: ResourceReferenceApiDto): ResourceReference {
		return {
			index: source.index,
			name: source.name,
			isHomebrew: false,
		};
	}
}
