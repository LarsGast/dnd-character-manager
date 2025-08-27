import { Language } from "../../../../../types/api/resources/Language.js";
import { Proficiency } from "../../../../../types/api/resources/Proficiency.js";
import { Trait } from "../../../../../types/api/resources/Trait.js";
import { getTextareaSection } from "../../services/FormElementsBuilder.js";
import { HomebrewBaseForm } from "../forms/HomebrewBaseForm.js";
import { ChoiceSection } from "../sections/ChoiceSection.js";
import { LinkedObjectsSection } from "../sections/LinkedObjectsSection.js";

/**
 * Form for editing custom homebrew Trait objects.
 */
export class TraitForm extends HomebrewBaseForm {

    /**
     * Creates an instance of TraitForm.
     * @param {Trait} traitObject
     */
    constructor(traitObject) {
        super(traitObject);
        
        /** @type {Trait} */
        this.trait = traitObject;
    }

    /**
     * Initializes the form by appending the form body.
     * This method is called when the element is connected to the DOM.
     * @returns {Promise<void>}
     */
    async connectedCallback() {
        this.appendChild(await this.getFormBody());

        super.connectedCallback();
    }

    /**
     * Creates the body of the form with all necessary sections.
     * @returns {Promise<DocumentFragment>} A fragment containing all the sections of the form.
     */
    async getFormBody() {
        const fragment = document.createDocumentFragment();

        this.descriptionSection = getTextareaSection("Description", 'desc', this.trait.desc, "Description of the trait.", true)
        fragment.appendChild(this.descriptionSection);

        this.proficienciesSection = new LinkedObjectsSection(
            "Proficiencies",
            (await Proficiency.getAllAsync()),
            this.trait.proficiencies,
            "List of proficiencies that this trait provides."
        );
        fragment.appendChild(this.proficienciesSection);

        this.proficiencyChoicesSection = new ChoiceSection(
            "Proficiency choices",
            (await Proficiency.getAllAsync()),
            this.trait.proficiency_choices,
            "If applicable, a choice in proficiencies that the player can make when getting this trait."
        );
        fragment.appendChild(this.proficiencyChoicesSection);

        this.languageOptionsSection = new ChoiceSection(
            "Language options",
            (await Language.getAllAsync()),
            this.trait.language_options,
            "If applicable, a choice in languages that the player can make when getting this trait."
        );
        fragment.appendChild(this.languageOptionsSection);

        return fragment;
    }

    /**
     * @override Trait specific properties.
     */
    async getFormDataAsync() {
    
        const data = new Trait(await super.getFormDataAsync());

        data.desc = this.descriptionSection.getElementsByTagName('textarea')[0].value.split('\n').map(p => p.trim()).filter(p => p.length > 0);
        data.proficiencies = this.proficienciesSection.getValue();
        data.proficiency_choices = this.proficiencyChoicesSection.getValue();
        data.language_options = this.languageOptionsSection.getValue();

        return data;
    }
}

customElements.define('trait-form', TraitForm, { extends: 'form' });