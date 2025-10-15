import { it, expect } from 'vitest';
import { RaceApiToDomainMapper } from '../../../../src/mappers/api/RaceApiToDomainMapper';
import {
	getMockRaceApiDto,
	getMockResourceReferenceApiDto,
	getMockAbilityBonusApiDto,
	getMockChoiceApiDto,
} from './testUtils/ApiTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';

it('should map all non-reference properties from API to domain correctly', () => {
	// Arrange
	const mapper = new RaceApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockRaceApiDto({
		speed: 35,
		age: 'Reach adulthood at 18',
		alignment: 'Tend toward chaos',
		size: 'Medium',
		size_description: 'Between 5 and 6 feet tall',
		language_desc: 'You can speak, read, and write Common',
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.speed).toBe(35);
	expect(result.age).toBe('Reach adulthood at 18');
	expect(result.alignment).toBe('Tend toward chaos');
	expect(result.size).toBe('Medium');
	expect(result.size_description).toBe('Between 5 and 6 feet tall');
	expect(result.language_desc).toBe('You can speak, read, and write Common');
});

it('should map base resource properties from API to domain correctly', () => {
	// Arrange
	const baseResourceMapper = getMockMapper();
	const mapper = new RaceApiToDomainMapper(
		baseResourceMapper,
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockRaceApiDto();

	// Act
	mapper.map(apiDto);

	// Assert
	expect(baseResourceMapper.map).toHaveBeenCalledWith(apiDto);
});

it('should map ability_bonuses array from API to domain correctly', () => {
	// Arrange
	const abilityBonusMapper = getMockMapper();
	const mapper = new RaceApiToDomainMapper(
		getMockMapper(),
		abilityBonusMapper,
		getMockMapper(),
		getMockMapper(),
	);
	const abilityBonuses = [getMockAbilityBonusApiDto()];
	const apiDto = getMockRaceApiDto({
		ability_bonuses: abilityBonuses,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(abilityBonusMapper.map).toHaveBeenCalledWith(abilityBonuses[0]);
});

it('should map languages array references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new RaceApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		resourceReferenceMapper,
	);
	const languages = [getMockResourceReferenceApiDto()];
	const apiDto = getMockRaceApiDto({
		languages: languages,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(languages[0]);
});

it('should map subraces array references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new RaceApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		resourceReferenceMapper,
	);
	const subraces = [getMockResourceReferenceApiDto()];
	const apiDto = getMockRaceApiDto({
		subraces: subraces,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(subraces[0]);
});

it('should map optional language_options from API to domain correctly', () => {
	// Arrange
	const choiceMapper = getMockMapper();
	const mapper = new RaceApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		choiceMapper,
		getMockMapper(),
	);
	const languageOptions = getMockChoiceApiDto();
	const apiDto = getMockRaceApiDto({
		language_options: languageOptions,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(choiceMapper.map).toHaveBeenCalledWith(languageOptions);
});

it('should handle undefined language_options', () => {
	// Arrange
	const mapper = new RaceApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockRaceApiDto({
		language_options: undefined,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.language_options).toBeUndefined();
});

it('should always set traits to empty array', () => {
	// Arrange
	const mapper = new RaceApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockRaceApiDto();

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.traits).toEqual([]);
});

it('should handle empty arrays', () => {
	// Arrange
	const mapper = new RaceApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockRaceApiDto({
		ability_bonuses: [],
		languages: [],
		subraces: [],
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.ability_bonuses).toEqual([]);
	expect(result.languages).toEqual([]);
	expect(result.subraces).toEqual([]);
});

it('should map multiple ability bonuses correctly', () => {
	// Arrange
	const abilityBonusMapper = getMockMapper();
	const mapper = new RaceApiToDomainMapper(
		getMockMapper(),
		abilityBonusMapper,
		getMockMapper(),
		getMockMapper(),
	);
	const abilityBonuses = [
		getMockAbilityBonusApiDto(),
		getMockAbilityBonusApiDto(),
	];
	const apiDto = getMockRaceApiDto({
		ability_bonuses: abilityBonuses,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(abilityBonusMapper.map).toHaveBeenCalledTimes(2);
	expect(abilityBonusMapper.map).toHaveBeenCalledWith(abilityBonuses[0]);
	expect(abilityBonusMapper.map).toHaveBeenCalledWith(abilityBonuses[1]);
});
