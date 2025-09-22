import { getTextareaSection } from "../../services/FormElementsBuilder.js";
import { HomebrewBaseForm } from "./HomebrewBaseForm.js";
import { ChoiceSection } from "../sections/ChoiceSection.js";
import { LinkedObjectsSection } from "../sections/LinkedObjectsSection.js";
import { Trait } from "../../../../../types/domain/resources/Trait.js";
import { languageRepository, proficiencyRepository } from "../../../../../wiring/dependencies.js";

/**
 * Form for editing custom homebrew Trait objects.
 */
export class TraitForm extends HomebrewBaseForm {
    trait: Trait;
    descriptionSection?: HTMLElement;
    proficienciesSection?: LinkedObjectsSection;
    proficiencyChoicesSection?: ChoiceSection;
    languageOptionsSection?: ChoiceSection;

    /**
     * Creates an instance of TraitForm.
     * @param traitObject
     */
    constructor(traitObject: Trait) {
        super(traitObject);
        
        this.trait = traitObject;
    }

    /**
     * Initializes the form by appending the form body.
     * This method is called when the element is connected to the DOM.
     * @returns
     */
    override async connectedCallback(): Promise<void> {
        this.appendChild(await this.getFormBody());

        super.connectedCallback();
    }

    /**
     * Creates the body of the form with all necessary sections.
     * @returns A fragment containing all the sections of the form.
     */
    async getFormBody(): Promise<DocumentFragment> {
        const fragment = document.createDocumentFragment();

        this.descriptionSection = getTextareaSection("Description", 'desc', this.trait.desc, true, "Description of the trait.")
        fragment.appendChild(this.descriptionSection);

        this.proficienciesSection = new LinkedObjectsSection(
            "Proficiencies",
            (await proficiencyRepository.getAllAsync()),
            this.trait.proficiencies,
            "List of proficiencies that this trait provides."
        );
        fragment.appendChild(this.proficienciesSection);

        this.proficiencyChoicesSection = new ChoiceSection(
            "Proficiency choices",
            (await proficiencyRepository.getAllAsync()),
            this.trait.proficiency_choices,
            "If applicable, a choice in proficiencies that the player can make when getting this trait."
        );
        fragment.appendChild(this.proficiencyChoicesSection);

        this.languageOptionsSection = new ChoiceSection(
            "Language options",
            (await languageRepository.getAllAsync()),
            this.trait.language_options,
            "If applicable, a choice in languages that the player can make when getting this trait."
        );
        fragment.appendChild(this.languageOptionsSection);

        return fragment;
    }

    /**
     * @override Trait specific properties.
     */
    override async getFormDataAsync(): Promise<Trait> {
    
        const data = (await super.getFormDataAsync()) as Trait;

        data.desc = this.descriptionSection!.getElementsByTagName('textarea')[0].value.split('\n').map((p: string) => p.trim()).filter((p: string | any[]) => p.length > 0);
        data.proficiencies = this.proficienciesSection!.getValue();
        data.proficiency_choices = this.proficiencyChoicesSection!.getValue();
        data.language_options = this.languageOptionsSection!.getValue();

        return data;
    }
}

customElements.define('trait-form', TraitForm, { extends: 'form' });