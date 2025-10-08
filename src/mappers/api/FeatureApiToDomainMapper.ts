import { IMapper } from '../../interfaces/IMapper';
import { FeatureApiDto } from '../../types/api/resources/FeatureApiDto';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto';
import { Feature } from '../../types/domain/resources/Feature';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';

export class FeatureApiToDomainMapper
	implements IMapper<FeatureApiDto, Feature>
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

	map(source: FeatureApiDto): Feature {
		return {
			...this.baseResourceMapper.map(source),
			desc: source.desc,
			level: source.level,
			class: this.baseResourceMapper.map(source.class),
			subclass:
				source.subclass === undefined
					? undefined
					: this.baseResourceMapper.map(source.subclass),
			parent:
				source.parent === undefined
					? undefined
					: this.baseResourceMapper.map(source.parent),
			prerequisites: source.prerequisites,
			feature_specific: source.feature_specific,
		};
	}
}
