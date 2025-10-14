import { IMapper } from '../../interfaces/IMapper';
import { ResourceReferenceApiDto } from '../../types/api/helpers/ResourceReferenceApiDto';
import { AbilityScoreApiDto } from '../../types/api/resources/AbilityScoreApiDto';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto';
import { ResourceReference } from '../../types/domain/helpers/ResourceReference';
import { AbilityScore } from '../../types/domain/resources/AbilityScore';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';

export class AbilityScoreApiToDomainMapper
	implements IMapper<AbilityScoreApiDto, AbilityScore>
{
	/**
	 * For mapping the base API resource to an internal object.
	 */
	private readonly baseResourceMapper: IMapper<
		BaseResourceApiDto,
		BaseResource
	>;

	/**
	 * For mapping minimal API data to an internal object.
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

	/**
	 * @inheritdoc
	 */
	public map(source: AbilityScoreApiDto): AbilityScore {
		return {
			...this.baseResourceMapper.map(source),
			desc: source.desc,
			full_name: source.full_name,
			skills: source.skills.map(this.resourceReferenceMapper.map),
		};
	}
}
