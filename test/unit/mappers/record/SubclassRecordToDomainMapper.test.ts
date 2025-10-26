import { it, expect } from 'vitest';
import { SubclassRecordToDomainMapper } from '../../../../src/mappers/record/SubclassRecordToDomainMapper';
import {
	getMockSubclassRecord,
	getMockResourceReferenceRecord,
	getMockSubclassSpellRecord,
	getMockSubclassFeatureRecord,
} from './testUtils/RecordTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';

it('should map all non-reference properties from record to domain correctly', () => {
	// Arrange
	const mapper = new SubclassRecordToDomainMapper(
		getMockMapper(),
		getMockMapper(),
	);
	const record = getMockSubclassRecord({
		desc: ['Subclass description line 1', 'Subclass description line 2'],
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.desc).toEqual([
		'Subclass description line 1',
		'Subclass description line 2',
	]);
});

it('should map base resource properties from record to domain correctly', () => {
	// Arrange
	const baseResourceMapper = getMockMapper();
	const mapper = new SubclassRecordToDomainMapper(
		baseResourceMapper,
		getMockMapper(),
	);
	const record = getMockSubclassRecord();

	// Act
	mapper.map(record);

	// Assert
	expect(baseResourceMapper.map).toHaveBeenCalledWith(record);
});

it('should map class reference from record to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new SubclassRecordToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const classRef = getMockResourceReferenceRecord();
	const record = getMockSubclassRecord({
		class: classRef,
	});

	// Act
	mapper.map(record);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(classRef);
});

it('should map spells array from record to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new SubclassRecordToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const spellRef = getMockResourceReferenceRecord({ name: 'Fireball' });
	const spell = getMockSubclassSpellRecord({
		level: 3,
		spell: spellRef,
	});
	const record = getMockSubclassRecord({
		spells: [spell],
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.spells).toHaveLength(1);
	expect(result.spells[0].level).toBe(3);
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(spellRef);
});

it('should map features array from record to domain correctly', () => {
	// Arrange
	const mapper = new SubclassRecordToDomainMapper(
		getMockMapper(),
		getMockMapper(),
	);
	const features = [
		getMockSubclassFeatureRecord({
			name: 'Feature 1',
			level: 3,
			description: 'Description 1',
		}),
		getMockSubclassFeatureRecord({
			name: 'Feature 2',
			level: 7,
			description: 'Description 2',
		}),
	];
	const record = getMockSubclassRecord({
		features: features,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.features).toHaveLength(2);
	expect(result.features[0].name).toBe('Feature 1');
	expect(result.features[0].level).toBe(3);
	expect(result.features[0].description).toBe('Description 1');
	expect(result.features[1].name).toBe('Feature 2');
	expect(result.features[1].level).toBe(7);
	expect(result.features[1].description).toBe('Description 2');
});

it('should handle empty spells array', () => {
	// Arrange
	const mapper = new SubclassRecordToDomainMapper(
		getMockMapper(),
		getMockMapper(),
	);
	const record = getMockSubclassRecord({
		spells: [],
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.spells).toEqual([]);
});

it('should handle empty features array', () => {
	// Arrange
	const mapper = new SubclassRecordToDomainMapper(
		getMockMapper(),
		getMockMapper(),
	);
	const record = getMockSubclassRecord({
		features: [],
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.features).toEqual([]);
});

it('should map class reference when defined', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new SubclassRecordToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const classRef = getMockResourceReferenceRecord();
	const record = getMockSubclassRecord({
		class: classRef,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.class).toBeDefined();
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(classRef);
});

it('should map multiple spells correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new SubclassRecordToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const spells = [
		getMockSubclassSpellRecord({ level: 1 }),
		getMockSubclassSpellRecord({ level: 2 }),
		getMockSubclassSpellRecord({ level: 3 }),
	];
	const record = getMockSubclassRecord({
		spells: spells,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	// Called 4 times: once for the class field and 3 times for spell references
	expect(resourceReferenceMapper.map).toHaveBeenCalledTimes(4);
	expect(result.spells).toHaveLength(3);
	expect(result.spells[0].level).toBe(1);
	expect(result.spells[1].level).toBe(2);
	expect(result.spells[2].level).toBe(3);
});

it('should map spell reference correctly for each spell', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new SubclassRecordToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const spellRef1 = getMockResourceReferenceRecord({ name: 'Spell 1' });
	const spellRef2 = getMockResourceReferenceRecord({ name: 'Spell 2' });
	const spells = [
		getMockSubclassSpellRecord({ spell: spellRef1 }),
		getMockSubclassSpellRecord({ spell: spellRef2 }),
	];
	const record = getMockSubclassRecord({
		spells: spells,
	});

	// Act
	mapper.map(record);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(spellRef1);
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(spellRef2);
});
