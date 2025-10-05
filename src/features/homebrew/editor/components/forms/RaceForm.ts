import {
	getSelectSection,
	getTextareaSection,
	getNumberInputSection,
} from '../../services/FormElementsBuilder.js';
import { HomebrewBaseForm } from './HomebrewBaseForm.js';
import { AbilityBonusesSection } from '../sections/AbilityBonusesSection.js';
import { ChoiceSection } from '../sections/ChoiceSection.js';
import { LinkedObjectsSection } from '../sections/LinkedObjectsSection.js';
import { Race } from '../../../../../types/domain/resources/Race.js';
import {
	languageRepository,
	subraceRepository,
} from '../../../../../wiring/dependencies.js';
import { RaceRecord } from '../../../../../types/storage/resources/RaceRecord.js';
import { RaceTraitsSection } from '../sections/RaceTraitsSection.js';

/**
 * Form for editing custom homebrew Race objects.
 */
export class RaceForm extends HomebrewBaseForm {
	race: Race;
	abilityBonusesSection?: AbilityBonusesSection;
	traitsSection?: RaceTraitsSection;
	languagesSection?: LinkedObjectsSection;
	languageOptionsSection?: ChoiceSection;
	subracesSection?: LinkedObjectsSection;

	/**
	 * Creates an instance of RaceForm.
	 * @param raceElement
	 */
	constructor(raceElement: Race) {
		super(raceElement);

		this.race = raceElement;
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

		this.abilityBonusesSection = new AbilityBonusesSection(
			this.race.ability_bonuses ?? [],
			'Racial bonuses to ability scores.',
		);
		fragment.appendChild(this.abilityBonusesSection);

		fragment.appendChild(
			getTextareaSection(
				'Age',
				'age',
				this.race.age,
				true,
				'Flavor description of possible ages for this race.',
			),
		);
		fragment.appendChild(
			getTextareaSection(
				'Alignment',
				'alignment',
				this.race.alignment,
				true,
				'Flavor description of likely alignments this race takes.',
			),
		);
		fragment.appendChild(
			getSelectSection(
				'Size',
				'size',
				this.race.size,
				['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'],
				true,
				'Size class of this race.',
			),
		);
		fragment.appendChild(
			getTextareaSection(
				'Size description',
				'size_description',
				this.race.size_description,
				true,
				'Flavor description of height and weight for this race.',
			),
		);
		fragment.appendChild(
			getNumberInputSection(
				'Speed',
				'speed',
				this.race.speed ?? 0,
				true,
				'Base move speed for this race (in feet per round).',
				0,
			),
		);

		this.languagesSection = new LinkedObjectsSection(
			'Languages',
			await languageRepository.getAllAsync(),
			this.race.languages ?? [],
			'Starting languages for all new characters of this race.',
		);
		fragment.appendChild(this.languagesSection);

		this.languageOptionsSection = new ChoiceSection(
			'Language options',
			await languageRepository.getAllAsync(),
			'A choice of additional starting languages of this race',
			this.race?.language_options,
		);
		fragment.appendChild(this.languageOptionsSection);

		fragment.appendChild(
			getTextareaSection(
				'Language description',
				'language_desc',
				this.race.language_desc,
				true,
				'Flavor description of the languages this race knows.',
			),
		);

		this.traitsSection = new RaceTraitsSection(this.race.traits ?? []);
		fragment.appendChild(this.traitsSection);

		this.subracesSection = new LinkedObjectsSection(
			'Subraces',
			await subraceRepository.getAllAsync(),
			this.race.subraces ?? [],
			'All possible subraces that this race includes.',
		);
		fragment.appendChild(this.subracesSection);

		return fragment;
	}

	/**
	 * @override Race specific properties.
	 */
	override async getFormDataAsync(): Promise<RaceRecord> {
		const formData = new FormData(this);

		const baseResource = await super.getFormDataAsync();

		return {
			...baseResource,
			ability_bonuses: await this.abilityBonusesSection!.getValueAsync(),
			age: formData.get('age')!.toString(),
			alignment: formData.get('alignment')!.toString(),
			size: formData.get('size')!.toString(),
			size_description: formData.get('size_description')!.toString(),
			speed: parseInt(formData.get('speed')!.toString(), 10),
			traits: this.traitsSection!.getValue(),
			languages: this.languagesSection!.getValue(),
			language_options: this.languageOptionsSection!.getValue(),
			language_desc: formData.get('language_desc')!.toString(),
			subraces: this.subracesSection!.getValue(),
		};
	}
}

customElements.define('race-form', RaceForm, { extends: 'form' });
