import { globals } from "../../../../../store/load-globals.js";
import { ApiObjectInfo } from "../../../../../types/api/wrappers/ApiObjectInfo.js";
import { getTextInputSection } from '../../services/FormElementsBuilder.js';

/**
 * Base class for homebrew object forms.
 * This class provides common functionality for homebrew object forms, such as handling form submission and saving data.
 * Inherit from this class to create specific homebrew object forms.
 */
export class HomebrewBaseForm extends HTMLFormElement {
    
    /**
     * Creates an instance of HomebrewBaseForm.
     * @param homebrewObject 
     */
    constructor(homebrewObject: ApiObjectInfo) {
        super();

        // "Name" is the only required field for all homebrew objects.
        this.appendChild(getTextInputSection("Name", "name", homebrewObject.name, true, "Name of the homebrew object."));    
    }

    /**
     * Called when the form is connected to the DOM.
     */
    connectedCallback(): void {
        this.addEventListener("submit", this.handleSubmitAsync.bind(this));

        // Add the save button on the bottom of the form.
        this.appendChild(this.getSaveButton());
    }

    /**
     * Handles the form submission.
     * Prevents the default form submission behavior, collects the form data, updates the active homebrew entry, saves the homebrew bank, and reloads the page.
     * Override this method in subclasses to add additional functionality.
     * @param event 
     */
    async handleSubmitAsync(event: Event): Promise<void> {
        event.preventDefault();

        const data = await this.getFormDataAsync();

        globals.activeHomebrewEntry.homebrewObject = data;
        globals.homebrewBank.save();

        window.location.reload();
    }

    /**
     * Collects the form data and returns it as an ApiObjectInfo instance.
     * Override this method in subclasses to add additional fields.
     * @returns Homebrew object data collected from the form.
     */
    async getFormDataAsync(): Promise<ApiObjectInfo> {
        const formData = new FormData(this);

        // Initialize a new ApiObjectInfo instance with the current homebrew object to keep the UUID the same.
        const data = new ApiObjectInfo(globals.activeHomebrewEntry.homebrewObject);

        // Overwrite the properties of the ApiObjectInfo instance with the form data.
        for (const [key, value] of formData) {
            (data as any)[key] = value;
        }
        
        return Promise.resolve(data);
    }

    /**
     * Creates and returns a save button element.
     * @returns Save button element.
     */
    getSaveButton(): HTMLButtonElement {
        const button = document.createElement('button');

        button.type = 'submit';
        button.textContent = 'Save';

        return button;
    }
}

customElements.define('homebrew-object-base-form', HomebrewBaseForm, { extends: 'form' });