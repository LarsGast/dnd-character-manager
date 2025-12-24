import { IResourceTypeRecordTranscriber } from '../interfaces/IResourceTypeRecordTranscriber';
import { ResourceTypeRecord } from '../types/storage/helpers/ResourceTypeRecord';

export class ResourceTypeRecordTranscriber
	implements IResourceTypeRecordTranscriber
{
	/**
	 * @inheritdoc
	 */
	public transcribeToString(resourceType: ResourceTypeRecord): string {
		switch (resourceType) {
			case ResourceTypeRecord.Race:
				return 'Race';
			case ResourceTypeRecord.Subclass:
				return 'Subclass';
		}
	}

	/**
	 * @inheritdoc
	 */
	public transcribeFromString(resourceTypeString: string): ResourceTypeRecord {
		resourceTypeString = resourceTypeString.toLowerCase();
		switch (resourceTypeString) {
			case 'race':
				return ResourceTypeRecord.Race;
			case 'subclass':
				return ResourceTypeRecord.Subclass;
			default:
				throw new Error(`Unknown resource type string: ${resourceTypeString}`);
		}
	}
}
