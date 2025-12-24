import { IResourceTypeRecordTranscriber } from '../interfaces/IResourceTypeRecordTranscriber';
import { ResourceTypeRecord } from '../types/storage/helpers/ResourceTypeRecord';

export class ResourceTypeRecordTranscriber
	implements IResourceTypeRecordTranscriber
{
	/**
	 * @inheritdoc
	 */
	public transcribeToHumanReadableString(
		resourceType: ResourceTypeRecord,
	): string {
		switch (resourceType) {
			case ResourceTypeRecord.Race:
				return 'Race';
			case ResourceTypeRecord.Subclass:
				return 'Subclass';
		}
	}
}
