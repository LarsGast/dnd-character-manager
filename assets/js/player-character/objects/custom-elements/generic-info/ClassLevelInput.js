import { getEmptyOption, getSelectOption } from "../../../util.js";
import { Class } from "../../api/resources/Class.js";

/**
 * Custom list item element that represents a class-level input.
 * Extends the built-in HTMLLIElement.
 *
 * This element contains:
 * - A select to choose a class.
 * - A numeric input to set the level (between 1 and 20).
 * - A button to remove the current class entry.
 *
 * It dispatches events when the class changes, the level changes, or when the entry is deleted.
 */
export class ClassLevelInput extends HTMLLIElement {

    /**
     * Creates a new ClassLevelInput element.
     * @param {string} classIndex The currently selected class index.
     * @param {number} level The current class level.
     */
    constructor(classIndex, level) {
        super();

        // Store current class and level values.
        this.classIndex = classIndex;
        this.level = level;
        
        // Create a select element for choosing a class.
        this.classSelect = document.createElement("select");

        // Create an input element for entering the level.
        this.levelInput = document.createElement("input");
        this.levelInput.type = "number";
        this.levelInput.min = "1";
        this.levelInput.max = "20";
        this.levelInput.value = 1;

        // Create a button to allow removal of the class entry.
        this.deleteButton = document.createElement("button");
        this.deleteButton.type = "button";
        this.deleteButton.textContent = "Remove class";
        
        // Append elements to the list item.
        this.appendChild(this.classSelect);
        this.appendChild(this.levelInput);
        this.appendChild(this.deleteButton);

        // Bind event handlers.
        this.classSelect.onchange = () => this.handleClassChange();
        this.levelInput.onchange = () => this.handleLevelChange();
        this.deleteButton.onclick = () => this.handleDelete();
    }

    /**
     * Called when the element is connected to the DOM.
     * Loads class options into the classSelect element.
     */
    async connectedCallback() {
        await this.loadOptions();
    }

    /**
     * Loads class options asynchronously.
     * Populates the select element with class options including an empty option.
     */
    async loadOptions() {

        // Add an empty option first.
        this.classSelect.appendChild(getEmptyOption());

        // Retrieve all available classes.
        const allClasses = await Class.getAllAsync();
        allClasses.results.forEach((classObject) => {
            this.classSelect.appendChild(getSelectOption(classObject.name, classObject.index));
        });
        
        // Set the current values, if already provided.
        this.classSelect.value = this.classIndex ?? null;
        this.levelInput.value = this.level ?? 1;
    }
  
    /**
     * Event handler for when the class selection changes.
     * Dispatches a "classChanged" event.
     */
    handleClassChange() {
        document.dispatchEvent(new Event("classChanged"));
    }

    /**
     * Event handler for when the level input changes.
     * Ensures the level is within range, then dispatches a "classLevelChanged" event.
     */
    handleLevelChange() {
        if (this.levelInput.value > 20) {
            this.levelInput.value = 20;
        }
        if (this.levelInput.value < 1) {
            this.levelInput.value = 1;
        }

        document.dispatchEvent(new Event("classLevelChanged"));
    }

    /**
     * Event handler for deleting the class level input.
     * Removes the element and dispatches a "classDeleted" event.
     */
    handleDelete() {
        this.remove();
        document.dispatchEvent(new Event("classDeleted"));
    }
}

// Register the custom element, extending the "li" element.
customElements.define("class-level-input", ClassLevelInput, { extends: 'li' });