import { IMapper } from '../../interfaces/IMapper';
import {
	CostApiDto,
	EquipmentApiDto,
} from '../../types/api/resources/EquipmentApiDto';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto';
import { Cost, Equipment } from '../../types/domain/resources/Equipment';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';

export class EquipmentApiToDomainMapper
	implements IMapper<EquipmentApiDto, Equipment>
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

	public map(source: EquipmentApiDto): Equipment {
		return {
			...this.baseResourceMapper.map(source),
			desc: source.desc,
			special: source.special,
			equipment_category: this.baseResourceMapper.map(
				source.equipment_category,
			),
			cost: this.mapCost(source.cost),
			weight: source.weight,
		};
	}

	private mapCost(source: CostApiDto): Cost {
		return {
			quantity: source.quantity,
			unit: source.unit,
		};
	}
}
