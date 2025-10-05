import { SubclassFeature } from '../../../../../types/domain/resources/Subclass.js';
import {
	getNumberInputWithLabel,
	getTextareaWithLabel,
	getTextInputWithLabel,
} from '../../services/FormElementsBuilder.js';

export class SubclassFeatureSection extends HTMLElement {
	constructor(id: number, feature?: SubclassFeature) {
		super();

		this.appendChild(this.getNameInput(id, feature));
		this.appendChild(this.getLevelInput(id, feature));
		this.appendChild(this.getDescriptionInput(id, feature));
		this.appendChild(this.getRemoveButton());
	}

	private getNameInput(
		id: number,
		feature?: SubclassFeature,
	): HTMLLabelElement {
		const nameInput = getTextInputWithLabel(
			'Name',
			`subclass-feature-name-${id}`,
			feature?.name || '',
			true,
			'The name of the subclass feature.',
		);
		return nameInput;
	}

	private getLevelInput(
		id: number,
		feature?: SubclassFeature,
	): HTMLLabelElement {
		const levelInput = getNumberInputWithLabel(
			'Level',
			`subclass-feature-level-${id}`,
			feature?.level || 1,
			true,
			'The level at which this feature is gained.',
			1,
			20,
		);
		return levelInput;
	}

	private getDescriptionInput(
		id: number,
		feature?: SubclassFeature,
	): HTMLLabelElement {
		const descInput = getTextareaWithLabel(
			'Description',
			`subclass-feature-description-${id}`,
			feature?.description || '',
			true,
			'The description of the subclass feature.',
		);
		return descInput;
	}

	private getRemoveButton(): HTMLButtonElement {
		const button = document.createElement('button');
		button.type = 'button';
		button.textContent = 'Remove';
		button.addEventListener('click', () => {
			this.remove();
		});
		return button;
	}
}

customElements.define('subclass-feature-section', SubclassFeatureSection);
