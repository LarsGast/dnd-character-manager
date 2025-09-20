import { BaseResourceApiDto } from "../types/api/wrappers/BaseResourceApiDto";
import { ResourceListApiDto } from "../types/api/wrappers/ResourceListApiDto";

/**
 * Interface for the SRD API service.
 */
export interface ISrdApiService {

    /**
     * Fetch a resource from the SRD API by its full URL.
     * @param url The full URL to the resource.
     * @return The resource object.
     */
    getByUrlAsync<T>(url: URL): Promise<T>;

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
    getByIndexAsync<T extends BaseResourceApiDto>(resource: string, index: string): Promise<T>;
}