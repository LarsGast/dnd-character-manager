import { AbilityBonusApiToDomainMapper } from '../mappers/AbilityBonusApiToDomainMapper.js';
import { AbilityScoreApiToDomainMapper } from '../mappers/AbilityScoreApiToDomainMapper.js';
import { AlignmentApiToDomainMapper } from '../mappers/AlignmentApiToDomainMapper.js';
import { ArmorApiToDomainMapper } from '../mappers/ArmorApiToDomainMapper.js';
import { BackgroundApiToDomainMapper } from '../mappers/BackgroundApiToDomainMapper.js';
import { BaseResourceApiToDomainMapper } from '../mappers/BaseResourceApiToDomainMapper.js';
import { ChoiceApiToDomainMapper } from '../mappers/ChoiceApiToDomainMapper.js';
import { ClassLevelApiToDomainMapper } from '../mappers/ClassLevelApiToDomainMapper.js';
import { ClassApiToDomainMapper } from '../mappers/ClassApiToDomainMapper.js';
import { EquipmentCategoryApiToDomainMapper } from '../mappers/EquipmentCategoryApiToDomainMapper.js';
import { EquipmentApiToDomainMapper } from '../mappers/EquipmentApiToDomainMapper.js';
import { FeatureApiToDomainMapper } from '../mappers/FeatureApiToDomainMapper.js';
import { LanguageApiToDomainMapper } from '../mappers/LanguageApiToDomainMapper.js';
import { ProficiencyApiToDomainMapper } from '../mappers/ProficiencyApiToDomainMapper.js';
import { RaceApiToDomainMapper } from '../mappers/RaceApiToDomainMapper.js';
import { SkillApiToDomainMapper } from '../mappers/SkillApiToDomainMapper.js';
import { SubclassApiToDomainMapper } from '../mappers/SubclassApiToDomainMapper.js';
import { SubraceApiToDomainMapper } from '../mappers/SubraceApiToDomainMapper.js';
import { TraitApiToDomainMapper } from '../mappers/TraitApiToDomainMapper.js';
import { WeaponApiToDomainMapper } from '../mappers/WeaponApiToDomainMapper.js';
import { BaseResourceRepository } from '../repositories/BaseResourceRepository.js';
import { ClassLevelRepository } from '../repositories/ClassLevelRepository.js';
import { FeatureRepository } from '../repositories/FeatureRepository.js';
import { HomebrewRepository } from '../repositories/HomebrewRepository.js';
import { TraitRepository } from '../repositories/TraitRepository.js';
import { CacheService } from '../services/CacheService.js';
import { LocalStorageService } from '../services/LocalStorageService.js';
import { SrdApiService } from '../services/SrdApiService.js';

/**
 * Dependency injection container for the entire application.
 *
 * This file contains the wiring of all dependencies including services, repositories, and mappers.
 * Dependencies are organized into categories and wired bottom-up to ensure proper initialization order.
 *
 * To use any dependency, simply import it from this module and invoke its methods.
 * Each dependency can be mocked out individually for testing purposes.
 *
 * When adding new dependencies:
 * 1. Add them to the appropriate category section
 * 2. Ensure dependencies are wired in the correct order (dependencies before dependents)
 * 3. Export them if they should be used directly by other parts of the application
 */

// --------------------
// Services
// --------------------
const localStorageService = new LocalStorageService();
const cacheService = new CacheService(localStorageService);
const srdApiService = new SrdApiService(
	cacheService,
	globalThis.fetch.bind(globalThis),
);

// --------------------
// Mappers
// --------------------
const baseResourceApiToDomainMapper = new BaseResourceApiToDomainMapper();
const abilityBonusApiToDomainMapper = new AbilityBonusApiToDomainMapper(
	baseResourceApiToDomainMapper,
);
const choiceApiToDomainMapper = new ChoiceApiToDomainMapper(
	baseResourceApiToDomainMapper,
);

const equipmentApiToDomainMapper = new EquipmentApiToDomainMapper(
	baseResourceApiToDomainMapper,
);

