import { it, expect } from 'vitest';
import { RaceRecordToDomainMapper } from '../../../../src/mappers/record/RaceRecordToDomainMapper';
import {
	getMockRaceRecord,
	getMockResourceReferenceRecord,
	getMockAbilityBonusRecord,
	getMockChoiceRecord,
	getMockRaceTraitRecord,
} from './testUtils/RecordTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';

it('should map all non-reference properties from record to domain correctly', () => {
	// Arrange
	const mapper = new RaceRecordToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const record = getMockRaceRecord({
		speed: 35,
		age: 'Reach adulthood at 18',
		alignment: 'Tend toward chaos',
		size: 'Medium',
		size_description: 'Between 5 and 6 feet tall',
		language_desc: 'You can speak, read, and write Common',
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.speed).toBe(35);
	expect(result.age).toBe('Reach adulthood at 18');
	expect(result.alignment).toBe('Tend toward chaos');
	expect(result.size).toBe('Medium');
	expect(result.size_description).toBe('Between 5 and 6 feet tall');
	expect(result.language_desc).toBe('You can speak, read, and write Common');
});

it('should map base resource properties from record to domain correctly', () => {
	// Arrange
	const baseResourceMapper = getMockMapper();
	const mapper = new RaceRecordToDomainMapper(
		baseResourceMapper,
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const record = getMockRaceRecord();

	// Act
	mapper.map(record);

	// Assert
	expect(baseResourceMapper.map).toHaveBeenCalledWith(record);
});

it('should map ability_bonuses array from record to domain correctly', () => {
	// Arrange
	const abilityBonusMapper = getMockMapper();
	const mapper = new RaceRecordToDomainMapper(
		getMockMapper(),
		abilityBonusMapper,
		getMockMapper(),
		getMockMapper(),
	);
	const abilityBonuses = [getMockAbilityBonusRecord()];
	const record = getMockRaceRecord({
		ability_bonuses: abilityBonuses,
	});

	// Act
	mapper.map(record);

	// Assert
	expect(abilityBonusMapper.map).toHaveBeenCalledWith(abilityBonuses[0]);
});

it('should map languages array references from record to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new RaceRecordToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		resourceReferenceMapper,
	);
	const languages = [getMockResourceReferenceRecord()];
	const record = getMockRaceRecord({
		languages: languages,
	});

	// Act
	mapper.map(record);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(languages[0]);
});

it('should map optional language_options from record to domain correctly', () => {
	// Arrange
	const choiceMapper = getMockMapper();
	const mapper = new RaceRecordToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		choiceMapper,
		getMockMapper(),
	);
	const languageOptions = getMockChoiceRecord();
	const record = getMockRaceRecord({
		language_options: languageOptions,
	});

	// Act
	mapper.map(record);

	// Assert
	expect(choiceMapper.map).toHaveBeenCalledWith(languageOptions);
});

it('should handle undefined language_options', () => {
	// Arrange
	const mapper = new RaceRecordToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const record = getMockRaceRecord({
		language_options: undefined,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.language_options).toBeUndefined();
});

it('should map traits array from record to domain correctly', () => {
	// Arrange
	const mapper = new RaceRecordToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const traits = [
		getMockRaceTraitRecord({ name: 'Trait 1', description: 'Desc 1' }),
		getMockRaceTraitRecord({ name: 'Trait 2', description: 'Desc 2' }),
	];
	const record = getMockRaceRecord({
		traits: traits,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.traits).toHaveLength(2);
	expect(result.traits[0].name).toBe('Trait 1');
	expect(result.traits[0].description).toBe('Desc 1');
	expect(result.traits[1].name).toBe('Trait 2');
	expect(result.traits[1].description).toBe('Desc 2');
});

it('should handle empty ability_bonuses array', () => {
	// Arrange
	const mapper = new RaceRecordToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const record = getMockRaceRecord({
		ability_bonuses: [],
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.ability_bonuses).toEqual([]);
});

it('should handle undefined ability_bonuses array', () => {
	// Arrange
	const mapper = new RaceRecordToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const record = getMockRaceRecord({
		ability_bonuses: undefined,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.ability_bonuses).toEqual([]);
});

it('should handle empty languages array', () => {
	// Arrange
	const mapper = new RaceRecordToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const record = getMockRaceRecord({
		languages: [],
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.languages).toEqual([]);
});

it('should handle undefined languages array', () => {
	// Arrange
	const mapper = new RaceRecordToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const record = getMockRaceRecord({
		languages: undefined,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.languages).toEqual([]);
});

it('should handle empty traits array', () => {
	// Arrange
	const mapper = new RaceRecordToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const record = getMockRaceRecord({
		traits: [],
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.traits).toEqual([]);
});

it('should handle undefined traits array', () => {
	// Arrange
	const mapper = new RaceRecordToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const record = getMockRaceRecord({
		traits: undefined,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.traits).toEqual([]);
});

it('should always set subraces to empty array for record resources', () => {
	// Arrange
	const mapper = new RaceRecordToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const record = getMockRaceRecord();

	// Act
	const result = mapper.map(record);

	// Assert
	expect(result.subraces).toEqual([]);
});

it('should map multiple ability bonuses correctly', () => {
	// Arrange
	const abilityBonusMapper = getMockMapper();
	const mapper = new RaceRecordToDomainMapper(
		getMockMapper(),
		abilityBonusMapper,
		getMockMapper(),
		getMockMapper(),
	);
	const abilityBonuses = [
		getMockAbilityBonusRecord(),
		getMockAbilityBonusRecord(),
		getMockAbilityBonusRecord(),
	];
	const record = getMockRaceRecord({
		ability_bonuses: abilityBonuses,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(abilityBonusMapper.map).toHaveBeenCalledTimes(3);
	expect(result.ability_bonuses).toHaveLength(3);
});

it('should map multiple languages correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new RaceRecordToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		resourceReferenceMapper,
	);
	const languages = [
		getMockResourceReferenceRecord(),
		getMockResourceReferenceRecord(),
	];
	const record = getMockRaceRecord({
		languages: languages,
	});

	// Act
	const result = mapper.map(record);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledTimes(2);
	expect(result.languages).toHaveLength(2);
});
