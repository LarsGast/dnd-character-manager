import { getElementWithTextContent } from "../../../util.js";
import { globals } from "../../../load-page.js";
import { ClassFeaturesDisplay } from "./ClassFeaturesDisplay.js";

/**
 * Custom details element that displays the features of the selected class.
 * Extends HTMLDetailsElement.
 *
 * This element updates its display whenever the active PC's class information changes.
 * It contains information about each class the PC has chosen.
 */
export class ClassesFeaturesDisplay extends HTMLDetailsElement {
    constructor() {
        super();
    }
    
    /**
     * Called when the element is connected to the DOM.
     * Immediately updates the display and starts listening for class changes.
     */
    connectedCallback() {
        // Update display immediately upon being added to the DOM.
        this.updateDisplay();

        // Save a reference to the event handler so it can be removed later.
        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("classesChanged", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Cleans up the event listener.
     */
    disconnectedCallback() {
        document.removeEventListener("classesChanged", this._updateHandler);
    }

    /**
     * Asynchronously updates the class features display if an update is warranted.
     * @param {CustomEvent} event An optional event that triggers the update.
     */
    async updateDisplay(event) {
        if (this.getShouldUpdate(event)) {
            await this.updateClassFeaturesDisplay();
        }
    }

    /**
     * Determines if the display should be updated based on the triggering event.
     * @param {CustomEvent} event The event that triggered the update.
     * @returns {boolean} True if the display should update.
     */
    getShouldUpdate(event) {
        return !event || (event.type === "classesChanged");
    }

    /**
     * Asynchronously updates the display with the current selected classes.
     * Hides the element if no class is selected.
     */
    async updateClassFeaturesDisplay() {

        // If no class information is present, hide this element.
        if (!globals.activePlayerCharacter.classes || 
            globals.activePlayerCharacter.classes.length === 0 ||
            !globals.activePlayerCharacter.classes.some(classLevel => classLevel.index != 'null')
        ) {
            this.style.display = "none";
            return;
        }
        
        this.style.display = "block";
        
        // Clear any existing content in the details element.
        this.replaceChildren();

        this.appendChild(this.getSectionHeading());

        // Add the class features of each class the PC is a part of.
        for (const classLevelInfo of globals.activePlayerCharacter.classes) {
            this.appendChild(new ClassFeaturesDisplay(classLevelInfo));
        }
    }

    /**
     * Constructs and returns the section heading element.
     * @returns {HTMLElement} A summary element containing an h2 heading.
     */
    getSectionHeading() {
        const summary = document.createElement('summary');
        summary.appendChild(getElementWithTextContent("h2", "Class Features"));
        return summary;
    }
}

customElements.define('classes-features-display', ClassesFeaturesDisplay, { extends: 'details' });