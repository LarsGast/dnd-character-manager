import { IHomebrewRepository } from '../interfaces/IHomebrewRepository.js';
import { IMapper } from '../interfaces/IMapper.js';
import { IResourceRepository } from '../interfaces/IResourceRepository.js';
import { ISrdApiService } from '../interfaces/ISrdApiService.js';
import { ClassApiDto } from '../types/api/resources/ClassApiDto.js';
import { BaseResourceApiDto } from '../types/api/wrappers/BaseResourceApiDto.js';
import { Class } from '../types/domain/resources/Class.js';
import { BaseResource } from '../types/domain/wrappers/BaseResource.js';
import { SubclassRecord } from '../types/storage/resources/SubclassRecord.js';
import { BaseResourceRecord } from '../types/storage/wrappers/BaseResourceRecord.js';
import { BaseResourceRepository } from './BaseResourceRepository.js';

export class ClassRepository
	extends BaseResourceRepository<Class, ClassApiDto>
	implements IResourceRepository<Class>
{
	/**
	 * @inheritdoc
	 */
	public constructor(
		homebrewRepository: IHomebrewRepository,
		apiService: ISrdApiService,
		baseResourceApiToDomainMapper: IMapper<BaseResourceApiDto, BaseResource>,
		classApiToDomainMapper: IMapper<ClassApiDto, Class>,
		baseResourceStorageMapper: IMapper<BaseResourceRecord, BaseResource>,
	) {
		super(
			'classes',
			homebrewRepository,
			apiService,
			baseResourceApiToDomainMapper,
			classApiToDomainMapper,
			baseResourceStorageMapper,
		);
	}

	/**
	 * @inheritdoc
	 */
	public override async getAsync(id: string): Promise<Class | undefined> {
		const classObject = await super.getAsync(id);

		if (classObject) {
			// Add relations.
			classObject.subclasses.push(
				...this.homebrewRepository
					.getAllByResourceType<SubclassRecord>('subclasses')
					.filter((subclass) => subclass.class?.id === id)
					.map((subclass) =>
						this.baseResourceStorageToDomainMapper!.map(subclass),
					),
			);
		}

		return classObject;
	}
}
