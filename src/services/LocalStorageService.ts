import { IStorageService } from '../interfaces/IStorageService';

/**
 * Implementation of IStorageService to store objects in localStorage.
 */
export class LocalStorageService implements IStorageService {
	/**
	 * The underlying Storage object (e.g., localStorage or sessionStorage).
	 */
	private readonly storage: Storage;

	public constructor(storage: Storage) {
		this.storage = storage;
	}

	/**
	 * @inheritdoc
	 */
	get<T>(key: string): T | undefined {
		const value = this.storage.getItem(key);
		return value ? JSON.parse(value) : undefined;
	}

	/**
	 * @inheritdoc
	 */
	set<T>(key: string, value: T): void {
		this.storage.setItem(key, JSON.stringify(value));
	}

	/**
	 * @inheritdoc
	 */
	delete(key: string): void {
		this.storage.removeItem(key);
	}

	/**
	 * @inheritdoc
	 */
	getAllKeys(): string[] {
		const keys: string[] = [];
		for (let i = 0; i < this.storage.length; i++) {
			const key = this.storage.key(i);
			if (key) keys.push(key);
		}
		return keys;
	}
}