const abilityScoreApiToDomainMapper = new AbilityScoreApiToDomainMapper(
	baseResourceApiToDomainMapper,
);
const alignmentApiToDomainMapper = new AlignmentApiToDomainMapper(
	baseResourceApiToDomainMapper,
);
const armorApiToDomainMapper = new ArmorApiToDomainMapper(
	equipmentApiToDomainMapper,
);
const backgroundApiToDomainMapper = new BackgroundApiToDomainMapper(
	baseResourceApiToDomainMapper,
	choiceApiToDomainMapper,
);
const classApiToDomainMapper = new ClassApiToDomainMapper(
	baseResourceApiToDomainMapper,
	choiceApiToDomainMapper,
);
const classLevelApiToDomainMapper = new ClassLevelApiToDomainMapper(
	baseResourceApiToDomainMapper,
);
const equipmentCategoryApiToDomainMapper =
	new EquipmentCategoryApiToDomainMapper(baseResourceApiToDomainMapper);
const featureApiToDomainMapper = new FeatureApiToDomainMapper(
	baseResourceApiToDomainMapper,
);
const languageApiToDomainMapper = new LanguageApiToDomainMapper(
	baseResourceApiToDomainMapper,
);
const proficiencyApiToDomainMapper = new ProficiencyApiToDomainMapper(
	baseResourceApiToDomainMapper,
);
const raceApiToDomainMapper = new RaceApiToDomainMapper(
	baseResourceApiToDomainMapper,
	abilityBonusApiToDomainMapper,
	choiceApiToDomainMapper,
);
const skillApiToDomainMapper = new SkillApiToDomainMapper(
	baseResourceApiToDomainMapper,
);
const subclassApiToDomainMapper = new SubclassApiToDomainMapper(
	baseResourceApiToDomainMapper,
);
const subraceApiToDomainMapper = new SubraceApiToDomainMapper(
	baseResourceApiToDomainMapper,
	abilityBonusApiToDomainMapper,
	choiceApiToDomainMapper,
);
const traitApiToDomainMapper = new TraitApiToDomainMapper(
	baseResourceApiToDomainMapper,
	choiceApiToDomainMapper,
);
const weaponApiToDomainMapper = new WeaponApiToDomainMapper(
	baseResourceApiToDomainMapper,
	equipmentApiToDomainMapper,
);

// --------------------
// Repositories
// --------------------
export const homebrewRepository = new HomebrewRepository(localStorageService);

export const abilityScoreRepository = new BaseResourceRepository(
	'ability-scores',
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	abilityScoreApiToDomainMapper,
);
export const alignmentRepository = new BaseResourceRepository(
	'alignments',
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	alignmentApiToDomainMapper,
);
export const armorRepository = new BaseResourceRepository(
	'equipment',
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	armorApiToDomainMapper,
);
export const backgroundRepository = new BaseResourceRepository(
	'backgrounds',
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	backgroundApiToDomainMapper,
);
export const classRepository = new BaseResourceRepository(
	'classes',
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	classApiToDomainMapper,
);
export const classLevelRepository = new ClassLevelRepository(
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	classLevelApiToDomainMapper,
);
export const equipmentCategoryRepository = new BaseResourceRepository(
	'equipment-categories',
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	equipmentCategoryApiToDomainMapper,
);
export const featureRepository = new FeatureRepository(
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	featureApiToDomainMapper,
);
export const languageRepository = new BaseResourceRepository(
	'languages',
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	languageApiToDomainMapper,
);
export const proficiencyRepository = new BaseResourceRepository(
	'proficiencies',
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	proficiencyApiToDomainMapper,
);
export const raceRepository = new BaseResourceRepository(
	'races',
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	raceApiToDomainMapper,
);
export const skillRepository = new BaseResourceRepository(
	'skills',
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	skillApiToDomainMapper,
);
export const subclassRepository = new BaseResourceRepository(
	'subclasses',
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	subclassApiToDomainMapper,
);
export const subraceRepository = new BaseResourceRepository(
	'subraces',
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	subraceApiToDomainMapper,
);
export const traitRepository = new TraitRepository(
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	traitApiToDomainMapper,
);
export const weaponRepository = new BaseResourceRepository(
	'equipment',
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	weaponApiToDomainMapper,
);
