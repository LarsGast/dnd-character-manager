import { IMapper } from '../../interfaces/IMapper';
import { EquipmentCategoryApiDto } from '../../types/api/resources/EquipmentCategoryApiDto';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto';
import { EquipmentCategory } from '../../types/domain/resources/EquipmentCategory';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';
import { ResourceReferenceApiDto } from '../../types/api/helpers/ResourceReferenceApiDto';
import { ResourceReference } from '../../types/domain/helpers/ResourceReference';

export class EquipmentCategoryApiToDomainMapper
	implements IMapper<EquipmentCategoryApiDto, EquipmentCategory>
{
	/**
	 * For mapping the base API resource fields.
	 */
	private readonly baseResourceMapper: IMapper<
		BaseResourceApiDto,
		BaseResource
	>;

	/**
	 * For mapping minimal referenced equipment items to ResourceReference objects.
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

	map(source: EquipmentCategoryApiDto): EquipmentCategory {
		return {
			...this.baseResourceMapper.map(source),
			equipment: source.equipment.map((equipmentItem) =>
				this.resourceReferenceMapper.map(equipmentItem),
			),
		};
	}
}
