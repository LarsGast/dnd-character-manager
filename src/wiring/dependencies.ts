import { AbilityBonusApiToDomainMapper } from '../mappers/api-to-domain/AbilityBonusApiToDomainMapper';
import { AbilityScoreApiToDomainMapper } from '../mappers/api-to-domain/AbilityScoreApiToDomainMapper';
import { AlignmentApiToDomainMapper } from '../mappers/api-to-domain/AlignmentApiToDomainMapper';
import { ArmorApiToDomainMapper } from '../mappers/api-to-domain/ArmorApiToDomainMapper';
import { BackgroundApiToDomainMapper } from '../mappers/api-to-domain/BackgroundApiToDomainMapper';
import { BaseResourceApiToDomainMapper } from '../mappers/api-to-domain/BaseResourceApiToDomainMapper';
import { ChoiceApiToDomainMapper } from '../mappers/api-to-domain/ChoiceApiToDomainMapper';
import { ClassLevelApiToDomainMapper } from '../mappers/api-to-domain/ClassLevelApiToDomainMapper';
import { ClassApiToDomainMapper } from '../mappers/api-to-domain/ClassApiToDomainMapper';
import { EquipmentCategoryApiToDomainMapper } from '../mappers/api-to-domain/EquipmentCategoryApiToDomainMapper';
import { EquipmentApiToDomainMapper } from '../mappers/api-to-domain/EquipmentApiToDomainMapper';
import { FeatureApiToDomainMapper } from '../mappers/api-to-domain/FeatureApiToDomainMapper';
import { LanguageApiToDomainMapper } from '../mappers/api-to-domain/LanguageApiToDomainMapper';
import { ProficiencyApiToDomainMapper } from '../mappers/api-to-domain/ProficiencyApiToDomainMapper';
import { RaceApiToDomainMapper } from '../mappers/api-to-domain/RaceApiToDomainMapper';
import { SkillApiToDomainMapper } from '../mappers/api-to-domain/SkillApiToDomainMapper';
import { SubclassApiToDomainMapper } from '../mappers/api-to-domain/SubclassApiToDomainMapper';
import { SubraceApiToDomainMapper } from '../mappers/api-to-domain/SubraceApiToDomainMapper';
import { TraitApiToDomainMapper } from '../mappers/api-to-domain/TraitApiToDomainMapper';
import { WeaponApiToDomainMapper } from '../mappers/api-to-domain/WeaponApiToDomainMapper';
import { ResourceReferenceApiToDomainMapper } from '../mappers/api-to-domain/ResourceReferenceApiToDomainMapper';
import { BaseResourceRepository } from '../repositories/BaseResourceRepository';
import { ClassLevelRepository } from '../repositories/ClassLevelRepository';
import { FeatureRepository } from '../repositories/FeatureRepository';
import { HomebrewRepository } from '../repositories/HomebrewRepository';
import { TraitRepository } from '../repositories/TraitRepository';
import { CacheService } from '../services/CacheService';
import { LocalStorageService } from '../services/LocalStorageService';
import { SrdApiService } from '../services/SrdApiService';
import { AbilityBonusRecordToDomainMapper } from '../mappers/record-to-domain/AbilityBonusRecordToDomainMapper';
import { BaseResourceRecordToDomainMapper } from '../mappers/record-to-domain/BaseResourceRecordToDomainMapper';
import { ChoiceRecordToDomainMapper } from '../mappers/record-to-domain/ChoiceRecordToDomainMapper';
import { RaceRecordToDomainMapper } from '../mappers/record-to-domain/RaceRecordToDomainMapper';
import { ResourceReferenceRecordToDomainMapper } from '../mappers/record-to-domain/ResourceReferenceRecordToDomainMapper';
import { SubclassRecordToDomainMapper } from '../mappers/record-to-domain/SubclassRecordToDomainMapper';
import { ClassRepository } from '../repositories/ClassRepository';
import { SpellApiToDomainMapper } from '../mappers/api-to-domain/SpellApiToDomainMapper';
import { RaceRepository } from '../repositories/RaceRepository';
import { SubclassRepository } from '../repositories/SubclassRepository';
import { ApiService } from '../services/ApiService';
import { ResourceTypeDomainToRecordMapper } from '../mappers/domain-to-record/ResourceTypeDomainToRecordMapper';
import { ResourceTypeDomainToApiMapper } from '../mappers/domain-to-api/ResourceTypeDomainToApiMapper';
import { ResourceType } from '../types/domain/helpers/ResourceType';

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
export const localStorageService = new LocalStorageService(localStorage);
export const cacheService = new CacheService(localStorageService);
export const apiService = new ApiService(globalThis.fetch.bind(globalThis));
export const srdApiService = new SrdApiService(cacheService, apiService);

