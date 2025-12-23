import { IMapper } from '../../interfaces/IMapper';
import { LanguageApiDto } from '../../types/api/resources/LanguageApiDto';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto';
import { Language } from '../../types/domain/resources/Language';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';

export class LanguageApiToDomainMapper
	implements IMapper<LanguageApiDto, Language>
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

	map(source: LanguageApiDto): Language {
		return {
			...this.baseResourceMapper.map(source),
			desc: source.desc,
			type: source.type,
			script: source.script,
			typical_speakers: source.typical_speakers,
		};
	}
}
