import { IHomebrewRepository } from '../interfaces/IHomebrewRepository';
import { IMapper } from '../interfaces/IMapper';
import { IResourceRepository } from '../interfaces/IResourceRepository';
import { ISrdApiService } from '../interfaces/ISrdApiService';
import { ClassApiDto } from '../types/api/resources/ClassApiDto';
import { BaseResourceApiDto } from '../types/api/wrappers/BaseResourceApiDto';
import { Class } from '../types/domain/resources/Class';
import { BaseResource } from '../types/domain/wrappers/BaseResource';
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
