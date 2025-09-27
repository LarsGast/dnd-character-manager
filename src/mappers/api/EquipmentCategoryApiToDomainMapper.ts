import { IMapper } from '../../interfaces/IMapper.js';
import { EquipmentCategoryApiDto } from '../../types/api/resources/EquipmentCategoryApiDto.js';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto.js';
import { EquipmentCategory } from '../../types/domain/resources/EquipmentCategory.js';
import { BaseResource } from '../../types/domain/wrappers/BaseResource.js';

export class EquipmentCategoryApiToDomainMapper
	implements IMapper<EquipmentCategoryApiDto, EquipmentCategory>
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

	map(source: EquipmentCategoryApiDto): EquipmentCategory {
		return {
			...this.baseResourceMapper.map(source),
			equipment: source.equipment.map((equipmentItem) =>
				this.baseResourceMapper.map(equipmentItem),
			),
		};
	}
}
