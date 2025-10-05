import { SubclassFeature } from '../../../../../types/domain/resources/Subclass.js';
import { SubclassFeatureRecord } from '../../../../../types/storage/resources/SubclassRecord.js';
import { getTooltipSpan } from '../../services/FormElementsBuilder.js';
import { SubclassFeatureSection } from './SubclassFeatureSection.js';

export class SubclassFeaturesSection extends HTMLElement {
	private nextId = 0;
	private featureSections: SubclassFeatureSection[] = [];
	private featuresContainer: HTMLDivElement = document.createElement('div');

	public constructor(selectedFeatures: SubclassFeature[]) {
		super();

		this.appendChild(
			this.getSectionLabel(
				'Features',
				'Subclass features gained at specific levels.',
			),
		);
		this.appendChild(this.featuresContainer);

		for (const feature of selectedFeatures) {
			this.addFeatureSection(feature);
		}

		this.appendChild(this.getAddButton());
	}

	private getSectionLabel(
		labelText: string,
		tooltip: string,
	): HTMLLabelElement {
		const label = document.createElement('label');
		label.textContent = labelText;
		label.appendChild(getTooltipSpan(tooltip));
		return label;
	}

	private addFeatureSection(feature?: SubclassFeature): void {
		const uniqueId = this.nextId++;
		const featureSection = new SubclassFeatureSection(uniqueId, feature);
		this.featureSections.push(featureSection);
		this.featuresContainer.appendChild(featureSection);
	}

	private getAddButton(): HTMLButtonElement {
		const button = document.createElement('button');
		button.type = 'button';
		button.textContent = 'Add';
		button.addEventListener('click', () => {
			this.addFeatureSection();
		});
		return button;
	}

	public getValue(): SubclassFeatureRecord[] {
		const features: SubclassFeatureRecord[] = [];
		for (let i = 0; i < this.nextId; i++) {
			const nameInput = this.querySelector<HTMLInputElement>(
				`#homebrew-object-subclass-feature-name-${i}`,
			);
			const levelInput = this.querySelector<HTMLInputElement>(
				`#homebrew-object-subclass-feature-level-${i}`,
			);
			const descInput = this.querySelector<HTMLTextAreaElement>(
				`#homebrew-object-subclass-feature-description-${i}`,
			);
			if (nameInput && levelInput && descInput) {
				features.push({
					name: nameInput.value,
					level: parseInt(levelInput.value, 10),
					description: descInput.value,
				});
			}
		}
		return features;
	}
}

customElements.define('subclass-features-section', SubclassFeaturesSection);
