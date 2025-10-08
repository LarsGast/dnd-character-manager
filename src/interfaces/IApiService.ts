/**
 * Interface for a service that interacts with an external API.
 */
export interface IApiService {
	/**
	 * Calls the specified endpoint and returns the response JSON data as the specified type.
	 * @param url The full endpoint url to fetch data from.
	 * @returns The data from the API as the specified type.
	 */
	callEndpointAsync<T>(url: URL): Promise<T>;
}
