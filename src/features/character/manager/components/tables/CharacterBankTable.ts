import { getElementWithTextContent } from '../../../../../utils/util';
import { PlayerCharacterBankEntry } from '../../../../../store/PlayerCharacterBank';
import { CharacterExportButton } from '../buttons/CharacterExportButton';
import { CharacterDeleteButton } from '../buttons/CharacterDeleteButton';
import { CharacterSelectButton } from '../buttons/CharacterSelectButton';
import { globals } from '../../../../../store/load-globals';
import { PlayerCharacter } from '../../../../../types/PlayerCharacter';
import {
	classRepository,
	raceRepository,
	subclassRepository,
	subraceRepository,
} from '../../../../../wiring/dependencies';

/**
 * Custom HTML element for displaying active and inactive characters stored in the PlayerCharacterBank.
 * Extends HTMLTableElement.
 */
export class CharacterBankTable extends HTMLTableElement {
	isForCurrentCharacter: boolean;
	tableCaption: HTMLElement;
	tableHead: HTMLTableSectionElement;
	tableBody: HTMLTableSectionElement;
	_updateHandler?: () => Promise<void>;

	/**
	 * Built the non-changing HTML.
	 * @param isForActiveCharacter Wether the table shows the active characters, or all inactive characters.
	 */
	constructor(isForActiveCharacter: boolean) {
		super();

		this.isForCurrentCharacter = isForActiveCharacter;

		this.tableCaption = getElementWithTextContent(
			'caption',
			isForActiveCharacter ? 'Selected character' : 'Character storage',
		);
		this.tableHead = this.getTableHead();

		// Empty body, will be filled on events.
		this.tableBody = document.createElement('tbody');

		this.appendChild(this.tableCaption);
		this.appendChild(this.tableHead);
		this.appendChild(this.tableBody);
	}

	/**
	 * Called when the element is connected to the DOM.
	 * Listens for events to update the body of the table.
	 */
	connectedCallback(): void {
		this._updateHandler = async () => await this.updateTableBodyAsync();

		document.addEventListener(
			'manageCharactersDialogOpened',
			this._updateHandler,
		);

		if (!this.isForCurrentCharacter) {
			document.addEventListener('newCharacterCreated', this._updateHandler);
			document.addEventListener('characterImported', this._updateHandler);
			document.addEventListener('playerCharacterDeleted', this._updateHandler);
		}
	}

	/**
	 * Called when the element is disconnected from the DOM.
	 * Removes the event listeners.
	 */
	disconnectedCallback(): void {
		document.removeEventListener(
			'manageCharactersDialogOpened',
			this._updateHandler!,
		);
		document.removeEventListener('newCharacterCreated', this._updateHandler!);
		document.removeEventListener('characterImported', this._updateHandler!);
		document.removeEventListener(
			'playerCharacterDeleted',
			this._updateHandler!,
		);
	}

	/**
	 * Get the head with column names for the table.
	 * @returns
	 */
	getTableHead(): HTMLTableSectionElement {
		const heading = document.createElement('thead');

		const row = document.createElement('tr');

		row.appendChild(getElementWithTextContent('th', 'Buttons'));
		row.appendChild(getElementWithTextContent('th', 'Name'));
		row.appendChild(getElementWithTextContent('th', 'Race'));
		row.appendChild(getElementWithTextContent('th', 'Classes'));

		heading.appendChild(row);

		return heading;
	}

	/**
	 * Asynchronously updates the body of the table to have the current data of the characters in storage.
	 */
	async updateTableBodyAsync(): Promise<void> {
		this.tableBody.replaceChildren();

		const playerCharacters = this.getPlayerCharactersForTable();

		// Sort them from last edited -> first edited, so the most used PCs are generally at the top.
		const sortedCharacters = playerCharacters.sort(
			(a, b) => b.lastEdit.getTime() - a.lastEdit.getTime(),
		);
		for (const playerCharacter of sortedCharacters) {
			this.tableBody.appendChild(await this.getTableRowAsync(playerCharacter));
		}
	}

