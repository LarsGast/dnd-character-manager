import { IMapper } from '../../interfaces/IMapper';
import { AbilityBonusRecord } from '../../types/storage/helpers/AbilityBonusRecord';
import { AbilityBonus } from '../../types/domain/helpers/AbilityBonus';
import { BaseResourceRecord } from '../../types/storage/wrappers/BaseResourceRecord';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';

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
