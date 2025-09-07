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
    name: string;

    constructor(name: string) {

        /** @type {string} */
        this.name = name;
    }

    /**
     * Returns the singular name of the category, e.g. "Class" for "classes".
     * @returns The singular name or null if not applicable.
     */
    getSingularName(): string | null {
        switch (this.name) {
            case "races": return "Race";
            case "traits": return "Trait";
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

    name: string;

    constructor(name: string) {
        this.name = name
    }
}

/**
 * Call the SRD API and return the results.
 * @param apiCategory Category or endpoint of the resource.
 * @param index Identifier of the resource (optional).
 * @returns Full object as specified in the SRD API specifications.
 */
export async function getApiResultsAsync(apiCategory: ApiCategory, index?: string | EquipmentCategoryIndex): Promise<any> {

    // Craft the URL string bases on the given parameters.
    const indexString = index instanceof EquipmentCategoryIndex ? index.name : index ?? '';
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
 * @param url The URL to call.
 * @param retryCount Number of retries in case of rate limiting. 
 * @returns
 */
async function getApiDataAsync(url: RequestInfo | URL, retryCount: number = 0): Promise<any> {

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
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
    }
}