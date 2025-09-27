import { IHomebrewRepository } from "../interfaces/IHomebrewRepository.js";
import { IStorageService } from "../interfaces/IStorageService.js";
import { BaseResource } from "../types/domain/wrappers/BaseResource.js";

/**
 * Implementation of IHomebrewRepository to store and manage homebrew resources.
 */
export class HomebrewRepository implements IHomebrewRepository {

    /**
     * Prefix for all homebrew resource keys to avoid collisions in storage.
     */
    private static readonly HOMEBREW_PREFIX = "homebrew_";

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
    public get<T extends BaseResource>(id: string): T | undefined {
        const storageKey = this.getStorageKey(id);
        return this.storageService.get(storageKey);
    }

    /**
     * @inheritdoc
     */
    public save<T extends BaseResource>(id: string, value: T): void {
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
    public getAll(): BaseResource[] {
        const allKeys = this.storageService.getAllKeys();
        const allKeysWithPrefix = allKeys.filter(key => key.startsWith(HomebrewRepository.HOMEBREW_PREFIX));

        return allKeysWithPrefix.map(key => this.storageService.get<BaseResource>(key)) as BaseResource[];
    }

    /**
     * @inheritdoc
     */
    public getAllByResourceType<T extends BaseResource>(resourceType: string): T[] {
        const allResources = this.getAll();
        return allResources.filter((item): item is T => item.resourceType === resourceType);
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