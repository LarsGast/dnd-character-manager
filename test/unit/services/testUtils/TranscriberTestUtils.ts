import { IResourceTypeApiDtoTranscriber } from '../../../../src/interfaces/IResourceTypeApiDtoTranscriber';

export function getMockResourceTypeApiDtoTranscriber(
	partial?: Partial<IResourceTypeApiDtoTranscriber>,
): IResourceTypeApiDtoTranscriber {
	return {
		transcribeToApiPath:
			partial?.transcribeToApiPath ??
			((resourceType) => resourceType.toString().toLowerCase()),
	};
}
