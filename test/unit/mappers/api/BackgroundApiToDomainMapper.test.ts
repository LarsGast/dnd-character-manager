import { it, expect } from 'vitest';
import { BackgroundApiToDomainMapper } from '../../../../src/mappers/api-to-domain/BackgroundApiToDomainMapper';
import {
	getMockBackgroundApiDto,
	getMockResourceReferenceApiDto,
	getMockChoiceApiDto,
	getMockBackgroundFeatureApiDto,
} from './testUtils/ApiTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';

it('should map base resource properties from API to domain correctly', () => {
	// Arrange
	const baseResourceMapper = getMockMapper();
	const mapper = new BackgroundApiToDomainMapper(
		baseResourceMapper,
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockBackgroundApiDto();

	// Act
	mapper.map(apiDto);

	// Assert
	expect(baseResourceMapper.map).toHaveBeenCalledWith(apiDto);
});

it('should map starting_proficiencies array references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new BackgroundApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		resourceReferenceMapper,
	);
	const startingProficiencies = [getMockResourceReferenceApiDto()];
	const apiDto = getMockBackgroundApiDto({
		starting_proficiencies: startingProficiencies,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(
		startingProficiencies[0],
	);
});

it('should map starting_equipment array references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new BackgroundApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		resourceReferenceMapper,
	);
	const startingEquipment = [getMockResourceReferenceApiDto()];
	const apiDto = getMockBackgroundApiDto({
		starting_equipment: startingEquipment,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(
		startingEquipment[0],
	);
});

it('should map language_options choice from API to domain correctly', () => {
	// Arrange
	const choiceMapper = getMockMapper();
	const mapper = new BackgroundApiToDomainMapper(
		getMockMapper(),
		choiceMapper,
		getMockMapper(),
	);
	const languageOptions = getMockChoiceApiDto();
	const apiDto = getMockBackgroundApiDto({
		language_options: languageOptions,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(choiceMapper.map).toHaveBeenCalledWith(languageOptions);
});

it('should map starting_equipment_options choice from API to domain correctly', () => {
	// Arrange
	const choiceMapper = getMockMapper();
	const mapper = new BackgroundApiToDomainMapper(
		getMockMapper(),
		choiceMapper,
		getMockMapper(),
	);
	const equipmentOptions = getMockChoiceApiDto();
	const apiDto = getMockBackgroundApiDto({
		starting_equipment_options: equipmentOptions,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(choiceMapper.map).toHaveBeenCalledWith(equipmentOptions);
});

it('should map all choice properties correctly', () => {
	// Arrange
	const choiceMapper = getMockMapper();
	const mapper = new BackgroundApiToDomainMapper(
		getMockMapper(),
		choiceMapper,
		getMockMapper(),
	);
	const personalityTraits = getMockChoiceApiDto();
	const ideals = getMockChoiceApiDto();
	const bonds = getMockChoiceApiDto();
	const flaws = getMockChoiceApiDto();
	const apiDto = getMockBackgroundApiDto({
		personality_traits: personalityTraits,
		ideals: ideals,
		bonds: bonds,
		flaws: flaws,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(choiceMapper.map).toHaveBeenCalledWith(personalityTraits);
	expect(choiceMapper.map).toHaveBeenCalledWith(ideals);
	expect(choiceMapper.map).toHaveBeenCalledWith(bonds);
	expect(choiceMapper.map).toHaveBeenCalledWith(flaws);
});

it('should map background feature properties correctly', () => {
	// Arrange
	const mapper = new BackgroundApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const feature = getMockBackgroundFeatureApiDto({
		name: 'Shelter of the Faithful',
		desc: ['Feature description'],
	});
	const apiDto = getMockBackgroundApiDto({
		feature: feature,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.feature.name).toBe('Shelter of the Faithful');
	expect(result.feature.desc).toEqual(['Feature description']);
});

it('should handle empty arrays', () => {
	// Arrange
	const mapper = new BackgroundApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockBackgroundApiDto({
		starting_proficiencies: [],
		starting_equipment: [],
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.starting_proficiencies).toEqual([]);
	expect(result.starting_equipment).toEqual([]);
});
