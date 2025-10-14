import { IMapper } from '../../interfaces/IMapper';
import {
	ArmorApiDto,
	ArmorClassApiDto,
} from '../../types/api/resources/ArmorApiDto';
import { EquipmentApiDto } from '../../types/api/resources/EquipmentApiDto';
import { Armor, ArmorClass } from '../../types/domain/resources/Armor';
import { Equipment } from '../../types/domain/resources/Equipment';

export class ArmorApiToDomainMapper implements IMapper<ArmorApiDto, Armor> {
	/**
	 * For mapping full equipment API data (base resource + equipment specifics).
	 */
	private readonly equipmentMapper: IMapper<EquipmentApiDto, Equipment>;

	public constructor(equipmentMapper: IMapper<EquipmentApiDto, Equipment>) {
		this.equipmentMapper = equipmentMapper;
	}

	public map(source: ArmorApiDto): Armor {
		return {
			...this.equipmentMapper.map(source),
			armor_category: source.armor_category,
			armor_class: this.mapArmorClass(source.armor_class),
			str_minimum: source.str_minimum,
			stealth_disadvantage: source.stealth_disadvantage,
		};
	}

	private mapArmorClass(source: ArmorClassApiDto): ArmorClass {
		return {
			base: source.base,
			dex_bonus: source.dex_bonus,
			max_bonus: source.max_bonus,
		};
	}
}
