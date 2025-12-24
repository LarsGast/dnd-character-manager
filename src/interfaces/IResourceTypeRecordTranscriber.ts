import { ResourceTypeRecord } from '../types/storage/helpers/ResourceTypeRecord';

/**
 * Interface for transcribing ResourceTypeRecord to and from string representations.
 */
export interface IResourceTypeRecordTranscriber {
	/**
	 * Transcribes a ResourceTypeRecord enum value to its string representation.
	 * @param resourceType The ResourceTypeRecord enum value.
	 * @returns The human-readable string representation of the resource type.
	 */
	transcribeToString(resourceType: ResourceTypeRecord): string;

	/**
	 * Transcribes a string representation of a resource type back to its ResourceTypeRecord enum value.
	 * @param resourceTypeString The human-readable string representation of the resource type.
	 * @returns The corresponding ResourceTypeRecord enum value.
	 */
	transcribeFromString(resourceTypeString: string): ResourceTypeRecord;
}
