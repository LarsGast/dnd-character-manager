import { AbilityBonus } from '../../../../../types/domain/helpers/AbilityBonus';
import { BaseResource } from '../../../../../types/domain/wrappers/BaseResource';
import { AbilityBonusRecord } from '../../../../../types/storage/helpers/AbilityBonusRecord';
import { abilityScoreRepository } from '../../../../../wiring/dependencies';
import {
	getNumberInputWithLabel,
	getTooltipSpan,
} from '../../services/FormElementsBuilder';

/**
 * Custom section element for displaying and editing ability bonuses.
 * This element allows users to add, remove, and modify ability bonuses for homebrew objects.
 */
export class AbilityBonusesSection extends HTMLElement {
	/**
	 * Default order of ability scores.
	 */
	abilityScoreOrder: string[] = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
	abilityBonuses: AbilityBonus[];

	/**
	 * Creates an instance of AbilityBonusesSection.
	 * @param abilityBonuses Initial ability bonuses to display.
	 * @param tooltip Tooltip text for the section.
	 */
	constructor(abilityBonuses: AbilityBonus[], tooltip: string) {
		super();

		this.abilityBonuses = abilityBonuses;

		this.appendChild(this.getSectionLabel(tooltip));
	}

	async connectedCallback(): Promise<void> {
		const abilityScores = await abilityScoreRepository.getAllAsync();

		const sortedAbilityScores = abilityScores.results.sort((a, b) => {
			const posA = this.abilityScoreOrder.indexOf(a.index);
			const posB = this.abilityScoreOrder.indexOf(b.index);
			return posA - posB;
		});

		for (const abilityScore of sortedAbilityScores) {
			const abilityBonus = this.abilityBonuses.find(
				(bonus) => bonus.ability_score.index === abilityScore.index,
			);

			const inputWithLabel = getNumberInputWithLabel(
				abilityScore.name,
				abilityScore.index,
				abilityBonus?.bonus ?? 0,
				true,
			);
			this.appendChild(inputWithLabel);
		}
	}

	/**
	 * Creates and returns the section label with tooltip.
	 * @param tooltip Tooltip text for the section.
	 * @returns Label element for the section.
	 */
	getSectionLabel(tooltip: string): HTMLLabelElement {
		const label = document.createElement('label');

		label.textContent = 'Ability bonuses';

		label.appendChild(getTooltipSpan(tooltip));

		return label;
	}

	/**
	 * Retrieves the values of all ability bonuses from the section.
	 * @returns Array of AbilityBonus objects representing the selected values.
	 */
	async getValueAsync(): Promise<AbilityBonusRecord[]> {
		const inputs = this.querySelectorAll(
			'input[type="number"]',
		) as NodeListOf<HTMLInputElement>;
		const abilityBonuses = [];

		for (const input of inputs) {
			const abilityScoreIndex = input.name;
			const bonusValue = parseInt(input.value, 10);

			// Only save non-zero bonuses, as this is also done like this in the SRD API.
			if (isNaN(bonusValue) || bonusValue === 0) {
				continue;
			}

			const abilityScore = (await abilityScoreRepository.getAsync(
				abilityScoreIndex,
			)) as BaseResource;

			const abilityBonus: AbilityBonusRecord = {
				ability_score: {
					id: abilityScore.index,
					name: abilityScore.name,
				},
				bonus: bonusValue,
			};

			abilityBonuses.push(abilityBonus);
		}

		return abilityBonuses;
	}
}

customElements.define('ability-bonuses-section', AbilityBonusesSection);
