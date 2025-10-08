import { AbilityBonusApiToDomainMapper } from '../mappers/api/AbilityBonusApiToDomainMapper';
import { AbilityScoreApiToDomainMapper } from '../mappers/api/AbilityScoreApiToDomainMapper';
import { AlignmentApiToDomainMapper } from '../mappers/api/AlignmentApiToDomainMapper';
import { ArmorApiToDomainMapper } from '../mappers/api/ArmorApiToDomainMapper';
import { BackgroundApiToDomainMapper } from '../mappers/api/BackgroundApiToDomainMapper';
import { BaseResourceApiToDomainMapper } from '../mappers/api/BaseResourceApiToDomainMapper';
import { ChoiceApiToDomainMapper } from '../mappers/api/ChoiceApiToDomainMapper';
import { ClassLevelApiToDomainMapper } from '../mappers/api/ClassLevelApiToDomainMapper';
import { ClassApiToDomainMapper } from '../mappers/api/ClassApiToDomainMapper';
import { EquipmentCategoryApiToDomainMapper } from '../mappers/api/EquipmentCategoryApiToDomainMapper';
import { EquipmentApiToDomainMapper } from '../mappers/api/EquipmentApiToDomainMapper';
import { FeatureApiToDomainMapper } from '../mappers/api/FeatureApiToDomainMapper';
import { LanguageApiToDomainMapper } from '../mappers/api/LanguageApiToDomainMapper';
import { ProficiencyApiToDomainMapper } from '../mappers/api/ProficiencyApiToDomainMapper';
import { RaceApiToDomainMapper } from '../mappers/api/RaceApiToDomainMapper';
import { SkillApiToDomainMapper } from '../mappers/api/SkillApiToDomainMapper';
import { SubclassApiToDomainMapper } from '../mappers/api/SubclassApiToDomainMapper';
import { SubraceApiToDomainMapper } from '../mappers/api/SubraceApiToDomainMapper';
import { TraitApiToDomainMapper } from '../mappers/api/TraitApiToDomainMapper';
import { WeaponApiToDomainMapper } from '../mappers/api/WeaponApiToDomainMapper';
import { BaseResourceRepository } from '../repositories/BaseResourceRepository';
import { ClassLevelRepository } from '../repositories/ClassLevelRepository';
import { FeatureRepository } from '../repositories/FeatureRepository';
import { HomebrewRepository } from '../repositories/HomebrewRepository';
import { TraitRepository } from '../repositories/TraitRepository';
import { CacheService } from '../services/CacheService';
import { LocalStorageService } from '../services/LocalStorageService';
import { SrdApiService } from '../services/SrdApiService';
import { AbilityBonusRecordToDomainMapper } from '../mappers/record/AbilityBonusRecordToDomainMapper';
import { BaseResourceRecordToDomainMapper } from '../mappers/record/BaseResourceRecordToDomainMapper';
import { ChoiceRecordToDomainMapper } from '../mappers/record/ChoiceRecordToDomainMapper';
import { RaceRecordToDomainMapper } from '../mappers/record/RaceRecordToDomainMapper';
import { SubclassRecordToDomainMapper } from '../mappers/record/SubclassRecordToDomainMapper';
import { ClassRepository } from '../repositories/ClassRepository';
import { SpellApiToDomainMapper } from '../mappers/api/SpellApiToDomainMapper';
import { RaceRepository } from '../repositories/RaceRepository';
import { SubclassRepository } from '../repositories/SubclassRepository';

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
// API to Domain Mappers
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

const spellApiToDomainMapper = new SpellApiToDomainMapper(
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
// Record to Domain Mappers
// --------------------
const baseResourceRecordToDomainMapper = new BaseResourceRecordToDomainMapper();
const abilityBonusRecordToDomainMapper = new AbilityBonusRecordToDomainMapper(
	baseResourceRecordToDomainMapper,
);
const choiceRecordToDomainMapper = new ChoiceRecordToDomainMapper(
	baseResourceRecordToDomainMapper,
);
const raceRecordToDomainMapper = new RaceRecordToDomainMapper(
	baseResourceRecordToDomainMapper,
	abilityBonusRecordToDomainMapper,
	choiceRecordToDomainMapper,
);

const subclassRecordToDomainMapper = new SubclassRecordToDomainMapper(
	baseResourceRecordToDomainMapper,
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

export const classRepository = new ClassRepository(
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	classApiToDomainMapper,
	baseResourceRecordToDomainMapper,
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

export const skillRepository = new BaseResourceRepository(
	'skills',
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	skillApiToDomainMapper,
);

export const spellRepository = new BaseResourceRepository(
	'spells',
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	spellApiToDomainMapper,
);

export const subclassRepository = new SubclassRepository(
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	subclassApiToDomainMapper,
	baseResourceRecordToDomainMapper,
	subclassRecordToDomainMapper,
	featureRepository,
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

export const raceRepository = new RaceRepository(
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	raceApiToDomainMapper,
	baseResourceRecordToDomainMapper,
	raceRecordToDomainMapper,
	traitRepository,
);

export const weaponRepository = new BaseResourceRepository(
	'equipment',
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	weaponApiToDomainMapper,
);