	/**
	 * Get all characters that need to be displayed in the table.
	 * @returns Array that either contains only thew active PC or all inactive PCs.
	 */
	getPlayerCharactersForTable(): PlayerCharacterBankEntry[] {
		if (this.isForCurrentCharacter) {
			return [globals.playerCharacterBank.getActivePlayerCharacterBankEntry()];
		} else {
			return globals.playerCharacterBank.getInactivePlayerCharacterBankEntries();
		}
	}

	/**
	 *
	 * Asynchronously builds a single row for the table containing PC information.
	 * @param playerCharacterEntry
	 * @returns
	 */
	async getTableRowAsync(
		playerCharacterEntry: PlayerCharacterBankEntry,
	): Promise<HTMLTableRowElement> {
		const row = document.createElement('tr');

		const playerCharacter = playerCharacterEntry.playerCharacter;

		row.appendChild(this.getButtonsColumnValue(playerCharacterEntry));
		row.appendChild(getElementWithTextContent('td', playerCharacter.name));
		row.appendChild(
			getElementWithTextContent(
				'td',
				await this.getRaceSubraceColumnValueAsync(playerCharacter),
			),
		);
		row.appendChild(
			getElementWithTextContent(
				'td',
				await this.getClassLevelColumnValueAsync(playerCharacter),
			),
		);

		return row;
	}

	/**
	 * Get the data for the buttons column for the given PC.
	 * @param playerCharacterEntry
	 * @returns
	 */
	getButtonsColumnValue(
		playerCharacterEntry: PlayerCharacterBankEntry,
	): HTMLTableCellElement {
		const td = document.createElement('td');

		// Only inactive PCs can be made active.
		if (!this.isForCurrentCharacter) {
			td.appendChild(new CharacterSelectButton(playerCharacterEntry.id));
		}

		// All PCs can be exported.
		td.appendChild(new CharacterExportButton(playerCharacterEntry.id));

		// Only inactive PCs can be deleted to remove ambiguity for the developer.
		if (!this.isForCurrentCharacter) {
			td.appendChild(new CharacterDeleteButton(playerCharacterEntry.id));
		}

		return td;
	}

	/**
	 * Get the data for the race and subrace column for the given PC.
	 * @param playerCharacter
	 * @returns Ex "Dwarf, Hill Dwarf", "Dragonborn" etc.
	 */
	async getRaceSubraceColumnValueAsync(
		playerCharacter: PlayerCharacter,
	): Promise<string> {
		if (!playerCharacter.race) {
			return 'Not selected';
		}

		// Get the actual race from the API to get the display name.
		const race = (await raceRepository.getAsync(playerCharacter.race))!;

		let value = race.name;
		if (playerCharacter.subrace) {
			// Get the actual subrace from the API to get the display name.
			const subrace = (await subraceRepository.getAsync(
				playerCharacter.subrace,
			))!;
			value += `, ${subrace.name}`;
		}

		return value;
	}

	/**
	 * Get the data for the class, subclass, and level column for the given PC.
	 * @param playerCharacter
	 * @returns Ex "Barbarian 5 (Berserker), Bard 3 (Lore), Paladin 1".
	 */
	async getClassLevelColumnValueAsync(
		playerCharacter: PlayerCharacter,
	): Promise<string> {
		if (playerCharacter.classes.length === 0) {
			return 'Not selected';
		}

		const values = await Promise.all(
			playerCharacter.classes.map((classObject: any) =>
				this.getClassSubclassLevelValue(classObject),
			),
		);

		return values.join(', ');
	}

	/**
	 * Get the display string of a single class object to display in the Classes column.
	 * @param classObject
	 * @returns Ex "Barbarian 5 (Berserker)", "Paladin 1", etc.
	 */
	async getClassSubclassLevelValue(classObject: any): Promise<string> {
		// Get the actual class from the API to get the display name.
		const classApiObject = (await classRepository.getAsync(classObject.index))!;

		let value = `${classApiObject.name} ${classObject.level}`;
		if (classObject.subclass) {
			// Get the actual subclass from the API to get the display name.
			const subclass = (await subclassRepository.getAsync(
				classObject.subclass,
			))!;
			value += ` (${subclass.name})`;
		}

		return value;
	}
}

customElements.define('character-bank-table', CharacterBankTable, {
	extends: 'table',
});
