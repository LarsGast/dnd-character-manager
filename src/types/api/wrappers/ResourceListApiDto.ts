import { BaseResourceApiDto } from './BaseResourceApiDto';

export interface ResourceListApiDto {
	/**
	 * Total count of all results.
	 * Equal to results.length.
	 */
	count: number;

	/**
	 * Information about the each resource.
	 * Not the full resource, but includes the index, name, and url to the resource.
	 */
	results: BaseResourceApiDto[];
}
