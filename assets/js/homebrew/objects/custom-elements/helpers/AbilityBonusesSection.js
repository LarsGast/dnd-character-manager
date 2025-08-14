import { AbilityBonus } from "../../../../objects/api/helpers/AbilityBonus.js";
import { AbilityScore } from "../../../../objects/api/resources/AbilityScore.js";
import { ApiObjectInfo } from "../../../../objects/api/resources/ApiObjectInfo.js";
import { getNumberInputWithLabel, getTooltipSpan } from "../FormElementsBuilder.js";

/**
 * Custom section element for displaying and editing ability bonuses.
 * This element allows users to add, remove, and modify ability bonuses for homebrew objects.
 */
export class AbilityBonusesSection extends HTMLElement {

    /**
     * Default order of ability scores.
     * @type {string[]}
     */
    abilityScoreOrder = ["str", "dex", "con", "int", "wis", "cha"];

    /**
     * Creates an instance of AbilityBonusesSection.
     * @param {AbilityBonus[]} abilityBonuses Initial ability bonuses to display.
     * @param {string} tooltip Tooltip text for the section.
     */
    constructor(abilityBonuses, tooltip) {
        super();

        /** @type {AbilityBonus[]} */
        this.abilityBonuses = abilityBonuses;

        this.appendChild(this.getSectionLabel(tooltip));
    }

    async connectedCallback() {
        const abilityScores = await AbilityScore.getAllAsync();

        const sortedAbilityScores = abilityScores.srdObjects.sort((a, b) => {
            const posA = this.abilityScoreOrder.indexOf(a.index);
            const posB = this.abilityScoreOrder.indexOf(b.index);
            return posA - posB;
        });

        for (const abilityScore of sortedAbilityScores) {
            const abilityBonus = this.abilityBonuses.find(bonus => bonus.ability_score.index === abilityScore.index);

            const inputWithLabel = getNumberInputWithLabel(abilityScore.name, abilityScore.index, abilityBonus?.bonus ?? 0, null, true);
            this.appendChild(inputWithLabel);
        }
    }

    /**
     * Creates and returns the section label with tooltip.
     * @param {string} tooltip Tooltip text for the section.
     * @returns {HTMLLabelElement} Label element for the section.
     */
    getSectionLabel(tooltip) {
        const label = document.createElement('label');

        label.textContent = "Ability bonuses";

        label.appendChild(getTooltipSpan(tooltip));

        return label;
    }

    /**
     * Retrieves the values of all ability bonuses from the section.
     * @returns {Promise<AbilityBonus[]>} Array of AbilityBonus objects representing the selected values.
     */
    async getValueAsync() {
        const inputs = this.querySelectorAll('input[type="number"]');
        const abilityBonuses = [];

        for (const input of inputs) {
            const abilityScoreIndex = input.name;
            const bonusValue = parseInt(input.value, 10);

            // Only save non-zero bonuses, as this is also done like this in the SRD API.
            if (isNaN(bonusValue) || bonusValue === 0) {
                continue;
            }

            const abilityScore = new ApiObjectInfo(await AbilityScore.getAsync(abilityScoreIndex));
        
            // Remove unwanted keys
            const emptyApiObjectInfo = new ApiObjectInfo();
            for (const key in abilityScore) {
                if (!emptyApiObjectInfo.hasOwnProperty(key)) {
                    delete abilityScore[key];
                }
            }

            const abilityBonus = new AbilityBonus();
            abilityBonus.ability_score = abilityScore;
            abilityBonus.bonus = bonusValue;

            abilityBonuses.push(abilityBonus);
        }

        return abilityBonuses;
    }
}

customElements.define('ability-bonuses-section', AbilityBonusesSection);