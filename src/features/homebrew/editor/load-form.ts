import {
	homebrewRepository,
	raceRepository,
	subclassRepository,
} from '../../../wiring/dependencies.js';
import { RaceForm } from './components/forms/RaceForm.js';
import { SubclassForm } from './components/forms/SubclassForm.js';

// This file is used to load the homebrew form based on the active homebrew entry.
// It checks the apiCategoryName of the active homebrew entry and loads the appropriate form.
// The active homebrew entry is stored in globals.activeHomebrewEntry and is based on the UUID in the URL.

const pageContent = document.getElementsByClassName('post-content')[0];

const params = new URLSearchParams(window.location.search);
const id = params.get('id')!;
const homebrewResource = homebrewRepository.get(id)!;

(async () => {
	let form;
	switch (homebrewResource.resourceType) {
		case 'races':
			const race = await raceRepository.getAsync(homebrewResource.id);
			form = new RaceForm(race!);
			break;
		case 'subclasses':
			const subclass = await subclassRepository.getAsync(homebrewResource.id);
			form = new SubclassForm(subclass!);
			break;
		default:
			throw new Error(
				`No form available for resource type ${homebrewResource.resourceType}`,
			);
	}

	pageContent.appendChild(form);
})();
