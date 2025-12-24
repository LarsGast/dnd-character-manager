import { it, expect } from 'vitest';
import { EquipmentApiToDomainMapper } from '../../../../src/mappers/api-to-domain/EquipmentApiToDomainMapper';
import {
	getMockEquipmentApiDto,
	getMockResourceReferenceApiDto,
	getMockCostApiDto,
} from './testUtils/ApiTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';

it('should map all non-reference properties from API to domain correctly', () => {
	// Arrange
	const mapper = new EquipmentApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockEquipmentApiDto({
		desc: ['Equipment description line 1', 'Equipment description line 2'],
		special: ['Special property 1', 'Special property 2'],
		weight: 5.5,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.desc).toEqual([
		'Equipment description line 1',
		'Equipment description line 2',
	]);
	expect(result.special).toEqual(['Special property 1', 'Special property 2']);
	expect(result.weight).toBe(5.5);
});

it('should map base resource properties from API to domain correctly', () => {
	// Arrange
	const baseResourceMapper = getMockMapper();
	const mapper = new EquipmentApiToDomainMapper(
		baseResourceMapper,
		getMockMapper(),
	);
	const apiDto = getMockEquipmentApiDto();

	// Act
	mapper.map(apiDto);

	// Assert
	expect(baseResourceMapper.map).toHaveBeenCalledWith(apiDto);
});

it('should map equipment_category reference from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new EquipmentApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const equipmentCategory = getMockResourceReferenceApiDto();
	const apiDto = getMockEquipmentApiDto({
		equipment_category: equipmentCategory,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(equipmentCategory);
});

it('should map cost properties correctly', () => {
	// Arrange
	const mapper = new EquipmentApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
	);
	const cost = getMockCostApiDto({
		quantity: 50,
		unit: 'gp',
	});
	const apiDto = getMockEquipmentApiDto({
		cost: cost,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.cost.quantity).toBe(50);
	expect(result.cost.unit).toBe('gp');
});

it('should handle empty arrays', () => {
	// Arrange
	const mapper = new EquipmentApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockEquipmentApiDto({
		desc: [],
		special: [],
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.desc).toEqual([]);
	expect(result.special).toEqual([]);
});
