import { BaseResource } from "../../../../../types/domain/wrappers/BaseResource.js";
import { getElementWithTextContent } from "../../../../../utils/util.js";
import { homebrewRepository } from "../../../../../wiring/dependencies.js";
import { HomebrewDeleteButton } from "../buttons/HomebrewDeleteButton.js";
import { HomebrewEditButton } from "../buttons/HomebrewEditButton.js";
import { HomebrewExportButton } from "../buttons/HomebrewExportButton.js";

/**
 * Custom table element for displaying homebrew objects.
 * This table will be filled with homebrew objects when the manage homebrew dialog is opened.
 */
export class HomebrewTable extends HTMLTableElement {
    tableCaption: HTMLElement;
    tableHead: HTMLTableSectionElement;
    tableBody: HTMLTableSectionElement;
    _updateHandler?: () => Promise<void>;
    
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
    connectedCallback(): void {
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
    disconnectedCallback(): void {
        document.removeEventListener("manageHomebrewDialogOpened", this._updateHandler!);
        document.removeEventListener("newHomebrewCreated", this._updateHandler!);
        document.removeEventListener("homebrewImported", this._updateHandler!);
        document.removeEventListener("homebrewDeleted", this._updateHandler!);
    }

    /**
     * Creates the table head with the column titles.
     * @returns The table head element.
     */
    getTableHead(): HTMLTableSectionElement {
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
    updateTableBody(): void {
        this.tableBody.replaceChildren();

        const homebrewResources = homebrewRepository.getAll();

        // Sort them from last edited -> first edited, so the most used homebrew objects are generally at the top.
        const sortedEntries = homebrewResources.sort();

        for (const entry of sortedEntries) {
            this.tableBody.appendChild(this.getTableBodyRow(entry));
        }
    }

    /**
     * Creates a table row for a homebrew entry.
     * @param resource The homebrew entry to create the row for.
     * @returns The table row element containing the entry's data.
     */
    getTableBodyRow(resource: BaseResource): HTMLTableRowElement {

        const row = document.createElement('tr');

        row.appendChild(this.getButtonsColumnValue(resource));
        row.appendChild(getElementWithTextContent('td', resource.name));
        row.appendChild(getElementWithTextContent('td', resource.resourceType));

        return row;
    }

    /**
     * Creates the buttons column for a homebrew entry.
     * This column contains buttons for editing, exporting, and deleting the homebrew entry.
     * @param resource The homebrew entry to create the buttons for.
     * @returns The table cell containing the buttons.
     */
    getButtonsColumnValue(resource: BaseResource): HTMLTableCellElement {
        const td = document.createElement('td');

        td.appendChild(new HomebrewEditButton(resource.index));
        td.appendChild(new HomebrewExportButton(resource.index));
        td.appendChild(new HomebrewDeleteButton(resource.index));

        return td;
    }
}

customElements.define('homebrew-object-table', HomebrewTable, { extends: 'table' });