import { randomUUID } from 'crypto';
import { AbilityBonusApiDto } from '../../../../../src/types/api/helpers/AbilityBonusApiDto';
import { ResourceReferenceApiDto } from '../../../../../src/types/api/helpers/ResourceReferenceApiDto';
import { AbilityScoreApiDto } from '../../../../../src/types/api/resources/AbilityScoreApiDto';
import { BaseResourceApiDto } from '../../../../../src/types/api/wrappers/BaseResourceApiDto';

export function getMockResourceReferenceApiDto(
	partial?: Partial<ResourceReferenceApiDto>,
): ResourceReferenceApiDto {
	return {
		index: partial?.index ?? randomUUID(),
		name: partial?.name ?? 'Some Name',
		url: partial?.url ?? '/api/some-endpoint/some-index',
	};
}

export function getMockBaseResourceApiDto(
	partial?: Partial<BaseResourceApiDto>,
): BaseResourceApiDto {
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

export function getMockAbilityScoreApiDto(
	partial?: Partial<AbilityScoreApiDto>,
): AbilityScoreApiDto {
	return {
		...getMockBaseResourceApiDto(partial),
		desc: partial?.desc ?? '',
		full_name: partial?.full_name ?? '',
		skills: partial?.skills ?? [getMockResourceReferenceApiDto()],
	};
}
