const baseUrl = 'https://www.dnd5eapi.co';

/**
 * Get all class names in the SRD.
 * @returns {string[]}
 */
export const getAllClassNamesAsync = async function() {
    const url = `${baseUrl}/api/classes`;
    const json = await getApiDataAsync(url);
    return json.results.map(result => result.name);
}

/**
 * Get all race names in the SRD.
 * @returns {string[]}
 */
export const getAllRaceNamesAsync = async function() {
    const url = `${baseUrl}/api/races`;
    const json = await getApiDataAsync(url);
    return json.results.map(result => result.name);
}

/**
 * Get all background names in the SRD.
 * @returns {string[]}
 */
export const getAllBackgroundNamesAsync = async function() {
    const url = `${baseUrl}/api/backgrounds`;
    const json = await getApiDataAsync(url);
    return json.results.map(result => result.name);
}

/**
 * Get all background names in the SRD.
 * @returns {string[]}
 */
export const getAllAlignmentNamesAsync = async function() {
    const url = `${baseUrl}/api/alignments`;
    const json = await getApiDataAsync(url);
    return json.results.map(result => result.name);
}

/**
 * Get all simple melee weapons in the SRD.
 * @returns {object[]}
 */
export const getAllSimpleMeleeWeaponsAsync = async function() {
    const url = `${baseUrl}/api/equipment-categories/simple-melee-weapons`;
    const json = await getApiDataAsync(url);
    return json.equipment;
}

/**
 * Get all simple melee weapon names in the SRD.
 * @returns {string[]}
 */
export const getAllSimpleMeleeWeaponNamesAsync = async function() {
    const url = `${baseUrl}/api/equipment-categories/simple-melee-weapons`;
    const json = await getApiDataAsync(url);
    return json.equipment.map(result => result.name);
}

/**
 * Get all martial melee weapons in the SRD.
 * @returns {object[]}
 */
export const getAllMartialMeleeWeaponsAsync = async function() {
    const url = `${baseUrl}/api/equipment-categories/martial-melee-weapons`;
    const json = await getApiDataAsync(url);
    return json.equipment;
}

/**
 * Get all martial melee weapon names in the SRD.
 * @returns {string[]}
 */
export const getAllMartialMeleeWeaponNamesAsync = async function() {
    const url = `${baseUrl}/api/equipment-categories/martial-melee-weapons`;
    const json = await getApiDataAsync(url);
    return json.equipment.map(result => result.name);
}

/**
 * Get all simple ranged weapons in the SRD.
 * @returns {object[]}
 */
export const getAllSimpleRangedWeaponsAsync = async function() {
    const url = `${baseUrl}/api/equipment-categories/simple-ranged-weapons`;
    const json = await getApiDataAsync(url);
    return json.equipment;
}

/**
 * Get all simple ranged weapon names in the SRD.
 * @returns {string[]}
 */
export const getAllSimpleRangedWeaponNamesAsync = async function() {
    const url = `${baseUrl}/api/equipment-categories/simple-ranged-weapons`;
    const json = await getApiDataAsync(url);
    return json.equipment.map(result => result.name);
}

/**
 * Get all martial ranged weapons in the SRD.
 * @returns {object[]}
 */
export const getAllMartialRangedWeaponsAsync = async function() {
    const url = `${baseUrl}/api/equipment-categories/martial-ranged-weapons`;
    const json = await getApiDataAsync(url);
    return json.equipment;
}

/**
 * Get all martial ranged weapon names in the SRD.
 * @returns {string[]}
 */
export const getAllMartialRangedWeaponNamesAsync = async function() {
    const url = `${baseUrl}/api/equipment-categories/martial-ranged-weapons`;
    const json = await getApiDataAsync(url);
    return json.equipment.map(result => result.name);
}

/**
 * Get all light armor names in the SRD.
 * @returns {string[]}
 */
export const getAllLightArmorNamesAsync = async function() {
    const url = `${baseUrl}/api/equipment-categories/light-armor`;
    const json = await getApiDataAsync(url);
    return json.equipment.map(result => result.name);
}

/**
 * Get all medium armor names in the SRD.
 * @returns {string[]}
 */
export const getAllMediumArmorNamesAsync = async function() {
    const url = `${baseUrl}/api/equipment-categories/medium-armor`;
    const json = await getApiDataAsync(url);
    return json.equipment.map(result => result.name);
}

/**
 * Get all heavy armor names in the SRD.
 * @returns {string[]}
 */
export const getAllHeavyArmorNamesAsync = async function() {
    const url = `${baseUrl}/api/equipment-categories/heavy-armor`;
    const json = await getApiDataAsync(url);
    return json.equipment.map(result => result.name);
}

/**
 * Get all shield names in the SRD.
 * @returns {string[]}
 */
export const getAllShieldNamesAsync = async function() {
    const url = `${baseUrl}/api/equipment-categories/shields`;
    const json = await getApiDataAsync(url);
    return json.equipment.map(result => result.name);
}

/**
 * Get a single equipment object from the SRD.
 * @param {string} equipmentIndex Name as specified as index in the API.
 * @returns {object} Full JSON object of the equipment piece.
 */
export const getEquipmentObjectAsync = async function(equipmentIndex) {
    const url = `${baseUrl}/api/equipment/${equipmentIndex}`;
    const json = await getApiDataAsync(url);
    return json;
}

/**
 * Perform an API call and get data from https://www.dnd5eapi.co.
 * @param {string} url 
 * @returns {json}
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