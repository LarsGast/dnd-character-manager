import { IMapper } from '../../interfaces/IMapper';
import { ProficiencyApiDto } from '../../types/api/resources/ProficiencyApiDto';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto';
import { Proficiency } from '../../types/domain/resources/Proficiency';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';
import { ResourceReferenceApiDto } from '../../types/api/helpers/ResourceReferenceApiDto';
import { ResourceReference } from '../../types/domain/helpers/ResourceReference';

export class ProficiencyApiToDomainMapper
	implements IMapper<ProficiencyApiDto, Proficiency>
{
	/**
	 * For mapping base resource fields.
	 */
	private readonly baseResourceMapper: IMapper<
		BaseResourceApiDto,
		BaseResource
	>;

	/**
	 * For mapping referenced resources (classes, races, reference) to ResourceReference.
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

	map(source: ProficiencyApiDto): Proficiency {
		return {
			...this.baseResourceMapper.map(source),
			type: source.type,
			classes: source.classes.map((classObject) =>
				this.resourceReferenceMapper.map(classObject),
			),
			races: source.races.map((race) => this.resourceReferenceMapper.map(race)),
			reference: this.resourceReferenceMapper.map(source.reference),
		};
	}
}
