import { ResourceList } from '../../../../../types/domain/wrappers/ResourceList';
import { BaseResource } from '../../../../../types/domain/wrappers/BaseResource';
import { getTooltipSpan } from '../../services/FormElementsBuilder';
import { SubclassSpellRecord } from '../../../../../types/storage/resources/SubclassRecord';
import {
	BaseResourceRecord,
	HOMEBREW_RESOURCE_RECORD_VERSION,
} from '../../../../../types/storage/wrappers/BaseResourceRecord';
import { SubclassSpell } from '../../../../../types/domain/resources/Subclass';
import { getEmptyOption, getSelectOption } from '../../../../../utils/util';

/**
 * Custom element for a section that allows choosing spells for a subclass at certain levels.
 * Each entry contains a spell select and a number input for the level.
 */
export class SpellLevelSection extends HTMLElement {
	allSpells: ResourceList;

	/**
	 * @param label The label for the section.
	 * @param allSpells The list of all possible spells to select from.
	 * @param selectedSpells Array of objects: { spell: BaseResource, level: number }
	 * @param tooltip Tooltip text for the section.
	 */
	constructor(
		label: string,
		allSpells: ResourceList,
		selectedSpells: SubclassSpell[] = [],
		tooltip: string = '',
	) {
		super();
		this.allSpells = allSpells;

		this.appendChild(this.getSectionLabel(label, tooltip));
		this.appendChild(this.getAddButton());

		for (const entry of selectedSpells) {
			this.addSpellLevelRow(entry.spell, entry.level);
		}
	}

	getSectionLabel(labelText: string, tooltip: string): HTMLLabelElement {
		const label = document.createElement('label');
		label.textContent = labelText;
		label.appendChild(getTooltipSpan(tooltip));
		return label;
	}

	getAddButton(): HTMLButtonElement {
		const button = document.createElement('button');
		button.textContent = 'Add';
		button.type = 'button';
		button.onclick = () => {
			this.addSpellLevelRow();
		};
		return button;
	}

	addSpellLevelRow(selectedSpell?: BaseResource, level?: number): void {
		const row = document.createElement('div');

		// Spell select
		const select = document.createElement('select');
		select.required = true;
		select.appendChild(getEmptyOption());
		for (const spell of this.allSpells.results) {
			const option = getSelectOption(spell.name, spell.index);
			if (selectedSpell && spell.index === selectedSpell.index) {
				option.selected = true;
			}
			select.appendChild(option);
		}

		// Level input
		const input = document.createElement('input');
		input.type = 'number';
		input.min = '1';
		input.max = '20';
		input.value = level ? String(level) : '1';

		// Remove button
		const removeBtn = document.createElement('button');
		removeBtn.type = 'button';
		removeBtn.textContent = 'Remove';
		removeBtn.onclick = () => row.remove();

		row.appendChild(select);
		row.appendChild(input);
		row.appendChild(removeBtn);
		this.appendChild(row);
	}

	/**
	 * Gets the selected spells and their levels.
	 * @returns Array of objects
	 */
	getValue(): SubclassSpellRecord[] {
		const rows = Array.from(this.querySelectorAll('div'));
		return rows.map((row) => {
			const select = row.querySelector('select') as HTMLSelectElement;
			const input = row.querySelector('input') as HTMLInputElement;

			const spell = this.allSpells.results.find(
				(s) => s.index === select.value,
			);
			const spellRecord: BaseResourceRecord = {
				id: spell!.index,
				name: spell!.name,
				version: HOMEBREW_RESOURCE_RECORD_VERSION,
				resourceType: 'spells',
				notes: spell!.notes,
			};

			return {
				spell: spellRecord,
				level: parseInt(input.value, 10),
			};
		});
	}
}

customElements.define('spell-level-section', SpellLevelSection);
