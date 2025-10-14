import { IMapper } from '../../interfaces/IMapper';
import { FeatureApiDto } from '../../types/api/resources/FeatureApiDto';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto';
import { Feature } from '../../types/domain/resources/Feature';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';
import { ResourceReferenceApiDto } from '../../types/api/helpers/ResourceReferenceApiDto';
import { ResourceReference } from '../../types/domain/helpers/ResourceReference';

export class FeatureApiToDomainMapper
	implements IMapper<FeatureApiDto, Feature>
{
	/**
	 * For mapping base resource fields.
	 */
	private readonly baseResourceMapper: IMapper<
		BaseResourceApiDto,
		BaseResource
	>;

	/**
	 * For mapping referenced resources (class, subclass, parent) to ResourceReference.
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

	map(source: FeatureApiDto): Feature {
		return {
			...this.baseResourceMapper.map(source),
			desc: source.desc,
			level: source.level,
			class: this.resourceReferenceMapper.map(source.class),
			subclass:
				source.subclass === undefined
					? undefined
					: this.resourceReferenceMapper.map(source.subclass),
			parent:
				source.parent === undefined
					? undefined
					: this.resourceReferenceMapper.map(source.parent),
			prerequisites: source.prerequisites,
			feature_specific: source.feature_specific,
		};
	}
}
