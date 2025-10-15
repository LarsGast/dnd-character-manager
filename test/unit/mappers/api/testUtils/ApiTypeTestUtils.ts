import { randomUUID } from 'crypto';
import { AbilityBonusApiDto } from '../../../../../src/types/api/helpers/AbilityBonusApiDto';
import { ResourceReferenceApiDto } from '../../../../../src/types/api/helpers/ResourceReferenceApiDto';

export function getMockResourceReferenceApiDto(
	partial?: Partial<ResourceReferenceApiDto>,
): ResourceReferenceApiDto {
	return {
		index: partial?.index ?? randomUUID(),
		name: partial?.name ?? 'Some Name',
		url: partial?.url ?? '/api/some-endpoint/some-index',
	};
}

export function getMockAbilityBonusApiDto(
	partial?: Partial<AbilityBonusApiDto>,
): AbilityBonusApiDto {
	return {
		ability_score: partial?.ability_score ?? getMockResourceReferenceApiDto(),
		bonus: partial?.bonus ?? 0,
	};
}
