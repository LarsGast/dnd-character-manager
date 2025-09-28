import {
	getSelectSection,
	getTextareaSection,
} from '../../services/FormElementsBuilder.js';
import { HomebrewBaseForm } from './HomebrewBaseForm.js';
import { LinkedObjectsSection } from '../sections/LinkedObjectsSection.js';
import { Subclass } from '../../../../../types/domain/resources/Subclass.js';
import {
	classRepository,
	spellRepository,
} from '../../../../../wiring/dependencies.js';
import { SubclassRecord } from '../../../../../types/storage/resources/SubclassRecord.js';
import { HOMEBREW_RESOURCE_RECORD_VERSION } from '../../../../../types/storage/wrappers/BaseResourceRecord.js';

/**
 * Form for editing custom homebrew Subclass objects.
 */
export class SubclassForm extends HomebrewBaseForm {
	subclass: Subclass;
	descriptionSection?: HTMLElement;
	spellsSection?: LinkedObjectsSection;
	classSection?: HTMLElement;

	/**
	 * Creates an instance of SubclassForm.
	 * @param subclassObject
	 */
	constructor(subclassObject: Subclass) {
		super(subclassObject);

		this.subclass = subclassObject;
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

		this.descriptionSection = getTextareaSection(
			'Description',
			'desc',
			this.subclass.desc,
			true,
			'Description of the subclass.',
		);
		fragment.appendChild(this.descriptionSection);

		this.classSection = getSelectSection(
			'Class',
			'class',
			this.subclass.class?.index ?? '',
			(await classRepository.getAllAsync()).results.map(({ index, name }) => ({ index, name })),
			true,
			'Class that the subclass belongs to.',
		);
		fragment.appendChild(this.classSection);

		this.spellsSection = new LinkedObjectsSection(
			'Spells',
			await spellRepository.getAllAsync(),
			this.subclass.spells?.map((s) => s.spell) ?? [],
			'Subclass specific spells.',
		);
		fragment.appendChild(this.spellsSection);

		return fragment;
	}

	/**
	 * @override Subclass specific properties.
	 */
	override async getFormDataAsync(): Promise<SubclassRecord> {
		const baseResource = await super.getFormDataAsync();

		return {
			...baseResource,
			desc: this.descriptionSection!.getElementsByTagName('textarea')[0]
				.value.split('\n')
				.map((p: string) => p.trim())
				.filter((p: string | any[]) => p.length > 0),
			class: {
				version: HOMEBREW_RESOURCE_RECORD_VERSION,
				id: (
					this.classSection!.getElementsByTagName(
						'select',
					)[0] as HTMLSelectElement
				).value,
				name: (
					this.classSection!.getElementsByTagName(
						'select',
					)[0] as HTMLSelectElement
				).selectedOptions[0].text,
				resourceType: 'classes',
			},
			spells: this.spellsSection!.getValue().map((spell) => ({
				spell: spell,
				prerequisites: [],
			})),
		};
	}
}

customElements.define('subclass-form', SubclassForm, { extends: 'form' });
