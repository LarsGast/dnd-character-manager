/**
 * Performs cleanup tasks on site load, such as removing deprecated localStorage items.
 * Extend this function with additional cleanup logic as needed.
 */
function siteStartupCleanup(): void {
	// v0.3.3 -> v0.4.0: Remove deprecated "cache" item in localStorage.
	if (localStorage.getItem('cache')) {
		localStorage.removeItem('cache');
	}

	// v0.3.3 -> v0.4.0: Move homebrew data from deprecated "homebrewBank" to specific "homebrew_{ID}" keys in localStorage.
	const homebrewBank = localStorage.getItem('homebrewBank');
	if (homebrewBank) {
		try {
			const parsed = JSON.parse(homebrewBank);
			if (parsed && Array.isArray(parsed.homebrewBankEntries)) {
				parsed.homebrewBankEntries.forEach((entry: any) => {
					if (entry && entry.id && entry.homebrewObject) {
						// Set resourceType using apiCategoryName.
						entry.homebrewObject.resourceType = entry.apiCategoryName;

						// Ensure isHomebrew is true for all migrated objects.
						entry.homebrewObject.isHomebrew = true;

						// Remove races and subraces from Trait objects.
						if (entry.apiCategoryName === 'traits') {
							delete entry.homebrewObject.races;
							delete entry.homebrewObject.subraces;
						}

						// Store the homebrew object under a new key.
						const newKey = `homebrew_${entry.homebrewObject.index}`;
						localStorage.setItem(newKey, JSON.stringify(entry.homebrewObject));
					}
				});
			}

			// Remove the old homebrewBank key after migration
			localStorage.removeItem('homebrewBank');
		} catch (error) {
			console.error('Error parsing homebrewBank:', error);
		}
	}

	// v0.3.3 -> v0.4.0: rename "index" to "id" in homebrew resources.
	Object.keys(localStorage).forEach((key) => {
		if (key.startsWith('homebrew_')) {
			const item = localStorage.getItem(key);
			if (item) {
				try {
					const parsed = JSON.parse(item);
					if (parsed && parsed.index) {
						parsed.id = parsed.index;
						delete parsed.index;
						localStorage.setItem(key, JSON.stringify(parsed));
					}
				} catch (error) {
					console.error(`Error parsing ${key}:`, error);
				}
			}
		}
	});
}

// Run cleanup immediately on page load.
siteStartupCleanup();
