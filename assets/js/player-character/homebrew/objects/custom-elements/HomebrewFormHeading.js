import { ApiCategory } from "../../../api.js";
import { globals } from "../../../load-globals.js";

/**
 * Custom heading element for homebrew forms.
 * This element displays the title of the form based on the active homebrew entry's API category.
 * 
 * Extends <h2>.
 */
export class HomebrewFormHeading extends HTMLHeadingElement {
    
    constructor() {
        super();
        
        this.textContent = `Custom ${new ApiCategory(globals.activeHomebrewEntry.apiCategoryName).getSingularName()}`;
    }
}

customElements.define('homebrew-object-form-heading', HomebrewFormHeading, { extends: 'h2' });