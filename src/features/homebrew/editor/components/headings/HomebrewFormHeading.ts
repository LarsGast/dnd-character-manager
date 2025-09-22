import { globals } from "../../../../../store/load-globals.js";
import { homebrewRepository } from "../../../../../wiring/dependencies.js";

/**
 * Custom heading element for homebrew forms.
 * This element displays the title of the form based on the active homebrew entry's API category.
 * 
 * Extends <h2>.
 */
export class HomebrewFormHeading extends HTMLHeadingElement {
    
    constructor() {
        super();

        const params = new URLSearchParams(window.location.search);
        const id = params.get('id')!;
        const homebrewObject = homebrewRepository.get(id)!;
        
        this.textContent = `Custom ${homebrewObject.resourceType}`;
    }
}

customElements.define('homebrew-object-form-heading', HomebrewFormHeading, { extends: 'h2' });