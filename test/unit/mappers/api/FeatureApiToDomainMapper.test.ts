import { it, expect } from 'vitest';
import { FeatureApiToDomainMapper } from '../../../../src/mappers/api/FeatureApiToDomainMapper';
import {
	getMockFeatureApiDto,
	getMockResourceReferenceApiDto,
} from './testUtils/ApiTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';

it('should map all non-reference properties from API to domain correctly', () => {
	// Arrange
	const mapper = new FeatureApiToDomainMapper(getMockMapper(), getMockMapper());
	const apiDto = getMockFeatureApiDto({
		desc: ['Feature description line 1', 'Feature description line 2'],
		level: 5,
		prerequisites: [{ type: 'level', minimum: 3 }],
		feature_specific: { expertise: true },
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.desc).toEqual([
		'Feature description line 1',
		'Feature description line 2',
	]);
	expect(result.level).toBe(5);
	expect(result.prerequisites).toEqual([{ type: 'level', minimum: 3 }]);
	expect(result.feature_specific).toEqual({ expertise: true });
});

it('should map base resource properties from API to domain correctly', () => {
	// Arrange
	const baseResourceMapper = getMockMapper();
	const mapper = new FeatureApiToDomainMapper(
		baseResourceMapper,
		getMockMapper(),
	);
	const apiDto = getMockFeatureApiDto();

	// Act
	mapper.map(apiDto);

	// Assert
	expect(baseResourceMapper.map).toHaveBeenCalledWith(apiDto);
});

it('should map class reference from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new FeatureApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const classRef = getMockResourceReferenceApiDto();
	const apiDto = getMockFeatureApiDto({
		class: classRef,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(classRef);
});

it('should map optional subclass reference from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new FeatureApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const subclassRef = getMockResourceReferenceApiDto();
	const apiDto = getMockFeatureApiDto({
		subclass: subclassRef,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(subclassRef);
});

it('should map optional parent reference from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new FeatureApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const parentRef = getMockResourceReferenceApiDto();
	const apiDto = getMockFeatureApiDto({
		parent: parentRef,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(parentRef);
});

it('should handle undefined subclass', () => {
	// Arrange
	const mapper = new FeatureApiToDomainMapper(getMockMapper(), getMockMapper());
	const apiDto = getMockFeatureApiDto({
		subclass: undefined,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.subclass).toBeUndefined();
});

it('should handle undefined parent', () => {
	// Arrange
	const mapper = new FeatureApiToDomainMapper(getMockMapper(), getMockMapper());
	const apiDto = getMockFeatureApiDto({
		parent: undefined,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.parent).toBeUndefined();
});
