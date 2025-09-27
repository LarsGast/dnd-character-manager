/**
 * Interface for a storage service.
 * Used for storing objects in database, localStorage, etc.
 */
export interface IStorageService {
	/**
	 * Get a value from storage.
	 * @param key Identifier of the stored value.
	 * @returns undefined if no value exists in storage with given key.
	 */
	get<T>(key: string): T | undefined;

	/**
	 * Add a value to storage.
	 * @param key Identifier of the stored value.
	 * @param data The value to store.
	 */
	set<T>(key: string, value: T): void;

	/**
	 * Delete a value from storage.
	 * @param key Identifier of the stored value.
	 */
	delete(key: string): void;

	/**
	 * Get all keys from storage.
	 * Useful for getting multiple values at once.
	 * @returns List of all identifier keys in storage.
	 */
	getAllKeys(): string[];
}
