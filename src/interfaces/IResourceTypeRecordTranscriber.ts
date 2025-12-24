import { ResourceTypeRecord } from '../types/storage/helpers/ResourceTypeRecord';

/**
 * Interface for transcribing ResourceTypeRecord to and from string representations.
 */
export interface IResourceTypeRecordTranscriber {
	/**
	 * Transcribes a ResourceTypeRecord enum value to its human-readable string representation.
	 * Used for display purposes.
	 * @param resourceType The ResourceTypeRecord enum value.
	 * @returns The human-readable string representation of the resource type.
	 */
	transcribeToHumanReadableString(resourceType: ResourceTypeRecord): string;
}
