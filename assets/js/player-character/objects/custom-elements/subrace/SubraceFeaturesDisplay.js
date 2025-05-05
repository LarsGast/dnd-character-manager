import { Race } from "../../api/resources/Race.js";
import { Subrace } from "../../api/resources/Subrace.js";
import { globals } from "../../../load-page.js";

/**
 * Custom details element that displays the features of the selected subrace.
 * Extends HTMLDetailsElement.
 *
 * The element updates its contents based on the selected subrace.
 * It displays sections for the subrace's description, ability bonuses, and any available traits.
 */
export class SubraceFeaturesDisplay extends HTMLDetailsElement {

    constructor() {
        super();
    }
    
    /**
     * Called when the element is connected to the DOM.
     * Updates the display and registers an event listener for subrace updates.
     */
    connectedCallback() {
        this.updateDisplay();

        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("subraceUpdated", this._updateHandler);
    }
    
    /**
     * Called when disconnected from the DOM.
     * Removes the event listener.
     */
    disconnectedCallback() {
        document.removeEventListener("subraceUpdated", this._updateHandler);
    }

    /**
     * Updates the display if the triggering event indicates a change.
     * @param {CustomEvent} event An optional event indicating an update.
     */
    async updateDisplay(event) {
        if (this.getShouldUpdate(event)) {
            await this.updateSubraceFeaturesDisplay();
        }
    }

    /**
     * Determines if the display should update.
     * @param {CustomEvent} event The event to evaluate.
     * @returns {boolean} True if no event exists or the event is "subraceUpdated".
     */
    getShouldUpdate(event) {
        return !event || (event.type === "subraceUpdated");
    }

    /**
     * Creates and returns a level-3 heading element for the given title.
     * @param {string} title The heading title.
     * @returns {HTMLElement} The heading element.
     */
    getHeading(title) {
        const heading = document.createElement('h3');
        heading.textContent = title;
        return heading;
    }

    /**
     * Creates and returns a paragraph element containing the provided text.
     * @param {string} body The paragraph text.
     * @returns {HTMLElement} The paragraph element.
     */
    getParagraph(body) {
        const p = document.createElement('p');
        p.textContent = body;
        return p;
    }

    /**
     * Asynchronously updates the subrace features display.
     * Hides the element if no subrace is selected.
     */
    async updateSubraceFeaturesDisplay() {
        if (!globals.activePlayerCharacter.subrace) {
            this.style.display = "none";
            return;
        }
        
        this.style.display = "block";
        this.subrace = await Subrace.getAsync(globals.activePlayerCharacter.subrace);

        // Clear current contents.
        this.replaceChildren();

        // Add a section heading.
        this.appendChild(this.getSectionHeading());

        // Show subrace description.
        this.appendChild(this.getHeading("Description"));
        this.appendChild(this.getParagraph(this.subrace.desc));

        // Show ability bonuses.
        this.appendChild(this.getHeading("Ability Bonuses"));
        this.appendChild(this.getAbilityBonusBody());
        
        // If traits exist, create a traits section.
        const traits = await this.subrace.getAllTraitsAsync();
        if (traits.length > 0) {
            this.appendChild(this.getTraitsSection(traits));
        }
    }

    /**
     * Constructs and returns the section heading element.
     * @returns {HTMLElement} The summary element containing an h2 heading with the subrace name.
     */
    getSectionHeading() {
        const summary = document.createElement('summary');

        const heading = document.createElement('h2');

        heading.textContent = `Subrace features (${this.getSubraceName()})`;

        summary.appendChild(heading);

        return summary;
    }

    /**
     * Retrieves the subrace name.
     * @returns {string} The subrace name or a prompt if none is selected.
     */
    getSubraceName() {
        return this.subrace ? this.subrace.name : "choose subrace";
    }

    /**
     * Builds an unordered list displaying all ability bonuses for the subrace.
     * @returns {HTMLElement} The unordered list element.
     */
    getAbilityBonusBody() {
        const ul = document.createElement('ul');

        for (const abilityBonus of this.subrace.ability_bonuses) {
            const li = document.createElement('li');
            li.textContent = `${abilityBonus.ability_score.name} + ${abilityBonus.bonus}`;
            ul.appendChild(li);
        }

        return ul;
    }

    /**
     * Creates and returns a level-4 heading element for a trait title.
     * @param {string} title The trait title.
     * @returns {HTMLElement} The heading element.
     */
    getTraitHeading(title) {
        const heading = document.createElement('h4');
        heading.textContent = title;
        return heading;
    }

    /**
     * Constructs a section element that displays all traits for the subrace.
     * @param {Array} traits An array of trait objects.
     * @returns {HTMLElement} The section element with trait headings and paragraphs.
     */
    getTraitsSection(traits) {
        const traitsSection = document.createElement('section');

        traitsSection.appendChild(this.getHeading("Traits"));
        
        for (const trait of traits) {
            traitsSection.appendChild(this.getTraitHeading(trait.name));
            for (const traitDesc of trait.desc) {
                traitsSection.appendChild(this.getParagraph(traitDesc));
            }
        }

        return traitsSection;
    }
}

customElements.define('subrace-features-display', SubraceFeaturesDisplay, { extends: 'details' });