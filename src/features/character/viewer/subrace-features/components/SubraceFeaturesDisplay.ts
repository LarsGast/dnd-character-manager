import { globals } from '../../../../../store/load-globals.js';
import { Subrace } from '../../../../../types/domain/resources/Subrace.js';
import { Trait } from '../../../../../types/domain/resources/Trait.js';
import {
	subraceRepository,
	traitRepository,
} from '../../../../../wiring/dependencies.js';

/**
 * Custom details element that displays the features of the selected subrace.
 * Extends HTMLDetailsElement.
 *
 * The element updates its contents based on the selected subrace.
 * It displays sections for the subrace's description, ability bonuses, and any available traits.
 */
export class SubraceFeaturesDisplay extends HTMLDetailsElement {
	_updateHandler?: (event: any) => Promise<void>;
	subrace?: Subrace;

	constructor() {
		super();
	}

	/**
	 * Called when the element is connected to the DOM.
	 * Updates the display and registers an event listener for subrace updates.
	 */
	connectedCallback(): void {
		this.updateDisplay();

		this._updateHandler = (event) => this.updateDisplay(event);
		document.addEventListener('subraceUpdated', this._updateHandler);
	}

	/**
	 * Called when disconnected from the DOM.
	 * Removes the event listener.
	 */
	disconnectedCallback(): void {
		document.removeEventListener('subraceUpdated', this._updateHandler!);
	}

	/**
	 * Updates the display if the triggering event indicates a change.
	 * @param event An optional event indicating an update.
	 */
	async updateDisplay(event?: CustomEvent) {
		if (this.getShouldUpdate(event)) {
			await this.updateSubraceFeaturesDisplay();
		}
	}

	/**
	 * Determines if the display should update.
	 * @param event The event to evaluate.
	 * @returns True if no event exists or the event is "subraceUpdated".
	 */
	getShouldUpdate(event?: CustomEvent): boolean {
		return !event || event.type === 'subraceUpdated';
	}

	/**
	 * Creates and returns a level-3 heading element for the given title.
	 * @param title The heading title.
	 * @returns The heading element.
	 */
	getHeading(title: string): HTMLElement {
		const heading = document.createElement('h3');
		heading.textContent = title;
		return heading;
	}

	/**
	 * Creates and returns a paragraph element containing the provided text.
	 * @param body The paragraph text.
	 * @returns The paragraph element.
	 */
	getParagraph(body: string): HTMLElement {
		const p = document.createElement('p');
		p.textContent = body;
		return p;
	}

	/**
	 * Asynchronously updates the subrace features display.
	 * Hides the element if no subrace is selected.
	 */
	async updateSubraceFeaturesDisplay(): Promise<void> {
		if (!globals.activePlayerCharacter.subrace) {
			this.style.display = 'none';
			return;
		}

		this.style.display = 'block';
		this.subrace = (await subraceRepository.getAsync(
			globals.activePlayerCharacter.subrace,
		))!;

		// Clear current contents.
		this.replaceChildren();

		// Add a section heading.
		this.appendChild(this.getSectionHeading());

		// Show subrace description.
		this.appendChild(this.getHeading('Description'));
		this.appendChild(this.getParagraph(this.subrace.desc));

		// Show ability bonuses.
		this.appendChild(this.getHeading('Ability Bonuses'));
		this.appendChild(this.getAbilityBonusBody());

		// If traits exist, create a traits section.
		const subraceTraits = await traitRepository.getAllTraitsBySubraceAsync(
			this.subrace.index,
		);
		if (subraceTraits.count > 0) {
			const fullTraitObjects = await Promise.all(
				subraceTraits.results.map(
					(subraceTrait) =>
						traitRepository.getAsync(subraceTrait.index) as Promise<Trait>,
				),
			);

			this.appendChild(this.getTraitsSection(fullTraitObjects));
		}
	}

	/**
	 * Constructs and returns the section heading element.
	 * @returns The summary element containing an h2 heading with the subrace name.
	 */
	getSectionHeading(): HTMLElement {
		const summary = document.createElement('summary');

		const heading = document.createElement('h2');

		heading.textContent = `Subrace features (${this.getSubraceName()})`;

		summary.appendChild(heading);

		return summary;
	}

	/**
	 * Retrieves the subrace name.
	 * @returns The subrace name or a prompt if none is selected.
	 */
	getSubraceName(): string {
		return this.subrace ? this.subrace.name : 'choose subrace';
	}

	/**
	 * Builds an unordered list displaying all ability bonuses for the subrace.
	 * @returns The unordered list element.
	 */
	getAbilityBonusBody(): HTMLElement {
		const ul = document.createElement('ul');

		for (const abilityBonus of this.subrace!.ability_bonuses) {
			const li = document.createElement('li');
			li.textContent = `${abilityBonus.ability_score.name} + ${abilityBonus.bonus}`;
			ul.appendChild(li);
		}

		return ul;
	}

	/**
	 * Creates and returns a level-4 heading element for a trait title.
	 * @param title The trait title.
	 * @returns The heading element.
	 */
	getTraitHeading(title: string): HTMLElement {
		const heading = document.createElement('h4');
		heading.textContent = title;
		return heading;
	}

	/**
	 * Constructs a section element that displays all traits for the subrace.
	 * @param traits An array of trait objects.
	 * @returns The section element with trait headings and paragraphs.
	 */
	getTraitsSection(traits: Trait[]): HTMLElement {
		const traitsSection = document.createElement('section');

		traitsSection.appendChild(this.getHeading('Traits'));

		for (const trait of traits) {
			traitsSection.appendChild(this.getTraitHeading(trait.name));
			for (const traitDesc of trait.desc) {
				traitsSection.appendChild(this.getParagraph(traitDesc));
			}
		}

		return traitsSection;
	}
}

customElements.define('subrace-features-display', SubraceFeaturesDisplay, {
	extends: 'details',
});
