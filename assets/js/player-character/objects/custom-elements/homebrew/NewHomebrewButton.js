import { globals } from "../../../load-globals.js";
import { ApiObjectInfo } from "../../api/resources/ApiObjectInfo.js";

export class NewHomebrewButton extends HTMLButtonElement {
    
    constructor() {
        super();
        
        // Set type and display text.
        this.disabled = true;
        this.type = 'button';
        this.textContent = "New";

        // Bind click event to add a default object to the bank.
        this.onclick = () => this.handleClick();
    }

    /**
     * Called when the element is connected to the DOM.
     * Listens for the "customElementTypeChanged" event to show the dialog.
     */
    connectedCallback() {
        this._updateHandler = (event) => this.updateButtonData(event);
        document.addEventListener("customElementTypeChanged", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes the event listener.
     */
    disconnectedCallback() {
        document.removeEventListener("customElementTypeChanged", this._updateHandler);
    }

    /**
     * 
     * @param {CustomEvent} event 
     */
    updateButtonData(event) {
        /** @type {string} */
        this.apiCategoryName = event.detail.apiCategoryName;

        this.disabled = false;
    }
    
    /**
     * Handles the button click.
     */
    handleClick() {
        globals.homebrewBank.addNewHomebrew(ApiObjectInfo.getDefault(), this.apiCategoryName);
        globals.homebrewBank.save();

        document.dispatchEvent(new Event("newHomebrewCreated"));
    }
}

customElements.define('new-homebrew-object-button', NewHomebrewButton, { extends: 'button' });