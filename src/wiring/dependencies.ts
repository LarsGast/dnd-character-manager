import { AbilityBonusMapper } from "../mappers/AbilityBonusMapper.js";
import { AbilityScoreMapper } from "../mappers/AbilityScoreMapper.js";
import { AlignmentMapper } from "../mappers/AlignmentMapper.js";
import { ArmorMapper } from "../mappers/ArmorMapper.js";
import { BackgroundMapper } from "../mappers/BackgroundMapper.js";
import { BaseResourceMapper } from "../mappers/BaseResourceMapper.js";
import { ChoiceMapper } from "../mappers/ChoiceMapper.js";
import { ClassLevelMapper } from "../mappers/ClassLevelMapper.js";
import { ClassMapper } from "../mappers/ClassMapper.js";
import { EquipmentCategoryMapper } from "../mappers/EquipmentCategoryMapper.js";
import { EquipmentMapper } from "../mappers/EquipmentMapper.js";
import { FeatureMapper } from "../mappers/FeatureMapper.js";
import { LanguageMapper } from "../mappers/LanguageMapper.js";
import { ProficiencyMapper } from "../mappers/ProficiencyMapper.js";
import { RaceMapper } from "../mappers/RaceMapper.js";
import { SkillMapper } from "../mappers/SkillMapper.js";
import { SubclassMapper } from "../mappers/SubclassMapper.js";
import { SubraceMapper } from "../mappers/SubraceMapper.js";
import { TraitMapper } from "../mappers/TraitMapper.js";
import { WeaponMapper } from "../mappers/WeaponMapper.js";
import { BaseResourceRepository } from "../repositories/BaseResourceRepository.js";
import { ClassLevelRepository } from "../repositories/ClassLevelRepository.js";
import { FeatureRepository } from "../repositories/FeatureRepository.js";
import { HomebrewRepository } from "../repositories/HomebrewRepository.js";
import { TraitRepository } from "../repositories/TraitRepository.js";
import { CacheService } from "../services/CacheService.js";
import { LocalStorageService } from "../services/LocalStorageService.js";
import { SrdApiService } from "../services/SrdApiService.js";

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
const srdApiService = new SrdApiService(cacheService, globalThis.fetch.bind(globalThis));

// --------------------
// Mappers
// --------------------
const baseResourceMapper = new BaseResourceMapper();
const abilityBonusMapper = new AbilityBonusMapper(baseResourceMapper);
const choiceMapper = new ChoiceMapper(baseResourceMapper);

const equipmentMapper = new EquipmentMapper(baseResourceMapper);

const abilityScoreMapper = new AbilityScoreMapper(baseResourceMapper);
const alignmentMapper = new AlignmentMapper(baseResourceMapper);
const armorMapper = new ArmorMapper(equipmentMapper);
const backgroundMapper = new BackgroundMapper(baseResourceMapper, choiceMapper);
const classMapper = new ClassMapper(baseResourceMapper, choiceMapper);
const classLevelMapper = new ClassLevelMapper(baseResourceMapper);
const equipmentCategoryMapper = new EquipmentCategoryMapper(baseResourceMapper);
const featureMapper = new FeatureMapper(baseResourceMapper);
const languageMapper = new LanguageMapper(baseResourceMapper);
const proficiencyMapper = new ProficiencyMapper(baseResourceMapper);
const raceMapper = new RaceMapper(baseResourceMapper, abilityBonusMapper, choiceMapper);
const skillMapper = new SkillMapper(baseResourceMapper);
const subclassMapper = new SubclassMapper(baseResourceMapper);
const subraceMapper = new SubraceMapper(baseResourceMapper, abilityBonusMapper, choiceMapper);
const traitMapper = new TraitMapper(baseResourceMapper, choiceMapper);
const weaponMapper = new WeaponMapper(baseResourceMapper, equipmentMapper);

// --------------------
// Repositories
// --------------------
export const homebrewRepository = new HomebrewRepository(localStorageService);

export const abilityScoreRepository = new BaseResourceRepository("ability-scores", homebrewRepository, srdApiService, baseResourceMapper, abilityScoreMapper);
export const alignmentRepository = new BaseResourceRepository("alignments", homebrewRepository, srdApiService, baseResourceMapper, alignmentMapper);
export const armorRepository = new BaseResourceRepository("equipment", homebrewRepository, srdApiService, baseResourceMapper, armorMapper);
export const backgroundRepository = new BaseResourceRepository("backgrounds", homebrewRepository, srdApiService, baseResourceMapper, backgroundMapper);
export const classRepository = new BaseResourceRepository("classes", homebrewRepository, srdApiService, baseResourceMapper, classMapper);
export const classLevelRepository = new ClassLevelRepository(homebrewRepository, srdApiService, baseResourceMapper, classLevelMapper);
export const equipmentCategoryRepository = new BaseResourceRepository("equipment-categories", homebrewRepository, srdApiService, baseResourceMapper, equipmentCategoryMapper);
export const featureRepository = new FeatureRepository(homebrewRepository, srdApiService, baseResourceMapper, featureMapper);
export const languageRepository = new BaseResourceRepository("languages", homebrewRepository, srdApiService, baseResourceMapper, languageMapper);
export const proficiencyRepository = new BaseResourceRepository("proficiencies", homebrewRepository, srdApiService, baseResourceMapper, proficiencyMapper);
export const raceRepository = new BaseResourceRepository("races", homebrewRepository, srdApiService, baseResourceMapper, raceMapper);
export const skillRepository = new BaseResourceRepository("skills", homebrewRepository, srdApiService, baseResourceMapper, skillMapper);
export const subclassRepository = new BaseResourceRepository("subclasses", homebrewRepository, srdApiService, baseResourceMapper, subclassMapper);
export const subraceRepository = new BaseResourceRepository("subraces", homebrewRepository, srdApiService, baseResourceMapper, subraceMapper);
export const traitRepository = new TraitRepository(homebrewRepository, srdApiService, baseResourceMapper, traitMapper);
export const weaponRepository = new BaseResourceRepository("equipment", homebrewRepository, srdApiService, baseResourceMapper, weaponMapper);