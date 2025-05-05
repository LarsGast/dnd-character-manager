import { Race } from "../../api/resources/Race.js";
import { globals } from "../../../load-page.js";

/**
 * Custom details element that displays the features of the selected race.
 * Extends HTMLDetailsElement.
 *
 * This element updates its display whenever the active PC's race changes.
 * It shows sections for ability bonuses, speed, alignment, age, size, languages, and any available traits.
 */
export class RaceFeaturesDisplay extends HTMLDetailsElement {

    constructor() {
        super();
    }
    
    /**
     * Called when the element is connected to the DOM.
     * Immediately updates the display and starts listening for race updates.
     */
    connectedCallback() {

        // Update the display on startup.
        this.updateDisplay();

        // Save a handler to update the display when the race is updated.
        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("raceUpdated", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Cleans up the event listener.
     */
    disconnectedCallback() {
        document.removeEventListener("raceUpdated", this._updateHandler);
    }

    /**
     * Asynchronously updates the display if an update is warranted.
     * @param {CustomEvent} event An optional event that triggers the update.
     */
    async updateDisplay(event) {
        if (this.getShouldUpdate(event)) {
            await this.updateRaceFeaturesDisplay();
        }
    }

    /**
     * Determines if the display should be updated.
     * @param {CustomEvent} event The event that triggered the update.
     * @returns {boolean} True if update should occur.
     */
    getShouldUpdate(event) {
        return !event || (event.type === "raceUpdated");
    }

    /**
     * Creates and returns a level-3 heading element for a given title.
     * @param {string} title The heading title.
     * @returns {HTMLElement} The heading element.
     */
    getHeading(title) {
        const heading = document.createElement('h3');
        heading.textContent = title;
        return heading;
    }

    /**
     * Creates and returns a paragraph element containing the body text.
     * @param {string} body The text content.
     * @returns {HTMLElement} The paragraph element.
     */
    getParagraph(body) {
        const p = document.createElement('p');
        p.textContent = body;
        return p;
    }

    /**
     * Asynchronously updates the display with the race's features.
     * Hides the element if no race is selected.
     */
    async updateRaceFeaturesDisplay() {

        // No race selected - hide the element.
        if (!globals.activePlayerCharacter.race) {
            this.style.display = "none";
            return;
        }
        
        this.style.display = "block";
        this.race = await Race.getAsync(globals.activePlayerCharacter.race);

        // Clear any existing content.
        this.replaceChildren();

        // Create section heading with race name.
        this.appendChild(this.getSectionHeading());

        // Display ability bonuses.
        this.appendChild(this.getHeading("Ability Bonuses"));
        this.appendChild(this.getAbilityBonusBody());

        // Display speed.
        this.appendChild(this.getHeading("Speed"));
        this.appendChild(this.getParagraph(this.race.speed));
        
        // Display alignment.
        this.appendChild(this.getHeading("Alignment"));
        this.appendChild(this.getParagraph(this.race.alignment));
        
        // Display age.
        this.appendChild(this.getHeading("Age"));
        this.appendChild(this.getParagraph(this.race.age));
        
        // Display size.
        this.appendChild(this.getHeading("Size"));
        this.appendChild(this.getParagraph(this.race.size_description));
        
        // Display languages.
        this.appendChild(this.getHeading("Languages"));
        this.appendChild(this.getParagraph(this.race.language_desc));
        
        // Get and display all available traits, if any.
        const traits = await this.race.getAllTraitsAsync();
        if (traits.length > 0) {
            this.appendChild(this.getTraitsSection(traits));
        }
    }

    /**
     * Constructs and returns the section heading element.
     * @returns {HTMLElement} The summary element with an h2 heading.
     */
    getSectionHeading() {
        const summary = document.createElement('summary');

        const heading = document.createElement('h2');

        heading.textContent = `Race features (${this.getRaceName()})`;

        summary.appendChild(heading);

        return summary;
    }

    /**
     * Retrieves the race name.
     * @returns {string} The race name or a fallback prompt.
     */
    getRaceName() {
        return this.race ? this.race.name : "choose race";
    }

    /**
     * Builds and returns an unordered list displaying all ability bonuses.
     * @returns {HTMLElement} The unordered list element.
     */
    getAbilityBonusBody() {
        const ul = document.createElement('ul');

        for (const abilityBonus of this.race.ability_bonuses) {
            const li = document.createElement('li');
            li.textContent = `${abilityBonus.ability_score.name} + ${abilityBonus.bonus}`;
            ul.appendChild(li);
        }

        return ul;
    }

    /**
     * Creates and returns a level-4 heading element for a trait.
     * @param {string} title The trait title.
     * @returns {HTMLElement} The heading element.
     */
    getTraitHeading(title) {
        const heading = document.createElement('h4');
        heading.textContent = title;
        return heading;
    }

    /**
     * Constructs a section element for race traits.
     * @param {Array} traits An array of trait objects.
     * @returns {HTMLElement} The section element containing trait headings and descriptions.
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

customElements.define('race-features-display', RaceFeaturesDisplay, { extends: 'details' });