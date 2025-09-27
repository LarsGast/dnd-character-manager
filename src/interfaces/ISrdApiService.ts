import { BaseResourceApiDto } from '../types/api/wrappers/BaseResourceApiDto.js';
import { ResourceListApiDto } from '../types/api/wrappers/ResourceListApiDto.js';

/**
 * Interface for the SRD API service.
 */
export interface ISrdApiService {
	/**
	 * Fetch a resource from the SRD API by its endpoint.
	 * @param endpoint The endpoint to the resource without the baseURL.
	 * @return The resource object.
	 */
	getByEndpointAsync<T>(endpoint: string): Promise<T>;

	/**
	 * Fetch a list of resources of a given type.
	 * @param resource The resource type (e.g., "spells", "monsters").
	 * @return A ResourceList containing the resources of the specified type.
	 */
	getResourceListAsync(resource: string): Promise<ResourceListApiDto>;

	/**
	 * Fetch a specific resource by its type and index.
	 * @param resource The resource type (e.g., "spells", "monsters").
	 * @param index The index identifier of the specific resource.
	 * @return The resource object.
	 */
	getByIndexAsync<T extends BaseResourceApiDto>(
		resource: string,
		index: string,
	): Promise<T>;
}
