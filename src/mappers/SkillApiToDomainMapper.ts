import { IMapper } from '../interfaces/IMapper.js';
import { SkillApiDto } from '../types/api/resources/SkillApiDto.js';
import { BaseResourceApiDto } from '../types/api/wrappers/BaseResourceApiDto.js';
import { Skill } from '../types/domain/resources/Skill.js';
import { BaseResource } from '../types/domain/wrappers/BaseResource.js';

export class SkillApiToDomainMapper implements IMapper<SkillApiDto, Skill> {
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

	map(source: SkillApiDto): Skill {
		return {
			...this.baseResourceMapper.map(source),
			desc: source.desc,
			ability_score: this.baseResourceMapper.map(source.ability_score),
		};
	}
}
