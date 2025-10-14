import { ResourceReferenceApiDto } from '../helpers/ResourceReferenceApiDto';
import { BaseResourceApiDto } from '../wrappers/BaseResourceApiDto';

export interface FeatureApiDto extends BaseResourceApiDto {
	/**
	 * Description of the resource.
	 */
	desc: string[];

	/**
	 * The level this feature is gained.
	 */
	level: number;

	/**
	 * The class that this feature is a part of.
	 */
	class: ResourceReferenceApiDto;

	/**
	 * The subclass that this feature is a part of.
	 */
	subclass?: ResourceReferenceApiDto;

	/**
	 * The parent feature that this feature is a part of.
	 * undefined if this features does not have a parent.
	 */
	parent?: ResourceReferenceApiDto;

	/**
	 * The prerequisites for this feature.
	 */
	prerequisites: object[];

	/**
	 * Information specific to this feature.
	 */
	feature_specific?: any;
}
