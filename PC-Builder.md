---
layout: page
title: PC Builder
permalink: /pc-builder/
---

<section>
    <details>
        <summary>
            <h2>Info</h2>
        </summary>
        <p>
            Op deze pagina kun je je eigen <abbr title="Player Character">PC</abbr> maken zoals je dit ook op een papieren character sheet zou doen. Aangezien deze "character sheet" niet op fysiek papier is, kunnen we gebruik maken van technieken om de ervaring wat te stroomlijnen. Zo worden de skills van je karakter op deze pagina automatisch uitgerekend op basis van je ability scores, level, en proficiency/ expertise. Daarnaast heb je op het internet veel meer ruimte om dingen op te slaan dan een paar stukken A4 papier.
        </p>
        <p>
            Hieronder wordt wat dieper in gegaan op een paar specificaties van deze pagina. Door deze te lezen begrijp je mogelijk beter wat het idee achter de pagina is en wat de mogelijke uitbreidingen en limitaties zijn.
        </p>
        <h3>localStorage</h3>
        <p>
            Voor het opslaan van de data op deze pagina wordt <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank">localStorage</a> gebruikt. Dit is een techniek waarmee data lokaal in de client opgeslagen kan worden. Dit zorgt er in de praktijk voor dat iedereen die deze pagina bezoekt een unieke set aan data heeft, en dat de data die jij op deze pagina ziet alleen voor jou beschikbaar is. Dit zorgt er ook voor dat de data op jouw computer anders is dan bijvoorbeeld op je telefoon. Er zijn plannen om een export-import functionaliteit te maken waardoor je data over meerdere machines beschikbaar kunt stellen.
        </p>
        <h3>DnD API</h3>
        <p>
            Voor class, race, background, en alignment wordt de <a href="https://www.dnd5eapi.co/" target="_blank">DnD 5e API</a> gebruikt. Deze API bevat alle gratis content van D&D 5e, <a href="https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf" target="_blank">de <abbr title="Systems Reference Document">SRD</abbr></a>. Dit is een subset van het <abbr title="Player's Handbook">PHB</abbr>, wat inhoud dat niet alle content hier beschikbaar is (dit bevat bijvoorbeeld maar 1 background). Er zijn op dit moment geen plannen om dit uit te breiden, omdat je dan met copyright law bezig bent.
        </p>
        <h3>Geplande componenten</h3>
        <p>
            Naast de componenten die je al op deze pagina ziet, zijn er plannen voor uitbreidingen. Hieronder zie je een lijst met een aantal geplande onderdelen. Als je zelf voorstellen hebt over uitbreidingen, hoor ik dit graag.
        </p>
        <ul>
            <li>HP, AC, initiative, en speed</li>
            <li>Saving throws</li>
            <li>Spell casting</li>
            <li>Talen</li>
            <li>
                Inventory, onderverdeeld in
                <ul>
                    <li>Magische items</li>
                    <li>Potions</li>
                    <li>Goud</li>
                    <li>Misc</li>
                </ul>
            </li>
            <li>
                Proficiencies in items
            </li>
        </ul>
    </details>
</section>

<section>
    <button is="manage-characters-button"></button>
</section>

<section>
    <h2>Algemeen</h2>
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
    <dialog is="manage-characters-dialog"></dialog>
    <dialog is="character-import-dialog"></dialog>
    <dialog is="character-export-dialog"></dialog>
    <dialog is="character-delete-dialog"></dialog>
</div>

<script type="module">
    import { loadPage } from "{{ '/assets/js/player-character/load-page.js' | relative_url }}";
    loadPage();
</script>

<script type="module" src="{{ '/assets/js/player-character/import-custom-elements.js' | relative_url }}"></script>