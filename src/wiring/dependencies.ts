import { AbilityBonusMapper } from "../mappers/AbilityBonusMapper";
import { BaseResourceMapper } from "../mappers/BaseResourceMapper";
import { ChoiceMapper } from "../mappers/ChoiceMapper";
import { RaceMapper } from "../mappers/RaceMapper";
import { BaseResourceRepository } from "../repositories/BaseResourceRepository";
import { HomebrewRepository } from "../repositories/HomebrewRepository";
import { CacheService } from "../services/CacheService";
import { LocalStorageService } from "../services/LocalStorageService";
import { SrdApiService } from "../services/SrdApiService";

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
const srdApiService = new SrdApiService(cacheService, fetch);

// --------------------
// Mappers
// --------------------
const baseResourceMapper = new BaseResourceMapper();
const abilityBonusMapper = new AbilityBonusMapper(baseResourceMapper);
const choiceMapper = new ChoiceMapper(baseResourceMapper);

const raceMapper = new RaceMapper(baseResourceMapper, abilityBonusMapper, choiceMapper);

// --------------------
// Repositories
// --------------------
const homebrewRepository = new HomebrewRepository(localStorageService);
const raceRepository = new BaseResourceRepository("races", homebrewRepository, srdApiService, baseResourceMapper, raceMapper);