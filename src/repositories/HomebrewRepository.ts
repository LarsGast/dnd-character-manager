import { IHomebrewRepository } from '../interfaces/IHomebrewRepository';
import { IStorageService } from '../interfaces/IStorageService';
import { ResourceTypeRecord } from '../types/storage/helpers/ResourceTypeRecord';
import { BaseResourceRecord } from '../types/storage/wrappers/BaseResourceRecord';

/**
 * Implementation of IHomebrewRepository to store and manage homebrew resources.
 */
export class HomebrewRepository implements IHomebrewRepository {
	/**
	 * Prefix for all homebrew resource keys to avoid collisions in storage.
	 */
	private static readonly HOMEBREW_PREFIX = 'homebrew_';

	/**
	 * Storage service where the homebrew resources are stored in.
	 */
	private readonly storageService: IStorageService;

	public constructor(storageService: IStorageService) {
		this.storageService = storageService;
	}

	/**
	 * @inheritdoc
	 */
	public get<T extends BaseResourceRecord>(id: string): T | undefined {
		const storageKey = this.getStorageKey(id);
		return this.storageService.get(storageKey);
	}

	/**
	 * @inheritdoc
	 */
	public save<T extends BaseResourceRecord>(id: string, value: T): void {
		const storageKey = this.getStorageKey(id);
		this.storageService.set(storageKey, value);
	}

	/**
	 * @inheritdoc
	 */
	public delete(id: string): void {
		const storageKey = this.getStorageKey(id);
		this.storageService.delete(storageKey);
	}

	/**
	 * @inheritdoc
	 */
	public getAll(): BaseResourceRecord[] {
		const allKeys = this.storageService.getAllKeys();
		const allKeysWithPrefix = allKeys.filter((key) =>
			key.startsWith(HomebrewRepository.HOMEBREW_PREFIX),
		);

		return allKeysWithPrefix.map((key) =>
			this.storageService.get<BaseResourceRecord>(key),
		) as BaseResourceRecord[];
	}

	/**
	 * @inheritdoc
	 */
	public getAllByResourceType<T extends BaseResourceRecord>(
		resourceType: ResourceTypeRecord,
	): T[] {
		const allResources = this.getAll();
		return allResources.filter(
			(item): item is T => item.resourceType === resourceType,
		);
	}

	/**
	 * Generate a homebrew repo key with prefix to avoid collisions.
	 * @param key The key to be used for storage.
	 * @returns The full storage key with prefix.
	 */
	private getStorageKey(key: string): string {
		return `${HomebrewRepository.HOMEBREW_PREFIX}${key}`;
	}
}
