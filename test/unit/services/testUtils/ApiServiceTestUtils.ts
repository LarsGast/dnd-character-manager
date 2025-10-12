import { IApiService } from '../../../../src/interfaces/IApiService';

export function getMockApiService(partial?: Partial<IApiService>): IApiService {
	return {
		callEndpointAsync:
			partial?.callEndpointAsync ?? (() => Promise.resolve({} as any)),
	};
}
