import { IMapper } from '../interfaces/IMapper.js';
import { BaseResourceRecord } from '../types/storage/wrappers/BaseResourceRecord.js';
import { BaseResource } from '../types/domain/wrappers/BaseResource.js';

export class BaseResourceRecordToDomainMapper
	implements IMapper<BaseResourceRecord, BaseResource>
{
	map(source: BaseResourceRecord): BaseResource {
		return {
			index: source.id,
			name: source.name,
			url: '', // Storage records may not have a URL
			resourceType: source.resourceType,
			isHomebrew: true,
		};
	}
}
