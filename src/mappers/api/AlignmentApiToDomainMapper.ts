import { IMapper } from '../../interfaces/IMapper';
import { AlignmentApiDto } from '../../types/api/resources/AlignmentApiDto';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto';
import { Alignment } from '../../types/domain/resources/Alignment';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';

export class AlignmentApiToDomainMapper
	implements IMapper<AlignmentApiDto, Alignment>
{
	/**
	 * For mapping the base API resource fields to an internal base resource object.
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

	public map(source: AlignmentApiDto): Alignment {
		return {
			...this.baseResourceMapper.map(source),
			abbreviation: source.abbreviation,
			desc: source.desc,
		};
	}
}
