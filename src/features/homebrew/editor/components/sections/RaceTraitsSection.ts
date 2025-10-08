import { RaceTrait } from '../../../../../types/domain/resources/Race';
import { RaceTraitRecord } from '../../../../../types/storage/resources/RaceRecord';
import { getTooltipSpan } from '../../services/FormElementsBuilder';
import { RaceTraitSection } from './RaceTraitSection';

export class RaceTraitsSection extends HTMLElement {
	private nextId = 0; // Static counter to generate unique IDs
	private traitSections: RaceTraitSection[] = [];
	private traitsContainer: HTMLDivElement = document.createElement('div');

	public constructor(selectedTraits: RaceTrait[]) {
		super();

		this.appendChild(
			this.getSectionLabel(
				'Traits',
				'Racial traits that provide benefits to its members.',
			),
		);
		this.appendChild(this.traitsContainer);

		for (const trait of selectedTraits) {
			this.addTraitSection(trait);
		}

		this.appendChild(this.getAddButton());
	}

	/**
	 * Creates a label for the section with the given text and optional tooltip.
	 * @param labelText The text for the label.
	 * @param tooltip Optional tooltip text for the label.
	 * @returns The label element with the specified text and tooltip.
	 */
	private getSectionLabel(
		labelText: string,
		tooltip: string,
	): HTMLLabelElement {
		const label = document.createElement('label');

		label.textContent = labelText;

		label.appendChild(getTooltipSpan(tooltip));

		return label;
	}

	private addTraitSection(trait?: RaceTrait): void {
		const uniqueId = this.nextId++;
		const traitSection = new RaceTraitSection(uniqueId, trait);
		this.traitSections.push(traitSection);
		this.traitsContainer.appendChild(traitSection);
	}

	private getAddButton(): HTMLButtonElement {
		const button = document.createElement('button');
		button.type = 'button';
		button.textContent = 'Add';
		button.addEventListener('click', () => {
			// Handle adding a new trait
			this.addTraitSection();
		});
		return button;
	}

	public getValue(): RaceTraitRecord[] {
		const traits: RaceTraitRecord[] = [];

		for (let i = 0; i < this.nextId; i++) {
			const nameInput = this.querySelector<HTMLInputElement>(
				`#homebrew-object-trait-name-${i}`,
			);
			const descInput = this.querySelector<HTMLTextAreaElement>(
				`#homebrew-object-trait-description-${i}`,
			);

			if (nameInput && descInput) {
				traits.push({
					name: nameInput.value,
					description: descInput.value,
				});
			}
		}

		return traits;
	}
}

customElements.define('race-traits-section', RaceTraitsSection);
