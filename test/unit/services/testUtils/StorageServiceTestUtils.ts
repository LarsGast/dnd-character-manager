import { IStorageService } from '../../../../src/interfaces/IStorageService';

export const getMockStorageService = (
	partial?: Partial<IStorageService>,
): IStorageService => {
	return {
		get: partial?.get ?? (() => undefined),
		set: partial?.set ?? (() => {}),
		delete: partial?.delete ?? (() => {}),
		getAllKeys: partial?.getAllKeys ?? (() => []),
	};
};
