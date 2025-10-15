import { vi } from 'vitest';
import { IMapper } from '../../../../../src/interfaces/IMapper';

export function getMockMapper(partial?: Partial<IMapper<any, any>>) {
	return {
		map: partial?.map ?? vi.fn(),
	};
}
