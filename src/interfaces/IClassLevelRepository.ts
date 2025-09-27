import { ClassLevel } from '../types/domain/resources/ClassLevel.js';

export interface IClassLevelRepository {
	/**
	 * Get all class levels for the given class.
	 * @param classId Identifier of the class.
	 * @returns All class levels for the given class.
	 */
	getAllAsync(classId: string): Promise<ClassLevel[]>;

	/**
	 * Get the class level for the given class and level.
	 * @param classId Identifier of the class.
	 * @param level Level of the classLevel to get.
	 * @returns Class levels for the given class and level.
	 */
	getLevelByClassAndLevelAsync(
		classId: string,
		level: number,
	): Promise<ClassLevel>;
}
