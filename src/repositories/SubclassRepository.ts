import { IFeatureRepository } from '../interfaces/IFeatureRepository';
import { IHomebrewRepository } from '../interfaces/IHomebrewRepository';
import { IMapper } from '../interfaces/IMapper';
import { ISrdApiService } from '../interfaces/ISrdApiService';
import { SubclassApiDto } from '../types/api/resources/SubclassApiDto';
import { BaseResourceApiDto } from '../types/api/wrappers/BaseResourceApiDto';
import { Feature } from '../types/domain/resources/Feature';
import { Subclass } from '../types/domain/resources/Subclass';
import { BaseResource } from '../types/domain/wrappers/BaseResource';
import { SubclassRecord } from '../types/storage/resources/SubclassRecord';
import { BaseResourceRecord } from '../types/storage/wrappers/BaseResourceRecord';
import { BaseResourceRepository } from './BaseResourceRepository';

export class SubclassRepository extends BaseResourceRepository<
	Subclass,
	SubclassApiDto,
	SubclassRecord
> {
	private readonly featureRepository: IFeatureRepository;

	public constructor(
		homebrewRepository: IHomebrewRepository,
		apiService: ISrdApiService,
		baseResourceApiToDomainMapper: IMapper<BaseResourceApiDto, BaseResource>,
		resourceApiToDomainMapper: IMapper<SubclassApiDto, Subclass>,
		baseResourceStorageMapper: IMapper<BaseResourceRecord, BaseResource>,
		resourceStorageMapper: IMapper<SubclassRecord, Subclass>,
		featureRepository: IFeatureRepository,
	) {
		super(
			'races',
			homebrewRepository,
			apiService,
			baseResourceApiToDomainMapper,
			resourceApiToDomainMapper,
			baseResourceStorageMapper,
			resourceStorageMapper,
		);

		this.featureRepository = featureRepository;
	}

	/**
	 * @inheritdoc
	 */
	public override async getAsync(id: string): Promise<Subclass | undefined> {
		const subclass = await super.getAsync(id);

		if (subclass && !subclass.isHomebrew) {
			const featuresForSubclass =
				await this.featureRepository.getAllFeaturesForSubclassAsync(id);

			const fullFeatures = (
				await Promise.all(
					featuresForSubclass.results.map((feature) =>
						this.featureRepository.getAsync(feature.index),
					),
				)
			).filter((feature): feature is Feature => feature !== undefined);

			subclass.features = fullFeatures.map((feature) => ({
				name: feature.name,
				level: feature.level,
				description: feature.desc.join('\n'),
			}));
		}

		return subclass;
	}
}
