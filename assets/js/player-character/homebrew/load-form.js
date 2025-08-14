import { ApiCategory } from "../api.js";
import { globals } from "../load-globals.js";
import { RaceForm } from "./objects/custom-elements/specific-forms/RaceForm.js";

// This file is used to load the homebrew form based on the active homebrew entry.
// It checks the apiCategoryName of the active homebrew entry and loads the appropriate form.
// The active homebrew entry is stored in globals.activeHomebrewEntry and is based on the UUID in the URL.

const pageContent = document.getElementsByClassName("post-content")[0];

if (globals.activeHomebrewEntry.apiCategoryName === ApiCategory.Races.name) {
    pageContent.appendChild(new RaceForm(globals.activeHomebrewEntry.homebrewObject));
}