// --------------------
// API to Domain Mappers
// --------------------
const baseResourceApiToDomainMapper = new BaseResourceApiToDomainMapper();

const resourceReferenceApiToDomainMapper =
	new ResourceReferenceApiToDomainMapper();

const abilityBonusApiToDomainMapper = new AbilityBonusApiToDomainMapper(
	resourceReferenceApiToDomainMapper,
);

const choiceApiToDomainMapper = new ChoiceApiToDomainMapper(
	resourceReferenceApiToDomainMapper,
);

const equipmentApiToDomainMapper = new EquipmentApiToDomainMapper(
	baseResourceApiToDomainMapper,
	resourceReferenceApiToDomainMapper,
);

const abilityScoreApiToDomainMapper = new AbilityScoreApiToDomainMapper(
	baseResourceApiToDomainMapper,
	resourceReferenceApiToDomainMapper,
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
	resourceReferenceApiToDomainMapper,
);

const classApiToDomainMapper = new ClassApiToDomainMapper(
	baseResourceApiToDomainMapper,
	choiceApiToDomainMapper,
	resourceReferenceApiToDomainMapper,
);

const classLevelApiToDomainMapper = new ClassLevelApiToDomainMapper(
	baseResourceApiToDomainMapper,
	resourceReferenceApiToDomainMapper,
);

const equipmentCategoryApiToDomainMapper =
	new EquipmentCategoryApiToDomainMapper(
		baseResourceApiToDomainMapper,
		resourceReferenceApiToDomainMapper,
	);

const featureApiToDomainMapper = new FeatureApiToDomainMapper(
	baseResourceApiToDomainMapper,
	resourceReferenceApiToDomainMapper,
);

const languageApiToDomainMapper = new LanguageApiToDomainMapper(
	baseResourceApiToDomainMapper,
);

const proficiencyApiToDomainMapper = new ProficiencyApiToDomainMapper(
	baseResourceApiToDomainMapper,
	resourceReferenceApiToDomainMapper,
);

const raceApiToDomainMapper = new RaceApiToDomainMapper(
	baseResourceApiToDomainMapper,
	abilityBonusApiToDomainMapper,
	choiceApiToDomainMapper,
	resourceReferenceApiToDomainMapper,
);

const skillApiToDomainMapper = new SkillApiToDomainMapper(
	baseResourceApiToDomainMapper,
	resourceReferenceApiToDomainMapper,
);

const spellApiToDomainMapper = new SpellApiToDomainMapper(
	baseResourceApiToDomainMapper,
	resourceReferenceApiToDomainMapper,
);

const subclassApiToDomainMapper = new SubclassApiToDomainMapper(
	baseResourceApiToDomainMapper,
	resourceReferenceApiToDomainMapper,
);

const subraceApiToDomainMapper = new SubraceApiToDomainMapper(
	baseResourceApiToDomainMapper,
	abilityBonusApiToDomainMapper,
	choiceApiToDomainMapper,
	resourceReferenceApiToDomainMapper,
);

const traitApiToDomainMapper = new TraitApiToDomainMapper(
	baseResourceApiToDomainMapper,
	choiceApiToDomainMapper,
	resourceReferenceApiToDomainMapper,
);

const weaponApiToDomainMapper = new WeaponApiToDomainMapper(
	equipmentApiToDomainMapper,
	resourceReferenceApiToDomainMapper,
);

// --------------------
// Domain to Mappers
// --------------------
const resourceTypeDomainToApiMapper = new ResourceTypeDomainToApiMapper();

// --------------------
// Record to Domain Mappers
// --------------------
const baseResourceRecordToDomainMapper = new BaseResourceRecordToDomainMapper();
const resourceReferenceRecordToDomainMapper =
	new ResourceReferenceRecordToDomainMapper();
