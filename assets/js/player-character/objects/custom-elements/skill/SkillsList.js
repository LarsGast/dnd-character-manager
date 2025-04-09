import { Skill } from "../../api/resources/Skill.js";
import { SkillDisplay } from "./SkillDisplay.js";

/**
 * Custom unordered list element that displays all skills.
 * Extends HTMLUListElement.
 *
 * This element fetches all skills asynchronously and then creates a SkillDisplay element for each skill, appending them to the list.
 */
export class SkillsList extends HTMLUListElement {

    constructor() {
        super();

        // Apply styling classes.
        this.classList.add('no-style-list', 'proficiencies-list', 'three-columns-list');
    }

    /**
     * Called when the element is connected to the DOM.
     * Asynchronously populates the list with skills.
     */
    async connectedCallback() {
        const allSkills = await Skill.getAllAsync();
        
        for (const skillInfo of allSkills.results) {
            const skill = await Skill.getAsync(skillInfo.index);
            this.appendChild(new SkillDisplay(skill));
        }
    }
}

customElements.define('skills-list', SkillsList, { extends: 'ul' });