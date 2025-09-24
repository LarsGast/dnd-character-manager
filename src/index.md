---
layout: page
title: DnD Character Manager
---

<section>
    <details>
        <summary>
            <h2>Info</h2>
        </summary>
        <p>
            On this page, you can create your own DnD character like you would on a normal paper character sheet. Since this digital "character sheet" is not on physical paper, we can make use of techniques to streamline the experience. As an example, skill modifiers on this page will be automatically calculated based on your character's ability scores, level (proficiency bonus), and proficiency/ expertise in the skill. Besides this, a digital page allows you to store a lot more information than a couple of A4 paper sheets. 
        </p>
        <p>
            We will go into more depth of the specifications and limitations of this page below.
        </p>
        <h3>localStorage</h3>
        <p>
            In order to save the data of this page, we use <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank">localStorage</a>. This allows us to store data locally in the browser. This way, everyone who visits this website will have their own unique set of data, and this data is available for the owner alone. In fact, every browser has their own unique data, which means that if you've made a character in Google Chrome, that character won't automatically be available in Firefox. For this reason, the page supports the exporting and importing of data.
        </p>
        <h3>DnD 5e <abbr title="Systems Reference Document">SRD</abbr> API</h3>
        <p>
            You build your character by assigning a race, class, background, alignment, etc. to it. In order to give you the best experience, all the data available in <a href="https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf" target="_blank">the <abbr title="Systems Reference Document">SRD</abbr></a> is available on this page. The <abbr title="Systems Reference Document">SRD</abbr> includes all the rules that <abbr title="Wizards of the Coast">WOTC</abbr> has made freely available. For this, we use the <a href="https://www.dnd5eapi.co/" target="_blank">DnD 5e API</a>, which provides all the data. If you notice mistakes in the <abbr title="Systems Reference Document">SRD</abbr> data, you can contribute to that project. I do not own or manage this project.
        </p>
        <h3>Data not in the <abbr title="Systems Reference Document">SRD</abbr></h3>
        <p>
            A lot of DnD data is not present in the <abbr title="Systems Reference Document">SRD</abbr>, which means it might be difficult to build the character you want with content from, say, the Player's Handbook or your own homebrew. That's why this page contains a homebrew manager. Here, you can use the blueprint of official DnD <abbr title="Systems Reference Document">SRD</abbr> content to insert content not available in the <abbr title="Systems Reference Document">SRD</abbr>. You can use this to insert homebrew objects or official DnD content that you own. This way, you're able to create any character you want, even if it doesn't comply to the standard ruleset, just like you are able to on paper.
        </p>
        <p>
            Using official DnD content not in the <abbr title="Systems Reference Document">SRD</abbr> should only be done if you already own the content legally. We do not endorse sharing this content with anyone else.
        </p>
    </details>
</section>

<section>
    <button is="manage-characters-button"></button>
    <button is="manage-homebrew-button"></button>
</section>

<section>
    <h2>General</h2>
    <ul>
        <li><label>Name: <input is="name-input"/></label></li>
        <li>
            <label>Class & Level: </label><class-level-section></class-level-section>
        </li>
        <li><label>Race: <select is="race-input"></select></label></li>
        <li><label>Subrace: <select is="subrace-input"></select></label></li>
        <li><label>Background: <select is="background-input"></select></label></li>
        <li><label>Alignment: <select is="alignment-input"></select></label></li>
        <li>Proficiency bonus: <proficiency-bonus-display></proficiency-bonus-display></li>
    </ul>
</section>

<section>
    <h2>Ability Scores</h2>
    <ul class="no-style-list ability-scores-list">
        <li>
            <ability-score-display ability="str"></ability-score-display>
        </li>
        <li>
            <ability-score-display ability="dex"></ability-score-display>
        </li>
        <li>
            <ability-score-display ability="con"></ability-score-display>
        </li>
        <li>
            <ability-score-display ability="int"></ability-score-display>
        </li>
        <li>
            <ability-score-display ability="wis"></ability-score-display>
        </li>
        <li>
            <ability-score-display ability="cha"></ability-score-display>
        </li>
    </ul>
</section>

<section>
    <h2>Skills</h2>
    <ul is="skills-list"></ul>
</section>

<section>
    <details>
        <summary><h2>Equipment proficiencies</h2></summary>
        <details>
            <summary><h3>Weapons</h3></summary>
            <h4>Simple Melee</h4>
            <ul is="equipment-proficiencies-list" isArmor="false" equipmentCategoryIndex="simple-melee-weapons"></ul>
            <h4>Martial Melee</h4>
            <ul is="equipment-proficiencies-list" isArmor="false" equipmentCategoryIndex="martial-melee-weapons"></ul>
            <h4>Simple Ranged</h4>
            <ul is="equipment-proficiencies-list" isArmor="false" equipmentCategoryIndex="simple-ranged-weapons"></ul>
            <h4>Martial Ranged</h4>
            <ul is="equipment-proficiencies-list" isArmor="false" equipmentCategoryIndex="martial-ranged-weapons"></ul>
        </details>
        <details>
            <summary><h3>Armor</h3></summary>
            <h4>Light</h4>
            <ul is="equipment-proficiencies-list" isArmor="true" equipmentCategoryIndex="light-armor"></ul>
            <h4>Medium</h4>
            <ul is="equipment-proficiencies-list" isArmor="true" equipmentCategoryIndex="medium-armor"></ul>
            <h4>Heavy</h4>
            <ul is="equipment-proficiencies-list" isArmor="true" equipmentCategoryIndex="heavy-armor"></ul>
            <h4>Shields</h4>
            <ul is="equipment-proficiencies-list" isArmor="true" equipmentCategoryIndex="shields"></ul>
        </details>
    </details>
</section>

<section>
    <details>
        <summary><h2>Inventory</h2></summary>
        <h3>Weapons</h3>
        <inventory-weapon-add-input></inventory-weapon-add-input>
        <div class="table-container">
            <inventory-weapon-table></inventory-weapon-table>
        </div>
        <h3>Armor</h3>
        <inventory-armor-add-input></inventory-armor-add-input>
        <div class="table-container">
            <inventory-armor-table></inventory-armor-table>
        </div>
    </details>
</section>

<section>
    <details is="race-features-display"></details>
</section>

<section>
    <details is="subrace-features-display"></details>
</section>

<section>
    <details is="classes-features-display"></details>
</section>

<section>
    <h2>Notes</h2>
    <textarea is="notes-textarea"></textarea>
</section>

<div>
    <dialog is="manage-homebrew-dialog"></dialog>
    <dialog is="manage-characters-dialog"></dialog>
    <dialog is="character-import-dialog"></dialog>
    <dialog is="character-export-dialog"></dialog>
    <dialog is="character-delete-dialog"></dialog>
    <dialog is="homebrew-object-import-dialog"></dialog>
    <dialog is="homebrew-object-export-dialog"></dialog>
    <dialog is="homebrew-object-delete-dialog"></dialog>
    <dialog is="homebrew-object-import-id-already-exists-dialog"></dialog>
</div>

<script type="module" src="{{ 'store/load-globals.js' | relative_url }}"></script>

<script type="module" src="{{ 'register-components.js' | relative_url }}"></script>