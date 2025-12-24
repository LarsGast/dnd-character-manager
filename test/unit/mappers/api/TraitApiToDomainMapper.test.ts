import { it, expect } from 'vitest';
import { TraitApiToDomainMapper } from '../../../../src/mappers/api-to-domain/TraitApiToDomainMapper';
import {
	getMockTraitApiDto,
	getMockResourceReferenceApiDto,
	getMockChoiceApiDto,
} from './testUtils/ApiTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';

it('should map all non-reference properties from API to domain correctly', () => {
	// Arrange
	const mapper = new TraitApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockTraitApiDto({
		desc: ['Trait description line 1', 'Trait description line 2'],
		trait_specific: { some_property: 'value' },
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.desc).toEqual([
		'Trait description line 1',
		'Trait description line 2',
	]);
	expect(result.trait_specific).toEqual({ some_property: 'value' });
});

it('should map base resource properties from API to domain correctly', () => {
	// Arrange
	const baseResourceMapper = getMockMapper();
	const mapper = new TraitApiToDomainMapper(
		baseResourceMapper,
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockTraitApiDto();

	// Act
	mapper.map(apiDto);

	// Assert
	expect(baseResourceMapper.map).toHaveBeenCalledWith(apiDto);
});

it('should map races array references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new TraitApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		resourceReferenceMapper,
	);
	const races = [getMockResourceReferenceApiDto()];
	const apiDto = getMockTraitApiDto({
		races: races,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(races[0]);
});

it('should map subraces array references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new TraitApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		resourceReferenceMapper,
	);
	const subraces = [getMockResourceReferenceApiDto()];
	const apiDto = getMockTraitApiDto({
		subraces: subraces,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(subraces[0]);
});

it('should map proficiencies array references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new TraitApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		resourceReferenceMapper,
	);
	const proficiencies = [getMockResourceReferenceApiDto()];
	const apiDto = getMockTraitApiDto({
		proficiencies: proficiencies,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(proficiencies[0]);
});

it('should map optional proficiency_choices from API to domain correctly', () => {
	// Arrange
	const choiceMapper = getMockMapper();
	const mapper = new TraitApiToDomainMapper(
		getMockMapper(),
		choiceMapper,
		getMockMapper(),
	);
	const proficiencyChoices = getMockChoiceApiDto();
	const apiDto = getMockTraitApiDto({
		proficiency_choices: proficiencyChoices,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(choiceMapper.map).toHaveBeenCalledWith(proficiencyChoices);
});

it('should map optional language_options from API to domain correctly', () => {
	// Arrange
	const choiceMapper = getMockMapper();
	const mapper = new TraitApiToDomainMapper(
		getMockMapper(),
		choiceMapper,
		getMockMapper(),
	);
	const languageOptions = getMockChoiceApiDto();
	const apiDto = getMockTraitApiDto({
		language_options: languageOptions,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(choiceMapper.map).toHaveBeenCalledWith(languageOptions);
});

it('should handle undefined proficiency_choices', () => {
	// Arrange
	const choiceMapper = getMockMapper();
	const mapper = new TraitApiToDomainMapper(
		getMockMapper(),
		choiceMapper,
		getMockMapper(),
	);
	const apiDto = getMockTraitApiDto({
		proficiency_choices: undefined,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.proficiency_choices).toBeUndefined();
});

it('should handle undefined language_options', () => {
	// Arrange
	const choiceMapper = getMockMapper();
	const mapper = new TraitApiToDomainMapper(
		getMockMapper(),
		choiceMapper,
		getMockMapper(),
	);
	const apiDto = getMockTraitApiDto({
		language_options: undefined,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.language_options).toBeUndefined();
});

it('should handle empty arrays', () => {
	// Arrange
	const mapper = new TraitApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockTraitApiDto({
		races: [],
		subraces: [],
		proficiencies: [],
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.races).toEqual([]);
	expect(result.subraces).toEqual([]);
	expect(result.proficiencies).toEqual([]);
});
