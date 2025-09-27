import { IMapper } from '../interfaces/IMapper.js';
import { AbilityBonusRecord } from '../types/storage/helpers/AbilityBonusRecord.js';
import { AbilityBonus } from '../types/domain/helpers/AbilityBonus.js';
import { BaseResourceRecord } from '../types/storage/wrappers/BaseResourceRecord.js';
import { BaseResource } from '../types/domain/wrappers/BaseResource.js';

export class AbilityBonusRecordToDomainMapper
	implements IMapper<AbilityBonusRecord, AbilityBonus>
{
	/**
	 * For mapping minimal storage data to a domain object.
	 */
	private readonly baseResourceMapper: IMapper<
		BaseResourceRecord,
		BaseResource
	>;

	public constructor(
		baseResourceMapper: IMapper<BaseResourceRecord, BaseResource>,
	) {
		this.baseResourceMapper = baseResourceMapper;
	}

	map(source: AbilityBonusRecord): AbilityBonus {
		return {
			ability_score: this.baseResourceMapper.map(source.ability_score),
			bonus: source.bonus,
		};
	}
}
