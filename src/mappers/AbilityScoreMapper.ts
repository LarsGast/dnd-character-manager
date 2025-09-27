import { IMapper } from '../interfaces/IMapper.js';
import { AbilityScoreApiDto } from '../types/api/resources/AbilityScoreApiDto.js';
import { BaseResourceApiDto } from '../types/api/wrappers/BaseResourceApiDto.js';
import { AbilityScore } from '../types/domain/resources/AbilityScore.js';
import { BaseResource } from '../types/domain/wrappers/BaseResource.js';

export class AbilityScoreMapper
	implements IMapper<AbilityScoreApiDto, AbilityScore>
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

	public map(source: AbilityScoreApiDto): AbilityScore {
		return {
			...this.baseResourceMapper.map(source),
			desc: source.desc,
			full_name: source.full_name,
			skills: source.skills.map((skill) => this.baseResourceMapper.map(skill)),
		};
	}
}
