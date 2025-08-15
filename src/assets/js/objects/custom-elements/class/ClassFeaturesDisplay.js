import { getElementWithTextContent } from "../../../util.js";
import { Choice } from "../../api/helpers/Choice.js";
import { Feature } from "../../api/helpers/Feature.js";
import { Class } from "../../api/resources/Class.js";
import { Subclass } from "../../api/resources/Subclass.js";

/**
 * Custom details element that displays the features of the selected class.
 * Extends HTMLDetailsElement.
 *
 * This element updates its display whenever the active PC's class information changes.
 * It shows sections for key class features, including hit die, proficiencies, starting equipment, and features available at each level.
 */
export class ClassFeaturesDisplay extends HTMLDetailsElement {

    constructor(classLevelInfo) {
        super();

        this.classLevelInfo = classLevelInfo;
    }

    /**
     * Called when the element is connected to the DOM.
     * Immediately updates the display.
     */
    async connectedCallback() {
        this.class = await Class.getAsync(this.classLevelInfo.index);
        if (this.classLevelInfo.subclass && this.classLevelInfo.subclass != "null") {
            this.subclass = await Subclass.getAsync(this.classLevelInfo.subclass);
        }

        await this.updateClassFeaturesDisplay();
    }

    /**
     * Asynchronously updates the display with the current class's features.
     */
    async updateClassFeaturesDisplay() {

        // Append the section heading (includes class name and level).
        this.appendChild(this.getSectionHeading());

        // Display the hit die information.
        this.appendChild(getElementWithTextContent("h4", "Hit Die"));
        this.appendChild(getElementWithTextContent("p", `d${this.class.hit_die}`));

        // Display the proficiencies section.
        this.appendChild(getElementWithTextContent("h4", "Proficiencies"));
        this.appendChild(this.getProficienciesSection());
        
        // Display starting equipment.
        this.appendChild(getElementWithTextContent("h4", "Starting Equipment"));
        this.appendChild(this.getStartingEquipmentSection());
        
        // Display the subclass.
        if (this.subclass) {
            this.appendChild(this.getSubclassSection());
        }
        
        // Display level-specific features.
        this.appendChild(await this.getLevelsSection());
    }

    /**
     * Constructs and returns the section heading element.
     * The heading includes the class name and character level.
     * @returns {HTMLElement} A summary element containing an h3 heading.
     */
    getSectionHeading() {
        const summary = document.createElement('summary');

        let summaryTitle = `${this.class.name} ${this.classLevelInfo.level}`;
        if (this.subclass) {
            summaryTitle += ` (${this.subclass.name})`;
        }

        summary.appendChild(getElementWithTextContent("h3", summaryTitle));

        return summary;
    }

    /**
     * Creates and returns an unordered list element that displays the class proficiencies.
     * It includes both proficiency choices and fixed proficiencies.
     * @returns {HTMLUListElement} The list with proficiency items.
     */
    getProficienciesSection() {
        const ul = document.createElement('ul');

        // For each proficiency choice, add a list item with its description.
        for (const choiceObject of this.class.proficiency_choices) {
            ul.appendChild(getElementWithTextContent("li", choiceObject.desc));
        }

        // Then add each fixed proficiency.
        for (const obj of this.class.proficiencies) {
            ul.appendChild(getElementWithTextContent("li", obj.name));
        }

        return ul;
    }

    /**
     * Creates and returns an unordered list element that displays the starting equipment.
     * It lists both choices for equipment and fixed starting equipment.
     * @returns {HTMLUListElement} The list with starting equipment.
     */
    getStartingEquipmentSection() {
        const ul = document.createElement('ul');

        // List each equipment option description.
        for (const choiceObject of this.class.starting_equipment_options) {
            ul.appendChild(getElementWithTextContent("li", choiceObject.desc));
        }

        // List each fixed starting equipment with quantity.
        for (const startingEquipment of this.class.starting_equipment) {
            ul.appendChild(getElementWithTextContent("li", `${startingEquipment.quantity}x ${startingEquipment.equipment.name}`));
        }

        return ul;
    }

