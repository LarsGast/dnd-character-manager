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