import { addToCache, getFromCache } from "./cache.js";

export const baseUrl = 'https://www.dnd5eapi.co/api/2014';

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

        /** @type {string} */
        this.name = name;
    }

    /**
     * Returns the singular name of the category, e.g. "Class" for "classes".
     * @returns {string|null} The singular name or null if not applicable.
     */
    getSingularName() {
        switch (this.name) {
            case "races": return "Race";
            default: return null;
        }
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
 * @param {string} url The URL to call.
 * @param {number} retryCount Number of retries in case of rate limiting. 
 * @returns {Promise<JSON>}
 */
const getApiDataAsync = async function(url, retryCount = 0) {

    try {
        const response = await fetch(url);

        // Success.
        if (response.ok) {
            const json = await response.json();
            return json;
        }

        // Too Many Requests (HTTP 429) - rate limiting.
        if (response.status === 429) {

            if (retryCount >= 5) {
                throw new Error("Too many retries, giving up.");
            }

            const retryAfterMs = 1000; // The `retry-after` header is not provided by the API, so we use a fixed delay.
            console.warn(`Rate limit hit. Retrying after ${retryAfterMs} ms...`);
            await new Promise(resolve => setTimeout(resolve, retryAfterMs));
            return getApiDataAsync(url, retryCount++);
        }

        // Any other error status.
        throw new Error(`Response status: ${response.status}`);
    }
    catch (error) {
        console.error(error.message);
    }
}