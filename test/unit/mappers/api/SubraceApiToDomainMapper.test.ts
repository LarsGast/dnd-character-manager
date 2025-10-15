import { it, expect } from 'vitest';
import { SubraceApiToDomainMapper } from '../../../../src/mappers/api/SubraceApiToDomainMapper';
import {
	getMockSubraceApiDto,
	getMockResourceReferenceApiDto,
	getMockAbilityBonusApiDto,
	getMockChoiceApiDto,
} from './testUtils/ApiTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';

it('should map all non-reference properties from API to domain correctly', () => {
	// Arrange
	const mapper = new SubraceApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockSubraceApiDto({
		desc: 'Detailed subrace description',
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.desc).toBe('Detailed subrace description');
});

it('should map base resource properties from API to domain correctly', () => {
	// Arrange
	const baseResourceMapper = getMockMapper();
	const mapper = new SubraceApiToDomainMapper(
		baseResourceMapper,
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockSubraceApiDto();

	// Act
	mapper.map(apiDto);

	// Assert
	expect(baseResourceMapper.map).toHaveBeenCalledWith(apiDto);
});

it('should map race reference from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new SubraceApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		resourceReferenceMapper,
	);
	const raceRef = getMockResourceReferenceApiDto();
	const apiDto = getMockSubraceApiDto({
		race: raceRef,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(raceRef);
});

it('should map ability_bonuses array from API to domain correctly', () => {
	// Arrange
	const abilityBonusMapper = getMockMapper();
	const mapper = new SubraceApiToDomainMapper(
		getMockMapper(),
		abilityBonusMapper,
		getMockMapper(),
		getMockMapper(),
	);
	const abilityBonuses = [getMockAbilityBonusApiDto()];
	const apiDto = getMockSubraceApiDto({
		ability_bonuses: abilityBonuses,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(abilityBonusMapper.map).toHaveBeenCalledWith(abilityBonuses[0]);
});

it('should map starting_proficiencies array references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new SubraceApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		resourceReferenceMapper,
	);
	const startingProficiencies = [getMockResourceReferenceApiDto()];
	const apiDto = getMockSubraceApiDto({
		starting_proficiencies: startingProficiencies,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(
		startingProficiencies[0],
	);
});

it('should map languages array references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new SubraceApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		resourceReferenceMapper,
	);
	const languages = [getMockResourceReferenceApiDto()];
	const apiDto = getMockSubraceApiDto({
		languages: languages,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(languages[0]);
});

it('should map racial_traits array references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new SubraceApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		resourceReferenceMapper,
	);
	const racialTraits = [getMockResourceReferenceApiDto()];
	const apiDto = getMockSubraceApiDto({
		racial_traits: racialTraits,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(racialTraits[0]);
});

it('should map optional language_options from API to domain correctly', () => {
	// Arrange
	const choiceMapper = getMockMapper();
	const mapper = new SubraceApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		choiceMapper,
		getMockMapper(),
	);
	const languageOptions = getMockChoiceApiDto();
	const apiDto = getMockSubraceApiDto({
		language_options: languageOptions,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(choiceMapper.map).toHaveBeenCalledWith(languageOptions);
});

it('should handle undefined language_options', () => {
	// Arrange
	const mapper = new SubraceApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockSubraceApiDto({
		language_options: undefined,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.language_options).toBeUndefined();
});

it('should handle empty arrays', () => {
	// Arrange
	const mapper = new SubraceApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockSubraceApiDto({
		ability_bonuses: [],
		starting_proficiencies: [],
		languages: [],
		racial_traits: [],
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.ability_bonuses).toEqual([]);
	expect(result.starting_proficiencies).toEqual([]);
	expect(result.languages).toEqual([]);
	expect(result.racial_traits).toEqual([]);
});
