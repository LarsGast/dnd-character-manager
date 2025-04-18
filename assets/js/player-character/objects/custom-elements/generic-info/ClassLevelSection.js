import { globalPlayerCharacter } from "../../PlayerCharacter.js";
import { ClassLevelInput } from "./ClassLevelInput.js";

/**
 * Custom element representing a section for managing classes and levels.
 * Extends the built-in HTMLElement.
 *
 * This section includes:
 * - A button to add new class entries.
 * - A list of ClassLevelInput elements representing each class & level.
 *
 * It listens for changes (add, update, delete) and updates the global PC's classes accordingly by dispatching a "classesChanged" event.
 */
export class ClassLevelSection extends HTMLElement {
    
    constructor() {
        super();
        
        // Create a button to add a new class level input.
        this.addClassButton = document.createElement('button');
        this.addClassButton.type = 'button';
        this.addClassButton.textContent = 'Add class';
        this.addClassButton.onclick = () => this.onAddClassButtonClick();

        // Create an unordered list to hold class level inputs.
        this.classLevelList = document.createElement('ul');

        // Append the add button and list into the element.
        this.appendChild(this.addClassButton);
        this.appendChild(this.classLevelList);
    }

    /**
     * Called when the element is connected to the DOM.
     * Loads existing class levels from the global player's data if available, otherwise creates a default ClassLevelInput.
     * Registers event listeners to track changes.
     */
    connectedCallback() {
        if (globalPlayerCharacter.classes.length > 0) {
            for (const classLevel of globalPlayerCharacter.classes) {
                const classLevelInput = new ClassLevelInput(classLevel.index, classLevel.subclass, classLevel.level);
                this.classLevelList.appendChild(classLevelInput);
            }
        } 
        else {
            // No classes defined: provide an initial empty input.
            this.classLevelList.appendChild(new ClassLevelInput());
        }

        // Register event listeners to handle any changes in class entries.
        this._updateHandler = () => this.saveClasses();
        document.addEventListener("classAdded", this._updateHandler);
        document.addEventListener("classChanged", this._updateHandler);
        document.addEventListener("subclassChanged", this._updateHandler);
        document.addEventListener("classLevelChanged", this._updateHandler);
        document.addEventListener("classDeleted", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes event listeners to prevent memory leaks.
     */
    disconnectedCallback() {
        document.removeEventListener("classAdded", this._updateHandler);
        document.removeEventListener("classChanged", this._updateHandler);
        document.removeEventListener("subclassChanged", this._updateHandler);
        document.removeEventListener("classLevelChanged", this._updateHandler);
        document.removeEventListener("classDeleted", this._updateHandler);
    }

    /**
     * Event handler for the "Add class" button.
     * Creates and appends a new ClassLevelInput element and dispatches a "classAdded" event.
     */
    onAddClassButtonClick() {
        this.classLevelList.appendChild(new ClassLevelInput());
        document.dispatchEvent(new Event("classAdded"));
    }

    /**
     * Aggregates all class level inputs, updates the global player's classes, and dispatches a "classesChanged" event.
     */
    saveClasses() {
        let classes = [];

        // Loop through each ClassLevelInput element in the list.
        this.classLevelList.childNodes.forEach((el) => {
            const selects = el.querySelectorAll("select");
            const input = el.querySelector("input");
            classes.push({
                index: selects[0].value,
                subclass: selects[1].value,
                level: parseInt(input.value)
            });
        });
        
        // Save the updated classes to the global player character.
        globalPlayerCharacter.setProperty('classes', classes);
        document.dispatchEvent(new Event("classesChanged"));
    }
}

// Define the custom element.
customElements.define('class-level-section', ClassLevelSection);