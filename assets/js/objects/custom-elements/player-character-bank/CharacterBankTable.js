import { getElementWithTextContent } from "../../../util.js";
import { PlayerCharacterBankEntry } from "../../PlayerCharacterBank.js";
import { CharacterExportButton } from "./CharacterExportButton.js";
import { CharacterDeleteButton } from "./CharacterDeleteButton.js";
import { CharacterSelectButton } from "./CharacterSelectButton.js";
import { globals } from "../../../load-globals.js";
import { PlayerCharacter } from "../../PlayerCharacter.js";
import { Race } from "../../api/resources/Race.js";
import { Subrace } from "../../api/resources/Subrace.js";
import { Class } from "../../api/resources/Class.js";
import { Subclass } from "../../api/resources/Subclass.js";

/**
 * Custom HTML element for displaying active and inactive characters stored in the PlayerCharacterBank.
 * Extends HTMLTableElement.
 */
export class CharacterBankTable extends HTMLTableElement {

    /**
     * Built the non-changing HTML.
     * @param {boolean} isForActiveCharacter Wether the table shows the active characters, or all inactive characters.
     */
    constructor(isForActiveCharacter) {
        super();

        this.isForCurrentCharacter = isForActiveCharacter;
        
        this.tableCaption = getElementWithTextContent("caption", isForActiveCharacter ? "Selected character" : "Character storage");
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
    connectedCallback() {
        this._updateHandler = async () => await this.updateTableBodyAsync();

        document.addEventListener("manageCharactersDialogOpened", this._updateHandler);

        if (!this.isForCurrentCharacter) {
            document.addEventListener("newCharacterCreated", this._updateHandler);
            document.addEventListener("characterImported", this._updateHandler);
            document.addEventListener("playerCharacterDeleted", this._updateHandler);
        }
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes the event listeners.
     */
    disconnectedCallback() {
        document.removeEventListener("manageCharactersDialogOpened", this._updateHandler);
        document.removeEventListener("newCharacterCreated", this._updateHandler);
        document.removeEventListener("characterImported", this._updateHandler);
        document.removeEventListener("playerCharacterDeleted", this._updateHandler);
    }

    /**
     * Get the head with column names for the table.
     * @returns {HTMLTableSectionElement}
     */
    getTableHead() {
        const heading = document.createElement("thead");

        const row = document.createElement('tr');

        row.appendChild(getElementWithTextContent("th", "Buttons"));
        row.appendChild(getElementWithTextContent("th", "Name"));
        row.appendChild(getElementWithTextContent("th", "Race"));
        row.appendChild(getElementWithTextContent("th", "Classes"));

        heading.appendChild(row);

        return heading;
    }

    /**
     * Asynchronously updates the body of the table to have the current data of the characters in storage.
     */
    async updateTableBodyAsync() {
        this.tableBody.replaceChildren();

        const playerCharacters = this.getPlayerCharactersForTable();

        // Sort them from last edited -> first edited, so the most used PCs are generally at the top.
        const sortedCharacters = playerCharacters.sort((a, b) => b.lastEdit - a.lastEdit);
        for (const playerCharacter of sortedCharacters) {
            this.tableBody.appendChild(await this.getTableRowAsync(playerCharacter));
        }
    }

    /**
     * Get all characters that need to be displayed in the table.
     * @returns {PlayerCharacterBankEntry[]} Array that either contains only thew active PC or all inactive PCs.
     */
    getPlayerCharactersForTable() {
        if (this.isForCurrentCharacter) {
            return [globals.playerCharacterBank.getActivePlayerCharacterBankEntry()];
        }
        else {
            return globals.playerCharacterBank.getInactivePlayerCharacterBankEntries();
        }
    }

    /**
     * 
     * Asynchronously builds a single row for the table containing PC information.
     * @param {PlayerCharacterBankEntry} playerCharacterEntry
     * @returns {HTMLTableRowElement}
     */
    async getTableRowAsync(playerCharacterEntry) {
        const row = document.createElement('tr');

        const playerCharacter = playerCharacterEntry.playerCharacter;

        row.appendChild(this.getButtonsColumnValue(playerCharacterEntry));
        row.appendChild(getElementWithTextContent('td', playerCharacter.name));
        row.appendChild(getElementWithTextContent('td', await this.getRaceSubraceColumnValueAsync(playerCharacter)));
        row.appendChild(getElementWithTextContent('td', await this.getClassLevelColumnValueAsync(playerCharacter)));

        return row;
    }

    /**
     * Get the data for the buttons column for the given PC.
     * @param {PlayerCharacterBankEntry} playerCharacterEntry
     * @returns {HTMLTableCellElement}
     */
    getButtonsColumnValue(playerCharacterEntry) {

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
     * @param {PlayerCharacter} playerCharacter
     * @returns {string} Ex "Dwarf, Hill Dwarf", "Dragonborn" etc.
     */
    async getRaceSubraceColumnValueAsync(playerCharacter) {
        if (!playerCharacter.race) {
            return 'Not selected';
        }

        // Get the actual race from the API to get the display name.
        const race = await Race.getAsync(playerCharacter.race);

        let value = race.name;
        if (playerCharacter.subrace) {
            // Get the actual subrace from the API to get the display name.
            const subrace = await Subrace.getAsync(playerCharacter.subrace);
            value += `, ${subrace.name}`;
        }

        return value;
    }

    /**
     * Get the data for the class, subclass, and level column for the given PC.
     * @param {PlayerCharacter} playerCharacter
     * @returns {string} Ex "Barbarian 5 (Berserker), Bard 3 (Lore), Paladin 1".
     */
    async getClassLevelColumnValueAsync(playerCharacter) {

        if (playerCharacter.classes.length === 0) {
            return "Not selected";
        }

        const values = await Promise.all(playerCharacter.classes.map(classObject => this.getClassSubclassLevelValue(classObject)));

        return values.join(', ');
    }

    /**
     * Get the display string of a single class object to display in the Classes column.
     * @param {object} classObject 
     * @returns {string} Ex "Barbarian 5 (Berserker)", "Paladin 1", etc.
     */
    async getClassSubclassLevelValue(classObject) {

        // Get the actual class from the API to get the display name.
        const classApiObject = await Class.getAsync(classObject.index);

        let value = `${classApiObject.name} ${classObject.level}`;
        if (classObject.subclass) {
            // Get the actual subclass from the API to get the display name.
            const subclass = await Subclass.getAsync(classObject.subclass);
            value += ` (${subclass.name})`;
        }

        return value;
    }
}

customElements.define('character-bank-table', CharacterBankTable, { extends: 'table' });