    /**
     * Creates and returns a fragment that includes the chosen subclass description
     * @returns {DocumentFragment} A fragment with subclass description.
     */
    getSubclassSection() {

        const fragment = document.createDocumentFragment();

        fragment.appendChild(getElementWithTextContent("h4", `${this.subclass.subclass_flavor}: ${this.subclass.name}`));

        for (const paragraph of this.subclass.desc) {
            fragment.appendChild(getElementWithTextContent("p", paragraph));
        }

        return fragment;
    }

    /**
     * Creates and returns a fragment that includes level details from level 1 to the current level.
     * @returns {Promise<DocumentFragment>} A fragment with level features.
     */
    async getLevelsSection() {
        const fragment = document.createDocumentFragment();

        fragment.appendChild(getElementWithTextContent("h4", "Levels"));

        // For each level up to the current level, add its features.
        for (let levelNumber = 1; levelNumber <= this.classLevelInfo.level; levelNumber++) {
            fragment.appendChild(await this.getLevelSection(levelNumber));
        }

        return fragment;
    }

    /**
     * Asynchronously retrieves and constructs the display section for a given level.
     * @param {number} levelNumber The level number to create the section for.
     * @returns {Promise<DocumentFragment>} A fragment detailing features for that level.
     */
    async getLevelSection(levelNumber) {

        const fragment = document.createDocumentFragment();
        fragment.appendChild(getElementWithTextContent("h5", `Level ${levelNumber}`));
        
        // Fetch level-specific data for this class.
        const levelObject = await this.class.getLevelAsync(levelNumber);

        // For each feature at this level, add the feature section.
        for (const feature of await levelObject.getAllFeaturesAsync()) {
            fragment.appendChild(await this.getFeatureSection(feature));
        }

        // If a subclass is chosen, display the features the subclass gets for the given level.
        if (this.subclass) {
            const subclassFeatures = await this.subclass.getFeaturesForLevelAsync(levelNumber);
            for (const feature of subclassFeatures) {
                fragment.appendChild(await this.getFeatureSection(feature, this.subclass));
            }
        }

        return fragment;
    }

    /**
     * Asynchronously constructs and returns a fragment for a given feature.
     * The section includes the feature's name, description, and any subfeature options.
     * @param {Feature} feature The feature object.
     * @param {Subclass} subclass Optional subclass object.
     * @returns {Promise<DocumentFragment>} A fragment describing the feature.
     */
    async getFeatureSection(feature, subclass) {
        const fragment = document.createDocumentFragment();

        // Add feature name as a header.
        // If it's a subclass feature, add the name of the subclass to signify this.
        let title = '';
        if (subclass) {
            title = `${subclass.name}: `;
        }
        title += feature.name;
        fragment.appendChild(getElementWithTextContent("h6", title));

        // Add each paragraph in the feature description.
        for (const paragraph of feature.desc) {
            fragment.appendChild(getElementWithTextContent("p", paragraph));
        }

        // If there are feature-specific details (like subfeature options), add them.
        if (feature.feature_specific && feature.feature_specific.subfeature_options) {
            fragment.appendChild(await this.getChoiceSection(feature.feature_specific.subfeature_options));
        }

        return fragment;
    }

    /**
     * Asynchronously constructs a section for a choice.
     * It retrieves each subfeature from the choice options and displays its name and description.
     * @param {Choice} choice The choice object from feature_specific.
     * @returns {Promise<HTMLUListElement>} A ul containing the choice details.
     */
    async getChoiceSection(choice) {
        const ul = document.createElement("ul");

        // For each option provided by the choice, fetch the subfeature and display it.
        for (const option of choice.from.options) {
            const subfeature = await Feature.getAsync(option.item.index);
            
            const li = getElementWithTextContent("li", `${subfeature.name}. `);
            
            for (const paragraph of subfeature.desc) {
                li.textContent += paragraph;
            }

            ul.appendChild(li);
        }

        return ul;
    }
}

customElements.define('class-features-display', ClassFeaturesDisplay, { extends: 'details' });