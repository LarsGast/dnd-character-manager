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

// This file contains the wiring of all dependencies that need to be injected into all services, repositories, and more within the entire codebase.
// The file is split in different categories such as Services, Mappers, and Repositories. New dependencies should be added to the correct category.
// Dependencies need to be wired bottom-up to ensure the dependency exists for use in a dependant service.
// To use any of these dependencies, imply import them and invoke their methods.
// Each individual dependency can be mocked out for testing.

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