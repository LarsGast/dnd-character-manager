import { IHomebrewRepository } from '../interfaces/IHomebrewRepository';
import { IMapper } from '../interfaces/IMapper';
import { IResourceRepository } from '../interfaces/IResourceRepository';
import { ISrdApiService } from '../interfaces/ISrdApiService';
import { ResourceTypeApiDto } from '../types/api/helpers/ResourceTypeApiDto';
import { ClassApiDto } from '../types/api/resources/ClassApiDto';
import { BaseResourceApiDto } from '../types/api/wrappers/BaseResourceApiDto';
import { ResourceType } from '../types/domain/helpers/ResourceType';
import { Class } from '../types/domain/resources/Class';
import { BaseResource } from '../types/domain/wrappers/BaseResource';
import { ResourceTypeRecord } from '../types/storage/helpers/ResourceTypeRecord';
import { SubclassRecord } from '../types/storage/resources/SubclassRecord';
import { BaseResourceRecord } from '../types/storage/wrappers/BaseResourceRecord';
import { BaseResourceRepository } from './BaseResourceRepository';

export class ClassRepository
	extends BaseResourceRepository<Class, ClassApiDto>
	implements IResourceRepository<Class>
{
	/**
	 * @inheritdoc
	 */
	public constructor(
		resourceTypeDomainToApiMapper: IMapper<ResourceType, ResourceTypeApiDto>,
		resourceTypeDomainToStorageMapper: IMapper<
			ResourceType,
			ResourceTypeRecord
		>,
		homebrewRepository: IHomebrewRepository,
		apiService: ISrdApiService,
		baseResourceApiToDomainMapper: IMapper<BaseResourceApiDto, BaseResource>,
		classApiToDomainMapper: IMapper<ClassApiDto, Class>,
		baseResourceStorageMapper: IMapper<BaseResourceRecord, BaseResource>,
	) {
		super(
			ResourceType.Class,
			resourceTypeDomainToApiMapper,
			resourceTypeDomainToStorageMapper,
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
					.getAllByResourceType<SubclassRecord>(ResourceTypeRecord.Subclass)
					.filter((subclass) => subclass.class?.id === id)
					.map((subclass) =>
						this.baseResourceStorageToDomainMapper!.map(subclass),
					),
			);
		}

		return classObject;
	}
}
