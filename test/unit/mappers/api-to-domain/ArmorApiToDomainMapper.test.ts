import { it, expect } from 'vitest';
import { ArmorApiToDomainMapper } from '../../../../src/mappers/api-to-domain/ArmorApiToDomainMapper';
import {
	getMockArmorApiDto,
	getMockArmorClassApiDto,
} from './testUtils/ApiTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';

it('should map all non-reference properties from API to domain correctly', () => {
	// Arrange
	const mapper = new ArmorApiToDomainMapper(getMockMapper());
	const apiDto = getMockArmorApiDto({
		armor_category: 'Heavy',
		str_minimum: 15,
		stealth_disadvantage: true,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.armor_category).toBe('Heavy');
	expect(result.str_minimum).toBe(15);
	expect(result.stealth_disadvantage).toBe(true);
});

it('should map equipment properties through equipment mapper', () => {
	// Arrange
	const equipmentMapper = getMockMapper();
	const mapper = new ArmorApiToDomainMapper(equipmentMapper);
	const apiDto = getMockArmorApiDto();

	// Act
	mapper.map(apiDto);

	// Assert
	expect(equipmentMapper.map).toHaveBeenCalledWith(apiDto);
});

it('should map armor_class properties correctly', () => {
	// Arrange
	const mapper = new ArmorApiToDomainMapper(getMockMapper());
	const armorClass = getMockArmorClassApiDto({
		base: 14,
		dex_bonus: true,
		max_bonus: 2,
	});
	const apiDto = getMockArmorApiDto({
		armor_class: armorClass,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.armor_class.base).toBe(14);
	expect(result.armor_class.dex_bonus).toBe(true);
	expect(result.armor_class.max_bonus).toBe(2);
});
