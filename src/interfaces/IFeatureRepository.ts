import { Feature } from '../types/domain/resources/Feature';
import { ResourceList } from '../types/domain/wrappers/ResourceList';
import { IResourceRepository } from './IResourceRepository';

export interface IFeatureRepository extends IResourceRepository<Feature> {
	/**
	 * Get all features for the given class and level.
	 * @param classId Identifier of the class.
	 * @param level Level of the features to get.
	 * @returns All features for the given class and level.
	 */
	getFeaturesByClassAndLevelAsync(
		classId: string,
		level: number,
	): Promise<ResourceList>;

	/**
	 * Get all features for the given subclass and level.
	 * @param subclassId Identifier of the subclass.
	 * @param level Level of the features to get.
	 * @returns All features for the given subclass and level.
	 */
	getFeaturesBySubclassAndLevelAsync(
		subclassId: string,
		level: number,
	): Promise<ResourceList>;

	/**
	 * Get all features for the given subclass.
	 * @param subclassId Identifier of the subclass.
	 * @returns All features for the given subclass.
	 */
	getAllFeaturesForSubclassAsync(subclassId: string): Promise<ResourceList>;
}
