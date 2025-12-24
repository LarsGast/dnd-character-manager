import { it, expect } from 'vitest';
import { SpellApiToDomainMapper } from '../../../../src/mappers/api-to-domain/SpellApiToDomainMapper';
import {
	getMockSpellApiDto,
	getMockResourceReferenceApiDto,
	getMockAreaOfEffectApiDto,
	getMockSpellDamageApiDto,
	getMockSpellDcApiDto,
} from './testUtils/ApiTypeTestUtils';
import { getMockMapper } from './testUtils/MapperTestUtils';

it('should map all non-reference properties from API to domain correctly', () => {
	// Arrange
	const mapper = new SpellApiToDomainMapper(getMockMapper(), getMockMapper());
	const apiDto = getMockSpellApiDto({
		desc: ['Spell description line 1', 'Spell description line 2'],
		higher_level: ['At higher levels...'],
		range: '60 feet',
		components: ['V', 'S', 'M'],
		material: 'A pinch of sulfur',
		ritual: true,
		duration: '1 minute',
		concentration: true,
		casting_time: '1 action',
		level: 3,
		attack_type: 'ranged',
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.desc).toEqual([
		'Spell description line 1',
		'Spell description line 2',
	]);
	expect(result.higher_level).toEqual(['At higher levels...']);
	expect(result.range).toBe('60 feet');
	expect(result.components).toEqual(['V', 'S', 'M']);
	expect(result.material).toBe('A pinch of sulfur');
	expect(result.ritual).toBe(true);
	expect(result.duration).toBe('1 minute');
	expect(result.concentration).toBe(true);
	expect(result.casting_time).toBe('1 action');
	expect(result.level).toBe(3);
	expect(result.attack_type).toBe('ranged');
});

it('should map base resource properties from API to domain correctly', () => {
	// Arrange
	const baseResourceMapper = getMockMapper();
	const mapper = new SpellApiToDomainMapper(
		baseResourceMapper,
		getMockMapper(),
	);
	const apiDto = getMockSpellApiDto();

	// Act
	mapper.map(apiDto);

	// Assert
	expect(baseResourceMapper.map).toHaveBeenCalledWith(apiDto);
});

it('should map school reference from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new SpellApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const school = getMockResourceReferenceApiDto();
	const apiDto = getMockSpellApiDto({
		school: school,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(school);
});

it('should map classes array references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new SpellApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const classes = [getMockResourceReferenceApiDto()];
	const apiDto = getMockSpellApiDto({
		classes: classes,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(classes[0]);
});

it('should map subclasses array references from API to domain correctly', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new SpellApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const subclasses = [getMockResourceReferenceApiDto()];
	const apiDto = getMockSpellApiDto({
		subclasses: subclasses,
	});

	// Act
	mapper.map(apiDto);

	// Assert
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(subclasses[0]);
});

it('should map area_of_effect when present', () => {
	// Arrange
	const mapper = new SpellApiToDomainMapper(getMockMapper(), getMockMapper());
	const areaOfEffect = getMockAreaOfEffectApiDto({
		size: 20,
		type: 'sphere',
	});
	const apiDto = getMockSpellApiDto({
		area_of_effect: areaOfEffect,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.area_of_effect).toBeDefined();
	expect(result.area_of_effect!.size).toBe(20);
	expect(result.area_of_effect!.type).toBe('sphere');
});

it('should handle undefined area_of_effect', () => {
	// Arrange
	const mapper = new SpellApiToDomainMapper(getMockMapper(), getMockMapper());
	const apiDto = getMockSpellApiDto({
		area_of_effect: undefined,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.area_of_effect).toBeUndefined();
});

it('should map damage when present', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new SpellApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const damageType = getMockResourceReferenceApiDto();
	const damage = getMockSpellDamageApiDto({
		damage_type: damageType,
		damage_at_slot_level: { '1': '3d6', '2': '4d6' },
	});
	const apiDto = getMockSpellApiDto({
		damage: damage,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.damage).toBeDefined();
	expect(result.damage!.damage_at_slot_level).toEqual({
		'1': '3d6',
		'2': '4d6',
	});
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(damageType);
});

it('should handle undefined damage', () => {
	// Arrange
	const mapper = new SpellApiToDomainMapper(getMockMapper(), getMockMapper());
	const apiDto = getMockSpellApiDto({
		damage: undefined,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.damage).toBeUndefined();
});

it('should map dc when present', () => {
	// Arrange
	const resourceReferenceMapper = getMockMapper();
	const mapper = new SpellApiToDomainMapper(
		getMockMapper(),
		resourceReferenceMapper,
	);
	const dcType = getMockResourceReferenceApiDto();
	const dc = getMockSpellDcApiDto({
		dc_type: dcType,
		dc_value: 0,
		dc_success: 'half',
	});
	const apiDto = getMockSpellApiDto({
		dc: dc,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.dc).toBeDefined();
	expect(result.dc!.dc_value).toBe(0);
	expect(result.dc!.dc_success).toBe('half');
	expect(resourceReferenceMapper.map).toHaveBeenCalledWith(dcType);
});

it('should handle undefined dc', () => {
	// Arrange
	const mapper = new SpellApiToDomainMapper(getMockMapper(), getMockMapper());
	const apiDto = getMockSpellApiDto({
		dc: undefined,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.dc).toBeUndefined();
});

it('should handle optional higher_level', () => {
	// Arrange
	const mapper = new SpellApiToDomainMapper(getMockMapper(), getMockMapper());
	const apiDto = getMockSpellApiDto({
		higher_level: undefined,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.higher_level).toBeUndefined();
});

it('should handle optional material', () => {
	// Arrange
	const mapper = new SpellApiToDomainMapper(getMockMapper(), getMockMapper());
	const apiDto = getMockSpellApiDto({
		material: undefined,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.material).toBeUndefined();
});

it('should handle optional attack_type', () => {
	// Arrange
	const mapper = new SpellApiToDomainMapper(getMockMapper(), getMockMapper());
	const apiDto = getMockSpellApiDto({
		attack_type: undefined,
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.attack_type).toBeUndefined();
});

it('should handle empty arrays', () => {
	// Arrange
	const mapper = new SpellApiToDomainMapper(getMockMapper(), getMockMapper());
	const apiDto = getMockSpellApiDto({
		classes: [],
		subclasses: [],
	});

	// Act
	const result = mapper.map(apiDto);

	// Assert
	expect(result.classes).toEqual([]);
	expect(result.subclasses).toEqual([]);
});
