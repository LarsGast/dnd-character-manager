import { ApiCategory } from "../../../services/api.js";
import { globals } from "../../../store/load-globals.js";
import { RaceApiDto } from "../../../types/api/resources/RaceApiDto.js";
import { TraitApiDto } from "../../../types/api/resources/TraitApiDto.js";
import { RaceForm } from "./components/forms/RaceForm.js";
import { TraitForm } from "./components/forms/TraitForm.js";

// This file is used to load the homebrew form based on the active homebrew entry.
// It checks the apiCategoryName of the active homebrew entry and loads the appropriate form.
// The active homebrew entry is stored in globals.activeHomebrewEntry and is based on the UUID in the URL.

const pageContent = document.getElementsByClassName("post-content")[0];

let form;
switch (globals.activeHomebrewEntry.apiCategoryName) {
    case ApiCategory.Races.name:
        form = new RaceForm(globals.activeHomebrewEntry.homebrewObject as RaceApiDto);
        break;
    case ApiCategory.Traits.name:
        form = new TraitForm(globals.activeHomebrewEntry.homebrewObject as TraitApiDto);
        break;
    default:
        throw new Error(`No form available for API category ${globals.activeHomebrewEntry.apiCategoryName}`);
}

pageContent.appendChild(form);