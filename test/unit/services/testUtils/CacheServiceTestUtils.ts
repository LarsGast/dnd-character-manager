import { ICacheService } from '../../../../src/interfaces/ICacheService';

export function getMockCacheService(
	partial?: Partial<ICacheService>,
): ICacheService {
	return {
		get: partial?.get ?? (() => undefined),
		set: partial?.set ?? (() => {}),
		delete: partial?.delete ?? (() => {}),
	};
}
