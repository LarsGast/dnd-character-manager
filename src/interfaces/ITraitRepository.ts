import { Trait } from "../types/domain/resources/Trait.js";
import { ResourceList } from "../types/domain/wrappers/ResourceList.js";
import { IResourceRepository } from "./IResourceRepository.js";

export interface ITraitRepository extends IResourceRepository<Trait> {

    /**
     * Get all traits for the given race.
     * @param raceId Identifier of the race.
     * @returns All traits for the given race.
     */
    getAllTraitsByRaceAsync(raceId: string): Promise<ResourceList>;

    /**
     * Get all traits for the given subrace.
     * @param subraceId Identifier of the subrace.
     * @returns All traits for the given subrace.
     */
    getAllTraitsBySubraceAsync(subraceId: string): Promise<ResourceList>;
}