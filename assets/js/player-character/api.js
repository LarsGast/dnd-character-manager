import { addToCache, getFromCache } from "./cache.js";

const baseUrl = 'https://www.dnd5eapi.co/api';

/**
 * Enum-like class that holds all endpoints of the SRD API.
 */
export class ApiCategory {
    static AbilityScores = new ApiCategory("ability-scores");
    static Alignments = new ApiCategory("alignments");
    static Backgrounds = new ApiCategory("backgrounds");
    static Classes = new ApiCategory("classes");
    static Conditions = new ApiCategory("conditions");
    static DamageTypes = new ApiCategory("damage-types");
    static Equipment = new ApiCategory("equipment");
    static EquipmentCategories = new ApiCategory("equipment-categories");
    static Feats = new ApiCategory("feats");
    static Features = new ApiCategory("features");
    static Languages = new ApiCategory("languages");
    static MagicItems = new ApiCategory("magic-items");
    static MagicSchools = new ApiCategory("magic-schools");
    static Monsters = new ApiCategory("monsters");
    static Proficiencies = new ApiCategory("proficiencies");
    static Races = new ApiCategory("races");
    static RuleSections = new ApiCategory("rule-sections");
    static Rules = new ApiCategory("rules");
    static Skills = new ApiCategory("skills");
    static Spells = new ApiCategory("spells");
    static Subclasses = new ApiCategory("subclasses");
    static Subraces = new ApiCategory("subraces");
    static Traits = new ApiCategory("traits");
    static WeaponProperties = new ApiCategory("weapon-properties");

    constructor(name) {
        this.name = name
    }
}

/**
 * Enum-like class that holds certain indexes of equipment categories in the SRD API.
 * Does not include everything (yet).
 */
export class EquipmentCategoryIndex {
    static HeavyArmor = new EquipmentCategoryIndex("heavy-armor");
    static MediumArmor = new EquipmentCategoryIndex("medium-armor");
    static LightArmor = new EquipmentCategoryIndex("light-armor");
    static Shields = new EquipmentCategoryIndex("shields");

    static SimpleMeleeWeapons = new EquipmentCategoryIndex("simple-melee-weapons");
    static MartialMeleeWeapons = new EquipmentCategoryIndex("martial-melee-weapons");

    static SimpleRangedWeapons = new EquipmentCategoryIndex("simple-ranged-weapons");
    static MartialRangedWeapons = new EquipmentCategoryIndex("martial-ranged-weapons");

    constructor(name) {
        this.name = name
    }
}

/**
 * Call the SRD API and return the results.
 * @param {ApiCategory} apiCategory Category or endpoint of the resource.
 * @param {string} index Identifier of the resource (optional).
 * @returns {Promise<JSON>} Full object as specified in the SRD API specifications.
 */
export const getApiResultsAsync = async function(apiCategory, index = null) {

    // Craft the URL string bases on the given parameters.
    // index?.name is not undefined if it is an enum-like class.
    let indexString = index?.name ?? index ?? '';
    const url = `${baseUrl}/${apiCategory.name}/${indexString}`;

    // Check the cache first.
    const cachedData = getFromCache(url);
    if (cachedData) {
        return cachedData;
    }

    // If cache isn't hit, call the API and add the results to the cache.
    const data = await getApiDataAsync(url);
    addToCache(url, data);

    return data;
}

/**
 * Perform an API call and get data from https://www.dnd5eapi.co.
 * @param {string} url 
 * @returns {Promise<JSON>}
 */
const getApiDataAsync = async function(url) {

    try {
        const response = await fetch(url);

        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json;
    }
    catch (error) {
        console.error(error.message);
    }
}