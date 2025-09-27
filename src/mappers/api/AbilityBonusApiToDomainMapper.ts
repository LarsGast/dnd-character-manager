import { IMapper } from '../../interfaces/IMapper.js';
import { AbilityBonusApiDto } from '../../types/api/helpers/AbilityBonusApiDto.js';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto.js';
import { AbilityBonus } from '../../types/domain/helpers/AbilityBonus.js';
import { BaseResource } from '../../types/domain/wrappers/BaseResource.js';

export class AbilityBonusApiToDomainMapper
	implements IMapper<AbilityBonusApiDto, AbilityBonus>
{
	/**
	 * For mapping minimal API data to an internal object.
	 */
	private readonly baseResourceMapper: IMapper<
		BaseResourceApiDto,
		BaseResource
	>;

	public constructor(
		baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>,
	) {
		this.baseResourceMapper = baseResourceMapper;
	}

	/**
	 * @inheritdoc
	 */
	public map(source: AbilityBonusApiDto): AbilityBonus {
		return {
			ability_score: this.baseResourceMapper.map(source.ability_score),
			bonus: source.bonus,
		};
	}
}
