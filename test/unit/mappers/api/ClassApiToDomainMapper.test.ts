import { it, expect } from 'vitest';
import { ClassApiToDomainMapper } from '../../../../src/mappers/api-to-domain/ClassApiToDomainMapper';
import {
	getMockClassApiDto,
	getMockResourceReferenceApiDto,
	getMockChoiceApiDto,
	getMockMultiClassingApiDto,
	getMockPrerequisiteApiDto,
	getMockSpellCastingApiDto,
	getMockSpellCastingInfoApiDto,
	getMockStartingEquipmentApiDto,
} from './testUtils/ApiTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';
import { MultiClassingApiDto } from '../../../../src/types/api/resources/ClassApiDto';

it('should map all non-reference properties from API to domain correctly', () => {
	// Arrange
	const mapper = new ClassApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockClassApiDto({
		hit_die: 10,
		class_levels: '/api/classes/fighter/levels',
		spells: '/api/classes/wizard/spells',
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.hit_die).toBe(10);
	expect(result.class_levels).toBe('/api/classes/fighter/levels');
	expect(result.spells).toBe('/api/classes/wizard/spells');
});

it('should map base resource properties from API to domain correctly', () => {
	// Arrange
	const baseResourceMapper = getMockMapper();
	const mapper = new ClassApiToDomainMapper(
		baseResourceMapper,
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockClassApiDto();

	// Act
	mapper.map(apiDto);

	// Assert
	expect(baseResourceMapper.map).toHaveBeenCalledWith(apiDto);
});

it('should map starting_equipment array correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ClassApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		resourceReferenceMapper,
	);
	const equipment = getMockStartingEquipmentApiDto();
	const apiDto = getMockClassApiDto({
		starting_equipment: [equipment],
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.starting_equipment).toHaveLength(1);
	expect(result.starting_equipment[0].quantity).toBe(equipment.quantity);
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(equipment.equipment);
});

it('should map starting_equipment_options array from API to domain correctly', () => {
	// Arrange
	const choiceMapper = getMockMapper();
	const mapper = new ClassApiToDomainMapper(
		getMockMapper(),
		choiceMapper,
		getMockMapper(),
	);
	const choices = [getMockChoiceApiDto()];
	const apiDto = getMockClassApiDto({
		starting_equipment_options: choices,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(choiceMapper.map).toHaveBeenCalledWith(choices[0]);
});

it('should map proficiency_choices array from API to domain correctly', () => {
	// Arrange
	const choiceMapper = getMockMapper();
	const mapper = new ClassApiToDomainMapper(
		getMockMapper(),
		choiceMapper,
		getMockMapper(),
	);
	const choices = [getMockChoiceApiDto()];
	const apiDto = getMockClassApiDto({
		proficiency_choices: choices,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(choiceMapper.map).toHaveBeenCalledWith(choices[0]);
});

it('should map proficiencies array references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ClassApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		resourceReferenceMapper,
	);
	const proficiencies = [getMockResourceReferenceApiDto()];
	const apiDto = getMockClassApiDto({
		proficiencies: proficiencies,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(proficiencies[0]);
});

it('should map saving_throws array references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ClassApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		resourceReferenceMapper,
	);
	const savingThrows = [getMockResourceReferenceApiDto()];
	const apiDto = getMockClassApiDto({
		saving_throws: savingThrows,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(savingThrows[0]);
});

it('should map subclasses array references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ClassApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		resourceReferenceMapper,
	);
	const subclasses = [getMockResourceReferenceApiDto()];
	const apiDto = getMockClassApiDto({
		subclasses: subclasses,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(subclasses[0]);
});

it('should map multi_classing with prerequisites correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ClassApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		resourceReferenceMapper,
	);
	const abilityScore = getMockResourceReferenceApiDto();
	const prerequisite = getMockPrerequisiteApiDto({
		ability_score: abilityScore,
		minimum_score: 13,
	});
	const multiClassing = getMockMultiClassingApiDto({
		prerequisites: [prerequisite],
	});
	const apiDto = getMockClassApiDto({
		multi_classing: multiClassing,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.multi_classing.prerequisites).toHaveLength(1);
	expect(result.multi_classing.prerequisites[0].minimum_score).toBe(13);
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(abilityScore);
});

it('should map prerequisite_options in multi_classing when present', () => {
	// Arrange
	const choiceMapper = getMockMapper();
	const mapper = new ClassApiToDomainMapper(
		getMockMapper(),
		choiceMapper,
		getMockMapper(),
	);
	const prerequisiteOptions = getMockChoiceApiDto();
	const multiClassing = getMockMultiClassingApiDto({
		prerequisite_options: prerequisiteOptions,
	});
	const apiDto = getMockClassApiDto({
		multi_classing: multiClassing,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(choiceMapper.map).toHaveBeenCalledWith(prerequisiteOptions);
});

it('should map proficiency_choices in multi_classing when present', () => {
	// Arrange
	const choiceMapper = getMockMapper();
	const mapper = new ClassApiToDomainMapper(
		getMockMapper(),
		choiceMapper,
		getMockMapper(),
	);
	const proficiencyChoice = getMockChoiceApiDto();
	const multiClassing = getMockMultiClassingApiDto({
		proficiency_choices: [proficiencyChoice],
	});
	const apiDto = getMockClassApiDto({
		multi_classing: multiClassing,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(choiceMapper.map).toHaveBeenCalledWith(proficiencyChoice);
});

it('should handle undefined spellcasting', () => {
	// Arrange
	const mapper = new ClassApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockClassApiDto({
		spellcasting: undefined,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.spellcasting).toBeUndefined();
});

it('should map spellcasting when present', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new ClassApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		resourceReferenceMapper,
	);
	const spellcastingAbility = getMockResourceReferenceApiDto();
	const info = getMockSpellCastingInfoApiDto({
		name: 'Cantrips',
		desc: ['You know cantrips'],
	});
	const spellcasting = getMockSpellCastingApiDto({
		level: 1,
		info: [info],
		spellcasting_ability: spellcastingAbility,
	});
	const apiDto = getMockClassApiDto({
		spellcasting: spellcasting,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.spellcasting).toBeDefined();
	expect(result.spellcasting!.level).toBe(1);
	expect(result.spellcasting!.info).toHaveLength(1);
	expect(result.spellcasting!.info[0].name).toBe('Cantrips');
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(spellcastingAbility);
});

it('should handle empty arrays', () => {
	// Arrange
	const mapper = new ClassApiToDomainMapper(
		getMockMapper(),
		getMockMapper(),
		getMockMapper(),
	);
	const apiDto = getMockClassApiDto({
		starting_equipment: [],
		starting_equipment_options: [],
		proficiency_choices: [],
		proficiencies: [],
		saving_throws: [],
		subclasses: [],
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.starting_equipment).toEqual([]);
	expect(result.starting_equipment_options).toEqual([]);
	expect(result.proficiency_choices).toEqual([]);
	expect(result.proficiencies).toEqual([]);
	expect(result.saving_throws).toEqual([]);
	expect(result.subclasses).toEqual([]);
});
