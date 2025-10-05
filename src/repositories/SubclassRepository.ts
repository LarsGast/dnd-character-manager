import { IFeatureRepository } from '../interfaces/IFeatureRepository.js';
import { IHomebrewRepository } from '../interfaces/IHomebrewRepository.js';
import { IMapper } from '../interfaces/IMapper.js';
import { ISrdApiService } from '../interfaces/ISrdApiService.js';
import { SubclassApiDto } from '../types/api/resources/SubclassApiDto.js';
import { BaseResourceApiDto } from '../types/api/wrappers/BaseResourceApiDto.js';
import { Feature } from '../types/domain/resources/Feature.js';
import { Subclass } from '../types/domain/resources/Subclass.js';
import { BaseResource } from '../types/domain/wrappers/BaseResource.js';
import { SubclassRecord } from '../types/storage/resources/SubclassRecord.js';
import { BaseResourceRecord } from '../types/storage/wrappers/BaseResourceRecord.js';
import { BaseResourceRepository } from './BaseResourceRepository.js';

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
			'subclasses',
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
