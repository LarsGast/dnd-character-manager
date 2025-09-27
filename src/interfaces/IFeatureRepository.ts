import { Feature } from "../types/domain/resources/Feature.js";
import { ResourceList } from "../types/domain/wrappers/ResourceList.js";
import { IResourceRepository } from "./IResourceRepository.js";

export interface IFeatureRepository extends IResourceRepository<Feature> {

    /**
     * Get all features for the given class and level.
     * @param classId Identifier of the class.
     * @param level Level of the features to get.
     * @returns All features for the given class and level.
     */
    getFeaturesByClassAndLevelAsync(classId: string, level: number): Promise<ResourceList>;

    /**
     * Get all features for the given subclass and level.
     * @param subclassId Identifier of the subclass.
     * @param level Level of the features to get.
     * @returns All features for the given subclass and level.
     */
    getFeaturesBySubclassAndLevelAsync(subclassId: string, level: number): Promise<ResourceList>;
}