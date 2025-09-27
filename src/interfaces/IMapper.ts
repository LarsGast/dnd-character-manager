/**
 * Interface for mapping one object to another.
 */
export interface IMapper<TSource, TTarget> {
	/**
	 * Map the input parameter to the target specification.
	 * @param source Source object.
	 * @returns Target object.
	 */
	map(source: TSource): TTarget;
}
