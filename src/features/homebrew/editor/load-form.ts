import { ResourceTypeRecord } from '../../../types/storage/helpers/ResourceTypeRecord';
import {
	homebrewRepository,
	raceRepository,
	subclassRepository,
} from '../../../wiring/dependencies';
import { RaceForm } from './components/forms/RaceForm';
import { SubclassForm } from './components/forms/SubclassForm';
import { HomebrewTypeSelect } from '../manager/components/selects/HomebrewTypeSelect';

// This file is used to load the homebrew form based on the active homebrew entry.
// It checks the apiCategoryName of the active homebrew entry and loads the appropriate form.
// The active homebrew entry is stored in globals.activeHomebrewEntry and is based on the UUID in the URL.

const pageContent = document.getElementsByClassName('post-content')[0];
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Check if we're in "new" mode (no ID) or "edit" mode (ID exists)
if (!id) {
	// NEW MODE: Show type selector and wait for user to select a type
	initializeNewMode();
} else {
	// EDIT MODE: Load existing resource and show form
	initializeEditMode(id);
}

/**
 * Initializes the page in "new" mode for creating a new homebrew resource.
 * Displays a type selector and dynamically loads the appropriate form when a type is selected.
 */
function initializeNewMode(): void {
	// Create a container for the type selector
	const typeSelectorSection = document.createElement('section');
	typeSelectorSection.className = 'homebrew-type-selector-section';

	const label = document.createElement('label');
	label.textContent = 'Object type *';
	label.htmlFor = 'homebrew-object-type-select';

	const typeSelect = new HomebrewTypeSelect();
	label.appendChild(typeSelect);
	typeSelectorSection.appendChild(label);

	// Create a container for the form that will be loaded dynamically
	const formContainer = document.createElement('div');
	formContainer.className = 'homebrew-form-container';

	pageContent.appendChild(typeSelectorSection);
	pageContent.appendChild(formContainer);

	// Listen for type selection changes
	typeSelect.addEventListener('change', async () => {
		const selectedType = Number(typeSelect.value) as ResourceTypeRecord;

		// Clear any existing form
		formContainer.innerHTML = '';

		// If a valid type is selected, create a new form with empty data
		if (!isNaN(selectedType)) {
			const form = await createNewFormForType(selectedType);
			if (form) {
				formContainer.appendChild(form);
			}
		}
	});
}

/**
 * Creates a new form for the specified resource type with default/empty values.
 * @param resourceType The type of resource to create a form for.
 * @returns The form element for the specified type, or null if unsupported.
 */
async function createNewFormForType(
	resourceType: ResourceTypeRecord,
): Promise<HTMLFormElement | null> {
	switch (resourceType) {
		case ResourceTypeRecord.Race:
			// Create a minimal race object for the form
			const newRace = {
				index: '',
				name: '',
				isHomebrew: true,
				ability_bonuses: [],
				age: '',
				alignment: '',
				size: '',
				size_description: '',
				speed: 30,
				languages: [],
				language_options: undefined,
				language_desc: '',
				traits: [],
				subraces: [],
			};
			return new RaceForm(newRace);

		case ResourceTypeRecord.Subclass:
			// Create a minimal subclass object for the form
			const newSubclass = {
				index: '',
				name: '',
				isHomebrew: true,
				desc: [],
				class: undefined,
				spells: [],
				features: [],
			};
			return new SubclassForm(newSubclass);

		default:
			throw new Error(`No form available for resource type ${resourceType}`);
	}
}

/**
 * Initializes the page in "edit" mode for editing an existing homebrew resource.
 * @param id The ID of the homebrew resource to edit.
 */
async function initializeEditMode(id: string): Promise<void> {
	const homebrewResource = homebrewRepository.get(id);

	if (!homebrewResource) {
		// Resource not found - show error message
		const errorMessage = document.createElement('p');
		errorMessage.className = 'error-message';
		errorMessage.textContent = `Homebrew resource with ID "${id}" not found.`;
		pageContent.appendChild(errorMessage);
		return;
	}

	// Show the resource type as a read-only label (not a selector)
	const typeLabel = document.createElement('section');
	typeLabel.className = 'homebrew-type-label-section';
	const label = document.createElement('label');
	label.textContent = 'Object type';
	const typeDisplay = document.createElement('input');
	typeDisplay.type = 'text';
	typeDisplay.value = getResourceTypeDisplayName(homebrewResource.resourceType);
	typeDisplay.readOnly = true;
	typeDisplay.disabled = true;
	label.appendChild(typeDisplay);
	typeLabel.appendChild(label);
	pageContent.appendChild(typeLabel);

	// Load the form for the existing resource
	let form;
	switch (homebrewResource.resourceType) {
		case ResourceTypeRecord.Race:
			const race = await raceRepository.getAsync(homebrewResource.id);
			form = new RaceForm(race!);
			break;
		case ResourceTypeRecord.Subclass:
			const subclass = await subclassRepository.getAsync(homebrewResource.id);
			form = new SubclassForm(subclass!);
			break;
		default:
			throw new Error(
				`No form available for resource type ${homebrewResource.resourceType}`,
			);
	}

	pageContent.appendChild(form);
}

/**
 * Gets a human-readable display name for a resource type.
 * @param resourceType The resource type to get a display name for.
 * @returns The human-readable display name.
 */
function getResourceTypeDisplayName(resourceType: ResourceTypeRecord): string {
	switch (resourceType) {
		case ResourceTypeRecord.Race:
			return 'Race';
		case ResourceTypeRecord.Subclass:
			return 'Subclass';
		default:
			return 'Unknown';
	}
}
