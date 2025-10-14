import { ResourceReference } from '../helpers/ResourceReference';
import { BaseResource } from '../wrappers/BaseResource';

export interface Feature extends BaseResource {
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
	class: ResourceReference;

	/**
	 * The subclass that this feature is a part of.
	 */
	subclass?: ResourceReference;

	/**
	 * The parent feature that this feature is a part of.
	 * undefined if this features does not have a parent.
	 */
	parent?: ResourceReference;

	/**
	 * The prerequisites for this feature.
	 */
	prerequisites: object[];

	/**
	 * Information specific to this feature.
	 */
	feature_specific?: any;
}
