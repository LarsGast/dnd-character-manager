import { IMapper } from '../../interfaces/IMapper';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';
import { BaseResourceRecord } from '../../types/storage/wrappers/BaseResourceRecord';

export class BaseResourceRecordToDomainMapper
	implements IMapper<BaseResourceRecord, BaseResource>
{
	map(source: BaseResourceRecord): BaseResource {
		return {
			index: source.id,
			name: source.name,
			isHomebrew: true,
			notes: source.notes,
		};
	}
}
