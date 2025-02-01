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
            <li>Import-export functionaliteit voor de data</li>
            <li>HP, AC, initiative, en speed</li>
            <li>Saving throws</li>
            <li>Race features</li>
            <li>Class features</li>
            <li>Spell casting</li>
            <li>Talen</li>
            <li>
                Inventory, onderverdeeld in
                <ul>
                    <li>Wapens</li>
                    <li>Armor</li>
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

<section id="generic-info-container">
    <h2>Algemeen</h2>
    <ul>
        <li><label>Name: <input id="name_i"/></label></li>
        <li>
            <label>Class & Level: </label><button id="class-and-level_b" type="button">Add class</button>
            <ul id="class-and-level-list"></ul>
        </li>
        <li><label>Race: <select id="race_s"></select></label></li>
        <li><label>Background: <select id="background_s"></select></label></li>
        <li><label>Alignment: <select id="alignment_s"></select></label></li>
    </ul>
</section>

<section id="ability-scores-container">
    <h2>Ability Scores</h2>
    <ul class="no-style-list" id="ability-scores-list">
    <li id="strength">
            <span>STR</span>
            <span id="strength_m"></span>
            <input id="strength_i" type="number" min="1" max="30"/>
        </li>
        <li id="dexterity">
            <span>DEX</span>
            <span id="dexterity_m"></span>
            <input id="dexterity_i" type="number" min="1" max="30"/>
        </li>
        <li id="constitution">
            <span>CON</span>
            <span id="constitution_m"></span>
            <input id="constitution_i" type="number" min="1" max="30"/>
        </li>
        <li id="intelligence">
            <span>INT</span>
            <span id="intelligence_m"></span>
            <input id="intelligence_i" type="number" min="1" max="30"/>
        </li>
        <li id="wisdom">
            <span>WIS</span>
            <span id="wisdom_m"></span>
            <input id="wisdom_i" type="number" min="1" max="30"/>
        </li>
        <li id="charisma">
            <span>CHA</span>
            <span id="charisma_m"></span>
            <input id="charisma_i" type="number" min="1" max="30"/>
        </li>
    </ul>
</section>

<section id="skills-container">
    <h2>Skills</h2>
    <ul class="no-style-list proficiencies-list three-columns-list" id="skills-list"></ul>
</section>

<section id="equipment-proficiencies-container">
    <details>
        <summary><h2>Equipment proficiencies</h2></summary>
        <details>
            <summary><h3>Weapons</h3></summary>
            <div id="weapon-proficiencies-container"></div>
        </details>
        <details>
            <summary><h3>Armor</h3></summary>
            <div id="armor-proficiencies-container"></div>
        </details>
    </details>
</section>

<section id="notes-container">
    <h2>Notes</h2>
    <textarea id="notes"></textarea>
</section>

<script type="module">
    import { buildPage } from "{{ '/assets/js/player-character/build/build-page.js' | relative_url }}";
    import { initPage } from "{{ '/assets/js/player-character/init/init-page.js' | relative_url }}";

    window.skills = {{ site.data.skills | jsonify }};

    await buildPage();
    initPage();
</script>