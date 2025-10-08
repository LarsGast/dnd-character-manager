import {
	BaseResourceRecord,
	HOMEBREW_RESOURCE_RECORD_VERSION,
} from '../types/storage/wrappers/BaseResourceRecord';

/**
 * Upgrades all homebrew resources in localStorage to the latest version.
 */
export function upgradeHomebrewResources(): void {
	Object.keys(localStorage).forEach((key) => {
		if (key.startsWith('homebrew_')) {
			const item = localStorage.getItem(key);
			if (item) {
				try {
					const parsed = JSON.parse(item);
					if (
						parsed.version === undefined ||
						parsed.version < HOMEBREW_RESOURCE_RECORD_VERSION
					) {
						const updated = upgradeHomebrewResource(parsed);
						localStorage.setItem(key, JSON.stringify(updated));
					}
				} catch (error) {
					console.error(`Error parsing ${key}:`, error);
				}
			}
		}
	});
}

/**
 * Upgrades a homebrew resource to the latest version.
 * @param resource The resource object to upgrade.
 * @returns The upgraded resource object.
 */
export function upgradeHomebrewResource(resource: any): BaseResourceRecord {
	// v0 -> v1: Rename "index" to "id".
	if (resource.version === undefined) {
		resource.version = 1;
		resource = renameIndexToId(resource);
	}

	return resource;
}

/**
 * Recursively renames "index" to "id" in any object or array.
 * @param obj The object to rename keys in.
 * @returns The object with renamed keys.
 */
function renameIndexToId(obj: any): any {
	if (Array.isArray(obj)) {
		return obj.map(renameIndexToId);
	} else if (obj && typeof obj === 'object') {
		const newObj: any = {};
		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				const newKey = key === 'index' ? 'id' : key;
				newObj[newKey] = renameIndexToId(obj[key]);
			}
		}
		return newObj;
	}
	return obj;
}
