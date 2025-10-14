import { IMapper } from '../../interfaces/IMapper';
import { AbilityBonusApiDto } from '../../types/api/helpers/AbilityBonusApiDto';
import { ResourceReferenceApiDto } from '../../types/api/helpers/ResourceReferenceApiDto';
import { AbilityBonus } from '../../types/domain/helpers/AbilityBonus';
import { ResourceReference } from '../../types/domain/helpers/ResourceReference';

export class AbilityBonusApiToDomainMapper
	implements IMapper<AbilityBonusApiDto, AbilityBonus>
{
	/**
	 * For mapping minimal API data to an internal object.
	 */
	private readonly resourceReferenceMapper: IMapper<
		ResourceReferenceApiDto,
		ResourceReference
	>;

	public constructor(
		resourceReferenceMapper: IMapper<
			ResourceReferenceApiDto,
			ResourceReference
		>,
	) {
		this.resourceReferenceMapper = resourceReferenceMapper;
	}

	/**
	 * @inheritdoc
	 */
	public map(source: AbilityBonusApiDto): AbilityBonus {
		return {
			ability_score: this.resourceReferenceMapper.map(source.ability_score),
			bonus: source.bonus,
		};
	}
}
