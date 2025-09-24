import { ITraitRepository } from "../interfaces/ITraitRepository.js";
import { IHomebrewRepository } from "../interfaces/IHomebrewRepository.js";
import { IMapper } from "../interfaces/IMapper.js";
import { ISrdApiService } from "../interfaces/ISrdApiService.js";
import { TraitApiDto } from "../types/api/resources/TraitApiDto.js";
import { BaseResourceApiDto } from "../types/api/wrappers/BaseResourceApiDto.js";
import { Trait } from "../types/domain/resources/Trait.js";
import { BaseResource } from "../types/domain/wrappers/BaseResource.js";
import { ResourceList } from "../types/domain/wrappers/ResourceList.js";
import { BaseResourceRepository } from "./BaseResourceRepository.js";
import { ResourceListApiDto } from "../types/api/wrappers/ResourceListApiDto.js";

export class TraitRepository extends BaseResourceRepository<TraitApiDto, Trait> implements ITraitRepository {

    /**
     * @inheritdoc
     */
    public constructor(
        homebrewRepository: IHomebrewRepository, 
        apiService: ISrdApiService, 
        baseResourceMapper: IMapper<BaseResourceApiDto, BaseResource>, 
        traitMapper: IMapper<TraitApiDto, Trait>
    ) {
        super("traits", homebrewRepository, apiService, baseResourceMapper, traitMapper);
    }

    /**
     * @inheritdoc
     */
    public async getAllTraitsByRaceAsync(raceId: string): Promise<ResourceList> {

        const allHomebrewTraits = this.homebrewRepository.getAllByResourceType<Trait>("traits");
        const homebrewTraits = allHomebrewTraits.filter(trait => trait.races.some(race => race.index === raceId));

        const endpoint = `races/${raceId}/traits`;
        const apiClassLevels = await this.apiService.getByEndpointAsync<ResourceListApiDto>(endpoint);

        return {
            count: homebrewTraits.length + apiClassLevels.count,
            results: [...homebrewTraits, ...apiClassLevels.results.map(dto => this.baseResourceMapper.map(dto))]
        };
    }

    /**
     * @inheritdoc
     */
    public async getAllTraitsBySubraceAsync(subraceId: string): Promise<ResourceList> {

        const allHomebrewTraits = this.homebrewRepository.getAllByResourceType<Trait>("traits");
        const homebrewTraits = allHomebrewTraits.filter(trait => trait.subraces.some(subrace => subrace.index === subraceId));

        const endpoint = `subraces/${subraceId}/traits`;
        const apiClassLevels = await this.apiService.getByEndpointAsync<ResourceListApiDto>(endpoint);

        return {
            count: homebrewTraits.length + apiClassLevels.count,
            results: [...homebrewTraits, ...apiClassLevels.results.map(dto => this.baseResourceMapper.map(dto))]
        };
    }
}