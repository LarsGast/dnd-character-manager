import { vi } from 'vitest';
import { IMapper } from '../../../../../src/interfaces/IMapper';
import { ResourceReferenceApiDto } from '../../../../../src/types/api/helpers/ResourceReferenceApiDto';
import { ResourceReference } from '../../../../../src/types/domain/helpers/ResourceReference';

export function getMockResourceReferenceApiToDomainMapper(
	partial?: Partial<IMapper<ResourceReferenceApiDto, ResourceReference>>,
) {
	return {
		map: partial?.map ?? vi.fn(),
	};
}
