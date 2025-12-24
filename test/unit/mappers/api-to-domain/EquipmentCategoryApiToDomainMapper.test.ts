import { it, expect } from 'vitest';
import { EquipmentCategoryApiToDomainMapper } from '../../../../src/mappers/api-to-domain/EquipmentCategoryApiToDomainMapper';
import {
	getMockEquipmentCategoryApiDto,
	getMockResourceReferenceApiDto,
} from './testUtils/ApiTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';

it('should map base resource properties from API to domain correctly', () => {
	// Arrange
	const baseResourceMapper = getMockMapper();
	const mapper = new EquipmentCategoryApiToDomainMapper(
		baseResourceMapper,
		getMockMapper(),
	);
	const apiDto = getMockEquipmentCategoryApiDto();

	// Act
	mapper.map(apiDto);

	// Assert
	expect(baseResourceMapper.map).toHaveBeenCalledWith(apiDto);
});

it('should map equipment array references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new EquipmentCategoryApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const equipment = [getMockResourceReferenceApiDto()];
	const apiDto = getMockEquipmentCategoryApiDto({
		equipment: equipment,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(equipment[0]);
});

it('should handle empty equipment array', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new EquipmentCategoryApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const apiDto = getMockEquipmentCategoryApiDto({
		equipment: [],
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.equipment).toEqual([]);
	expect(resourceReferenceMapper.map).not.toHaveBeenCalled();
});

it('should map multiple equipment references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new EquipmentCategoryApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const equipment = [
		getMockResourceReferenceApiDto(),
		getMockResourceReferenceApiDto(),
	];
	const apiDto = getMockEquipmentCategoryApiDto({
		equipment: equipment,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledTimes(2);
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(equipment[0]);
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(equipment[1]);
});
