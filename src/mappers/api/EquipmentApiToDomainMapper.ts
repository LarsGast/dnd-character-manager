import { IMapper } from '../../interfaces/IMapper';
import {
	CostApiDto,
	EquipmentApiDto,
} from '../../types/api/resources/EquipmentApiDto';
import { BaseResourceApiDto } from '../../types/api/wrappers/BaseResourceApiDto';
import { Cost, Equipment } from '../../types/domain/resources/Equipment';
import { BaseResource } from '../../types/domain/wrappers/BaseResource';
import { ResourceReferenceApiDto } from '../../types/api/helpers/ResourceReferenceApiDto';
import { ResourceReference } from '../../types/domain/helpers/ResourceReference';

export class EquipmentApiToDomainMapper
	implements IMapper<EquipmentApiDto, Equipment>
{
	/**
	 * For mapping base resource fields.
	 */
	private readonly baseResourceMapper: IMapper<
		BaseResourceApiDto,
		BaseResource
	>;

	/**
	 * For mapping referenced equipment category to ResourceReference.
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

	public map(source: EquipmentApiDto): Equipment {
		return {
			...this.baseResourceMapper.map(source),
			desc: source.desc,
			special: source.special,
			equipment_category: this.resourceReferenceMapper.map(
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
