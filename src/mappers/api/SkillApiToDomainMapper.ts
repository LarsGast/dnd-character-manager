import { IMapper } from '../../interfaces/IMapper';
import { SkillApiDto } from '../../types/api/resources/SkillApiDto';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto';
import { ResourceReferenceApiDto } from '../../types/api/helpers/ResourceReferenceApiDto';
import { ResourceReference } from '../../types/domain/helpers/ResourceReference';
import { Skill } from '../../types/domain/resources/Skill';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';

export class SkillApiToDomainMapper implements IMapper<SkillApiDto, Skill> {
	/**
	 * For mapping base resource fields.
	 */
	private readonly baseResourceMapper: IMapper<
		BaseResourceApiDto,
		BaseResource
	>;

	/**
	 * For mapping referenced resources to ResourceReference.
	 */
	private readonly resourceReferenceMapper: IMapper<
		ResourceReferenceApiDto,
		ResourceReference
	>;

	public constructor(
		baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>,
		resourceReferenceMapper: IMapper<
			ResourceReferenceApiDto,
			ResourceReference
		>,
	) {
		this.baseResourceMapper = baseResourceMapper;
		this.resourceReferenceMapper = resourceReferenceMapper;
	}

	map(source: SkillApiDto): Skill {
		return {
			...this.baseResourceMapper.map(source),
			desc: source.desc,
			ability_score: this.resourceReferenceMapper.map(source.ability_score),
		};
	}
}
