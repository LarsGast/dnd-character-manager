import { IMapper } from '../interfaces/IMapper.js';
import { LanguageApiDto } from '../types/api/resources/LanguageApiDto.js';
import { BaseResourceApiDto } from '../types/api/wrappers/BaseResourceApiDto.js';
import { Language } from '../types/domain/resources/Language.js';
import { BaseResource } from '../types/domain/wrappers/BaseResource.js';

export class LanguageMapper implements IMapper<LanguageApiDto, Language> {
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
