import { ApiObjectInfo } from "../resources/ApiObjectInfo.js";

/**
 * Has information about the bonuses to abilities a race can have.
 */
export class AbilityBonus {

    /**
     * Ability score that the bonus gets applied to.
     */
    ability_score: ApiObjectInfo;

    /**
     * The height of the bonus.
     */
    bonus: number;

    constructor(data: Partial<AbilityBonus> = {}) {
        this.ability_score = new ApiObjectInfo(data.ability_score ?? {});
        this.bonus = data.bonus ?? 0;
    }
}