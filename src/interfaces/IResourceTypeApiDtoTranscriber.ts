import { ResourceTypeApiDto } from '../types/api/helpers/ResourceTypeApiDto';

/**
 * Interface for transcribing ResourceTypeApiDto to API paths.
 */
export interface IResourceTypeApiDtoTranscriber {
	/**
	 * Transcribes a ResourceTypeApiDto enum value to its corresponding API path.
	 * @param resourceType The ResourceTypeApiDto enum value.
	 * @returns The API path string corresponding to the resource type.
	 */
	transcribeToApiPath(resourceType: ResourceTypeApiDto): string;
}
