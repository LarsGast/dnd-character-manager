import { getPlayerCharacterProperty } from "../../../local-storage-util.js";
import { getAllClassNamesAsync } from "../../api.js"
import { getEmptyOption, getSelectOption, limitClassLevel, updateAllSkillModifiers, updateClasses } from "../../util.js";

/**
 * Init the class and level property.
 */
export const initClassAndLevel = function() {
    initAddClassButton();
    initClassSelection();
}

/**
 * Init the "Add class" button.
 */
const initAddClassButton = function() {

    const button = document.getElementById('class-and-level_b');

    button.onclick = async function() {
        const classList = document.getElementById('class-and-level-list');

        classList.appendChild(await getClassListItem());

        changeClassSelect();
        changeLevelInput()
    }
}

/**
 * Get an li element for the class-and-level list.
 * @returns {HTMLLIElement}
 */
const getClassListItem = async function() {
    const li = document.createElement('li');

    li.appendChild(await getClassSelect());
    li.appendChild(getClassLevelInput());
    li.appendChild(getRemoveClassButton());

    return li;
}

/**
 * Get a select element for the class-and-level list.
 * @returns {HTMLSelectElement}
 */
const getClassSelect = async function() {
    const allClassNames = await getAllClassNamesAsync();

    const select = document.createElement('select');

    select.appendChild(getEmptyOption());

    allClassNames.forEach(className => {
        select.appendChild(getSelectOption(className));
    });

    select.onchange = function() {
        changeClassSelect();
    }

    return select;
}

/**
 * Get an input element for the class-and-level list.
 * @returns {HTMLInputElement}
 */
const getClassLevelInput = function() {
    const input = document.createElement('input');

    input.type = "number";
    input.min = "1";
    input.max = "20";
    input.value = "1";

    input.onchange = function() {
        changeLevelInput();
    }

    return input;
}

/**
 * Get a button element for removing a class.
 * @returns 
 */
const getRemoveClassButton = function() {
    const button = document.createElement('button');

    button.type = "button";
    button.textContent = "Remove class";

    button.onclick = function() {
        const parent = this.parentElement;
        parent.remove();

        changeClassSelect();
        changeLevelInput();
    }

    return button;
}

/**
 * Build the class selection section to include local storage.
 */
const initClassSelection = function() {
    const classes = getPlayerCharacterProperty("classes");
    const addClassButton = document.getElementById('class-and-level_b');

    if (classes === null || classes.length === 0){
        addClassButton.onclick();
        return;
    }

    classes.forEach(async classObject => {
        
        const classList = document.getElementById('class-and-level-list');
        classList.appendChild(await getClassListItem());

        const li = classList.lastChild;

        const select = li.getElementsByTagName('select')[0];
        select.value = classObject.name;

        const input = li.getElementsByTagName('input')[0];
        input.value = classObject.level;
    });
}

/**
 * Handle the change of a class select element.
 */
const changeClassSelect = function() {
    updateClasses();
}

/**
 * Handle the change of a class level input.
 */
const changeLevelInput = function() {
    limitClassLevel();
    updateClasses();
    updateAllSkillModifiers();
}