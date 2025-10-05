import { RaceTrait } from '../../../../../types/domain/resources/Race.js';
import {
	getTextareaWithLabel,
	getTextInputWithLabel,
} from '../../services/FormElementsBuilder.js';

export class RaceTraitSection extends HTMLElement {
	constructor(id: number, trait?: RaceTrait) {
		super();

		this.appendChild(this.getNameInput(id, trait));
		this.appendChild(this.getDescriptionInput(id, trait));
		this.appendChild(this.getRemoveButton());
	}

	private getNameInput(id: number, trait?: RaceTrait): HTMLLabelElement {
		const nameInput = getTextInputWithLabel(
			'Name',
			`trait-name-${id}`,
			trait?.name || '',
			true,
			'The name of the trait.',
		);

		return nameInput;
	}

	private getDescriptionInput(id: number, trait?: RaceTrait): HTMLLabelElement {
		const descInput = getTextareaWithLabel(
			'Description',
			`trait-description-${id}`,
			trait?.description || '',
			true,
			'The description of the trait.',
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

customElements.define('race-trait-section', RaceTraitSection);
