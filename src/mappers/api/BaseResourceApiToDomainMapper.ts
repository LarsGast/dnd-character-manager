import { IMapper } from '../../interfaces/IMapper';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';

/**
 * Maps base resource API DTOs to domain model base resources.
 * Handles the conversion from external API data structure to internal domain representation.
 */
export class BaseResourceApiToDomainMapper
	implements IMapper<BaseResourceApiDto, BaseResource>
{
	/**
	 * @inheritdoc
	 */
	map(source: BaseResourceApiDto): BaseResource {
		return {
			index: source.index,
			name: source.name,
			isHomebrew: false,
			notes: undefined,
		};
	}
}