const abilityBonusRecordToDomainMapper = new AbilityBonusRecordToDomainMapper(
	resourceReferenceRecordToDomainMapper,
);
const choiceRecordToDomainMapper = new ChoiceRecordToDomainMapper(
	resourceReferenceRecordToDomainMapper,
);
const raceRecordToDomainMapper = new RaceRecordToDomainMapper(
	baseResourceRecordToDomainMapper,
	abilityBonusRecordToDomainMapper,
	choiceRecordToDomainMapper,
	resourceReferenceRecordToDomainMapper,
);

const subclassRecordToDomainMapper = new SubclassRecordToDomainMapper(
	baseResourceRecordToDomainMapper,
	resourceReferenceRecordToDomainMapper,
);

// --------------------
// Domain to Record Mappers
// --------------------
const resourceTypeDomainToRecordMapper = new ResourceTypeDomainToRecordMapper();

// --------------------
// Repositories
// --------------------
export const homebrewRepository = new HomebrewRepository(localStorageService);

export const abilityScoreRepository = new BaseResourceRepository(
	ResourceType.AbilityScore,
	resourceTypeDomainToApiMapper,
	resourceTypeDomainToRecordMapper,
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	abilityScoreApiToDomainMapper,
);

export const alignmentRepository = new BaseResourceRepository(
	ResourceType.Alignment,
	resourceTypeDomainToApiMapper,
	resourceTypeDomainToRecordMapper,
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	alignmentApiToDomainMapper,
);

export const armorRepository = new BaseResourceRepository(
	ResourceType.Equipment,
	resourceTypeDomainToApiMapper,
	resourceTypeDomainToRecordMapper,
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	armorApiToDomainMapper,
);

export const backgroundRepository = new BaseResourceRepository(
	ResourceType.Background,
	resourceTypeDomainToApiMapper,
	resourceTypeDomainToRecordMapper,
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	backgroundApiToDomainMapper,
);

export const classRepository = new ClassRepository(
	resourceTypeDomainToApiMapper,
	resourceTypeDomainToRecordMapper,
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
	ResourceType.EquipmentCategory,
	resourceTypeDomainToApiMapper,
	resourceTypeDomainToRecordMapper,
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	equipmentCategoryApiToDomainMapper,
);

export const featureRepository = new FeatureRepository(
	resourceTypeDomainToApiMapper,
	resourceTypeDomainToRecordMapper,
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	featureApiToDomainMapper,
);

export const languageRepository = new BaseResourceRepository(
	ResourceType.Language,
	resourceTypeDomainToApiMapper,
	resourceTypeDomainToRecordMapper,
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	languageApiToDomainMapper,
);

export const proficiencyRepository = new BaseResourceRepository(
	ResourceType.Proficiency,
	resourceTypeDomainToApiMapper,
	resourceTypeDomainToRecordMapper,
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	proficiencyApiToDomainMapper,
);

export const skillRepository = new BaseResourceRepository(
	ResourceType.Skill,
	resourceTypeDomainToApiMapper,
	resourceTypeDomainToRecordMapper,
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	skillApiToDomainMapper,
);

export const spellRepository = new BaseResourceRepository(
	ResourceType.Spell,
	resourceTypeDomainToApiMapper,
	resourceTypeDomainToRecordMapper,
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	spellApiToDomainMapper,
);

export const subclassRepository = new SubclassRepository(
	resourceTypeDomainToApiMapper,
	resourceTypeDomainToRecordMapper,
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	subclassApiToDomainMapper,
	baseResourceRecordToDomainMapper,
	subclassRecordToDomainMapper,
	featureRepository,
);

export const subraceRepository = new BaseResourceRepository(
	ResourceType.Subrace,
	resourceTypeDomainToApiMapper,
	resourceTypeDomainToRecordMapper,
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	subraceApiToDomainMapper,
);

export const traitRepository = new TraitRepository(
	resourceTypeDomainToApiMapper,
	resourceTypeDomainToRecordMapper,
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	traitApiToDomainMapper,
);

export const raceRepository = new RaceRepository(
	resourceTypeDomainToApiMapper,
	resourceTypeDomainToRecordMapper,
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	raceApiToDomainMapper,
	baseResourceRecordToDomainMapper,
	raceRecordToDomainMapper,
	traitRepository,
);

export const weaponRepository = new BaseResourceRepository(
	ResourceType.Equipment,
	resourceTypeDomainToApiMapper,
	resourceTypeDomainToRecordMapper,
	homebrewRepository,
	srdApiService,
	baseResourceApiToDomainMapper,
	weaponApiToDomainMapper,
);
