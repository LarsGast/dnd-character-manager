import { globals } from "../../../load-globals.js";
import { ClassLevelInput } from "./ClassLevelInput.js";

/**
 * Custom element representing a section for managing classes and levels.
 * Extends the built-in HTMLElement.
 *
 * This section includes:
 * - A button to add new class entries.
 * - A list of ClassLevelInput elements representing each class & level.
 *
 * It listens for changes (add, update, delete) and updates the active PC's classes accordingly by dispatching a "classesChanged" event.
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
     * Loads existing class levels from the active player's data if available, otherwise creates a default ClassLevelInput.
     * Registers event listeners to track changes.
     */
    connectedCallback() {
        if (globals.activePlayerCharacter.classes.length > 0) {
            for (const classLevel of globals.activePlayerCharacter.classes) {
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
     * Aggregates all class level inputs, updates the active player's classes, and dispatches a "classesChanged" event.
     */
    saveClasses() {
        let classes = [];

        // Loop through each ClassLevelInput element in the list.
        this.classLevelList.childNodes.forEach((el) => {
            const selects = el.querySelectorAll("select");
            const input = el.querySelector("input");

            const index = selects[0].value;
            let subclass = selects[1].value;
            const level = parseInt(input.value);

            // Only save data if the user has actually chosen a class.
            if (!index || index === "null") {
                return;
            }

            // The "-- Select an option --" option has a value of "null", which we do not want to save.
            if (subclass === "null") {
                subclass = undefined;
            }

            classes.push({
                index: index,
                subclass: subclass,
                level: level
            });
        });
        
        // Save the updated classes to the active player character.
        globals.activePlayerCharacter.setProperty('classes', classes);
        document.dispatchEvent(new Event("classesChanged"));
    }
}

// Define the custom element.
customElements.define('class-level-section', ClassLevelSection);