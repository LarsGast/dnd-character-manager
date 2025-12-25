import { RaceRecord } from '../types/storage/resources/RaceRecord';
import { SubclassRecord } from '../types/storage/resources/SubclassRecord';
import { ResourceTypeRecord } from '../types/storage/helpers/ResourceTypeRecord';
import {
	BaseResourceRecord,
	HOMEBREW_RESOURCE_RECORD_VERSION,
} from '../types/storage/wrappers/BaseResourceRecord';

/**
 * Creates a new homebrew resource record with all required default values initialized.
 * This ensures that resource-specific properties are properly set to prevent mapper errors.
 * @param resourceType The type of resource to create
 * @returns A complete resource record with all properties initialized to sensible defaults
 */
export function createDefaultHomebrewRecord(
	resourceType: ResourceTypeRecord,
): BaseResourceRecord {
	const baseRecord: BaseResourceRecord = {
		version: HOMEBREW_RESOURCE_RECORD_VERSION,
		id: globalThis.crypto.randomUUID(),
		name: 'New Custom Object',
		resourceType,
	};

	switch (resourceType) {
		case ResourceTypeRecord.Race:
			return {
				...baseRecord,
				speed: 30,
				ability_bonuses: [],
				age: '',
				alignment: '',
				size: 'Medium',
				size_description: '',
				languages: [],
				language_desc: '',
				traits: [],
			} as RaceRecord;

		case ResourceTypeRecord.Subclass:
			return {
				...baseRecord,
				class: { id: '', name: '' },
				desc: [],
				spells: [],
				features: [],
			} as SubclassRecord;

		default:
			// For any unhandled resource types, return the base record
			// This maintains backward compatibility if new types are added
			return baseRecord;
	}
}
