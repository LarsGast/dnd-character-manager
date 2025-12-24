import { it, expect } from 'vitest';
import { WeaponApiToDomainMapper } from '../../../../src/mappers/api-to-domain/WeaponApiToDomainMapper';
import { WeaponApiDto } from '../../../../src/types/api/resources/WeaponApiDto';
import {
	getMockWeaponApiDto,
	getMockResourceReferenceApiDto,
	getMockDamageApiDto,
	getMockRangeApiDto,
	getMockEquipmentApiDto,
} from './testUtils/ApiTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';

it('should map all weapon-specific non-reference properties from API to domain correctly', () => {
	// Arrange
	const mapper = new WeaponApiToDomainMapper(getMockMapper(), getMockMapper());
	const apiDto = getMockWeaponApiDto({
		weapon_category: 'Martial',
		weapon_range: 'Ranged',
		category_range: 'Martial Ranged',
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.weapon_category).toBe('Martial');
	expect(result.weapon_range).toBe('Ranged');
	expect(result.category_range).toBe('Martial Ranged');
});

it('should map equipment properties through equipment mapper', () => {
	// Arrange
	const equipmentMapper = getMockMapper();
	const mapper = new WeaponApiToDomainMapper(equipmentMapper, getMockMapper());
	const apiDto = getMockWeaponApiDto();

	// Act
	mapper.map(apiDto);

	// Assert
	expect(equipmentMapper.map).toHaveBeenCalledWith(apiDto);
});

it('should map damage properties correctly when present', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new WeaponApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const damageType = getMockResourceReferenceApiDto();
	const damage = getMockDamageApiDto({
		damage_dice: '1d8',
		damage_type: damageType,
	});
	const apiDto = getMockWeaponApiDto({
		damage: damage,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.damage).toBeDefined();
	expect(result.damage!.damage_dice).toBe('1d8');
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(damageType);
});

it('should handle undefined damage', () => {
	// Arrange
	const mapper = new WeaponApiToDomainMapper(getMockMapper(), getMockMapper());
	// Create the API DTO without passing damage in the partial
	// so the factory uses undefined (not the default)
	const apiDto: WeaponApiDto = {
		...getMockEquipmentApiDto(),
		weapon_category: 'Simple',
		weapon_range: 'Melee',
		category_range: 'Simple Melee',
		damage: undefined,
		range: getMockRangeApiDto(),
		throw_range: undefined,
		properties: [],
	};

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.damage).toBeUndefined();
});

it('should map range properties correctly', () => {
	// Arrange
	const mapper = new WeaponApiToDomainMapper(getMockMapper(), getMockMapper());
	const range = getMockRangeApiDto({
		normal: 20,
		long: 60,
	});
	const apiDto = getMockWeaponApiDto({
		range: range,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.range.normal).toBe(20);
	expect(result.range.long).toBe(60);
});

it('should map throw_range when present', () => {
	// Arrange
	const mapper = new WeaponApiToDomainMapper(getMockMapper(), getMockMapper());
	const throwRange = getMockRangeApiDto({
		normal: 20,
		long: 60,
	});
	const apiDto = getMockWeaponApiDto({
		throw_range: throwRange,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.throw_range).toBeDefined();
	expect(result.throw_range!.normal).toBe(20);
	expect(result.throw_range!.long).toBe(60);
});

it('should handle undefined throw_range', () => {
	// Arrange
	const mapper = new WeaponApiToDomainMapper(getMockMapper(), getMockMapper());
	const apiDto = getMockWeaponApiDto({
		throw_range: undefined,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.throw_range).toBeUndefined();
});

it('should map properties array references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new WeaponApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const properties = [getMockResourceReferenceApiDto()];
	const apiDto = getMockWeaponApiDto({
		properties: properties,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(properties[0]);
});

it('should handle empty properties array', () => {
	// Arrange
	const mapper = new WeaponApiToDomainMapper(getMockMapper(), getMockMapper());
	const apiDto = getMockWeaponApiDto({
		properties: [],
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.properties).toEqual([]);
});
