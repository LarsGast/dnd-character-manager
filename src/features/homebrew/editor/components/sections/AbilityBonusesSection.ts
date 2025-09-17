import { AbilityBonus } from "../../../../../types/api/helpers/AbilityBonus.js";
import { AbilityScore } from "../../../../../types/api/resources/AbilityScore.js";
import { ApiBaseObject } from "../../../../../types/api/resources/ApiBaseObject.js";
import { ApiObjectInfo } from "../../../../../types/api/wrappers/ApiObjectInfo.js";
import { getNumberInputWithLabel, getTooltipSpan } from "../../services/FormElementsBuilder.js";

/**
 * Custom section element for displaying and editing ability bonuses.
 * This element allows users to add, remove, and modify ability bonuses for homebrew objects.
 */
export class AbilityBonusesSection extends HTMLElement {

    /**
     * Default order of ability scores.
     */
    abilityScoreOrder: string[] = ["str", "dex", "con", "int", "wis", "cha"];
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
        const abilityScores = await AbilityScore.getAllAsync();

        const sortedAbilityScores = abilityScores.srdObjects.sort((a, b) => {
            const posA = this.abilityScoreOrder.indexOf(a.index);
            const posB = this.abilityScoreOrder.indexOf(b.index);
            return posA - posB;
        });

        for (const abilityScore of sortedAbilityScores) {
            const abilityBonus = this.abilityBonuses.find(bonus => bonus.ability_score.index === abilityScore.index);

            const inputWithLabel = getNumberInputWithLabel(abilityScore.name, abilityScore.index, abilityBonus?.bonus ?? 0, true);
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

        label.textContent = "Ability bonuses";

        label.appendChild(getTooltipSpan(tooltip));

        return label;
    }

    /**
     * Retrieves the values of all ability bonuses from the section.
     * @returns Array of AbilityBonus objects representing the selected values.
     */
    async getValueAsync(): Promise<AbilityBonus[]> {
        const inputs = this.querySelectorAll('input[type="number"]') as NodeListOf<HTMLInputElement>;
        const abilityBonuses = [];

        for (const input of inputs) {
            const abilityScoreIndex = input.name;
            const bonusValue = parseInt(input.value, 10);

            // Only save non-zero bonuses, as this is also done like this in the SRD API.
            if (isNaN(bonusValue) || bonusValue === 0) {
                continue;
            }

            const abilityScore = new ApiObjectInfo(await ApiBaseObject.getAsync(abilityScoreIndex, AbilityScore));

            const abilityBonus = new AbilityBonus();
            abilityBonus.ability_score = abilityScore;
            abilityBonus.bonus = bonusValue;

            abilityBonuses.push(abilityBonus);
        }

        return abilityBonuses;
    }
}

customElements.define('ability-bonuses-section', AbilityBonusesSection);