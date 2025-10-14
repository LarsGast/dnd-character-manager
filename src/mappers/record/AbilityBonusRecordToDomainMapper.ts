import { IMapper } from '../../interfaces/IMapper';
import { AbilityBonusRecord } from '../../types/storage/helpers/AbilityBonusRecord';
import { AbilityBonus } from '../../types/domain/helpers/AbilityBonus';
import { ResourceReferenceRecord } from '../../types/storage/helpers/ResourceReferenceRecord';
import { ResourceReference } from '../../types/domain/helpers/ResourceReference';

export class AbilityBonusRecordToDomainMapper
	implements IMapper<AbilityBonusRecord, AbilityBonus>
{
	/**
	 * For mapping resource reference records to domain ResourceReference objects.
	 */
	private readonly resourceReferenceMapper: IMapper<
		ResourceReferenceRecord,
		ResourceReference
	>;

	public constructor(
		resourceReferenceMapper: IMapper<
			ResourceReferenceRecord,
			ResourceReference
		>,
	) {
		this.resourceReferenceMapper = resourceReferenceMapper;
	}

	map(source: AbilityBonusRecord): AbilityBonus {
		return {
			ability_score: this.resourceReferenceMapper.map(source.ability_score),
			bonus: source.bonus,
		};
	}
}
