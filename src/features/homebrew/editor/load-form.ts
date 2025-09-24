import { Race } from "../../../types/domain/resources/Race.js";
import { Trait } from "../../../types/domain/resources/Trait.js";
import { homebrewRepository } from "../../../wiring/dependencies.js";
import { RaceForm } from "./components/forms/RaceForm.js";
import { TraitForm } from "./components/forms/TraitForm.js";

// This file is used to load the homebrew form based on the active homebrew entry.
// It checks the apiCategoryName of the active homebrew entry and loads the appropriate form.
// The active homebrew entry is stored in globals.activeHomebrewEntry and is based on the UUID in the URL.

const pageContent = document.getElementsByClassName("post-content")[0];

const params = new URLSearchParams(window.location.search);
const id = params.get('id')!;
const homebrewResource = homebrewRepository.get(id)!;

let form;
switch (homebrewResource.resourceType) {
    case "races":
        form = new RaceForm(homebrewResource as Race);
        break;
    case "traits":
        form = new TraitForm(homebrewResource as Trait);
        break;
    default:
        throw new Error(`No form available for resource type ${homebrewResource.resourceType}`);
}

pageContent.appendChild(form);