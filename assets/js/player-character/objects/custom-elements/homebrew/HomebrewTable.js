import { ApiCategory } from "../../../api.js";
import { globals } from "../../../load-globals.js";
import { getElementWithTextContent } from "../../../util.js";
import { HomebrewBankEntry } from "../../HomebrewBank.js";
import { HomebrewDeleteButton } from "./HomebrewDeleteButton.js";
import { HomebrewEditButton } from "./HomebrewEditButton.js";
import { HomebrewExportButton } from "./HomebrewExportButton.js";

/**
 * Custom table element for displaying homebrew objects.
 * This table will be filled with homebrew objects when the manage homebrew dialog is opened.
 */
export class HomebrewTable extends HTMLTableElement {
    
    constructor() {
        super();
        
        this.tableCaption = getElementWithTextContent("caption", "Homebrew objects");
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
        this._updateHandler = async () => this.updateTableBody();

        document.addEventListener("manageHomebrewDialogOpened", this._updateHandler);
        document.addEventListener("newHomebrewCreated", this._updateHandler);
        document.addEventListener("homebrewImported", this._updateHandler);
        document.addEventListener("homebrewDeleted", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes the event listeners.
     */
    disconnectedCallback() {
        document.removeEventListener("manageHomebrewDialogOpened", this._updateHandler);
        document.removeEventListener("newHomebrewCreated", this._updateHandler);
        document.removeEventListener("homebrewImported", this._updateHandler);
        document.removeEventListener("homebrewDeleted", this._updateHandler);
    }

    /**
     * Creates the table head with the column titles.
     * @returns {HTMLTableSectionElement} The table head element.
     */
    getTableHead() {
        const head = document.createElement('thead');

        const row = document.createElement('tr');

        row.appendChild(getElementWithTextContent("th", "Buttons"));
        row.appendChild(getElementWithTextContent("th", "Name"));
        row.appendChild(getElementWithTextContent("th", "Type"));

        head.appendChild(row);

        return head;
    }

    /**
     * Updates the table body with the current homebrew entries.
     * This method sorts the entries by last edited date and populates the table body.
     */
    updateTableBody() {
        this.tableBody.replaceChildren();

        const homebrewEntry = globals.homebrewBank.homebrewBankEntries;

        // Sort them from last edited -> first edited, so the most used homebrew objects are generally at the top.
        const sortedEntries = homebrewEntry.sort((a, b) => b.lastEdit - a.lastEdit);

        for (const entry of sortedEntries) {
            this.tableBody.appendChild(this.getTableBodyRow(entry));
        }
    }

    /**
     * Creates a table row for a homebrew entry.
     * @param {HomebrewBankEntry} entry The homebrew entry to create the row for.
     * @returns {HTMLTableRowElement} The table row element containing the entry's data.
     */
    getTableBodyRow(entry) {

        const row = document.createElement('tr');

        row.appendChild(this.getButtonsColumnValue(entry));
        row.appendChild(getElementWithTextContent('td', entry.homebrewObject.name));
        row.appendChild(getElementWithTextContent('td', new ApiCategory(entry.apiCategoryName).getSingularName()));

        return row;
    }

    /**
     * Creates the buttons column for a homebrew entry.
     * This column contains buttons for editing, exporting, and deleting the homebrew entry.
     * @param {HomebrewBankEntry} entry The homebrew entry to create the buttons for.
     * @returns {HTMLTableCellElement} The table cell containing the buttons.
     */
    getButtonsColumnValue(entry) {
        const td = document.createElement('td');

        td.appendChild(new HomebrewEditButton(entry.id));
        td.appendChild(new HomebrewExportButton(entry.id));
        td.appendChild(new HomebrewDeleteButton(entry.id));

        return td;
    }
}

customElements.define('homebrew-object-table', HomebrewTable, { extends: 'table' });