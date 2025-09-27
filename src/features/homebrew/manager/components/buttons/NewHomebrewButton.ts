import { BaseResource } from "../../../../../types/domain/wrappers/BaseResource.js";
import { homebrewRepository } from "../../../../../wiring/dependencies.js";

export class NewHomebrewButton extends HTMLButtonElement {
    _updateHandler?: (event: any) => void;
    apiCategoryName?: string;
    
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
    connectedCallback(): void {
        this._updateHandler = (event) => this.updateButtonData(event);
        document.addEventListener("customElementTypeChanged", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes the event listener.
     */
    disconnectedCallback(): void {
        document.removeEventListener("customElementTypeChanged", this._updateHandler!);
    }

    /**
     * 
     * @param event 
     */
    updateButtonData(event: CustomEvent): void {
        this.apiCategoryName = event.detail.apiCategoryName;
        this.disabled = false;
    }
    
    /**
     * Handles the button click.
     */
    handleClick(): void {

        const newHomebrewResource: BaseResource = {
            index: self.crypto.randomUUID(),
            name: "New Custom Object",
            resourceType: this.apiCategoryName!,
            isHomebrew: true
        };

        homebrewRepository.save(newHomebrewResource.index, newHomebrewResource);

        document.dispatchEvent(new Event("newHomebrewCreated"));
    }
}

customElements.define('new-homebrew-object-button', NewHomebrewButton, { extends: 'button' });