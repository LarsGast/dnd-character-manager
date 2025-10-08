import { IStorageService } from '../interfaces/IStorageService';

/**
 * Implementation of IStorageService to store objects in localStorage.
 */
export class LocalStorageService implements IStorageService {
	/**
	 * @inheritdoc
	 */
	get<T>(key: string): T | undefined {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : undefined;
	}

	/**
	 * @inheritdoc
	 */
	set<T>(key: string, value: T): void {
		localStorage.setItem(key, JSON.stringify(value));
	}

	/**
	 * @inheritdoc
	 */
	delete(key: string): void {
		localStorage.removeItem(key);
	}

	/**
	 * @inheritdoc
	 */
	getAllKeys(): string[] {
		const keys: string[] = [];
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key) keys.push(key);
		}
		return keys;
	}
}
