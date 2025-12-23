import { ResourceTypeApiDto } from '../types/api/helpers/ResourceTypeApiDto';
import { BaseResourceApiDto } from '../types/api/wrappers/BaseResourceApiDto';
import { ResourceListApiDto } from '../types/api/wrappers/ResourceListApiDto';

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
	 * @param resourceType The resource type (e.g., spells, monsters).
	 * @return A ResourceList containing the resources of the specified type.
	 */
	getResourceListAsync(
		resourceType: ResourceTypeApiDto,
	): Promise<ResourceListApiDto>;

	/**
	 * Fetch a specific resource by its type and index.
	 * @param resourceType The resource type (e.g., spells, monsters).
	 * @param index The index identifier of the specific resource.
	 * @return The resource object.
	 */
	getByIndexAsync<T extends BaseResourceApiDto>(
		resourceType: ResourceTypeApiDto,
		index: string,
	): Promise<T>;
}
