import { UrbanDictionaryRepository } from '../repositories/urbanDictionaryRepository'
import { FreeNBARepository } from '../repositories/freeNBARepository'
import { TeamNBA, Meta, UrbanNBADefinition } from '../interfaces'

export class UrbanNBADictionaryService {
    constructor(
        private urbanDictionaryRepository: UrbanDictionaryRepository = new UrbanDictionaryRepository(),
        private freeNBARepository: FreeNBARepository = new FreeNBARepository()
    ) {}

    getCombinedData = async (id: string): Promise<UrbanNBADefinition> => {
        try {
            const nbaResponse = await this.freeNBARepository.getSpecificTeam(id)
            const urbanDictionaryResponse = await this.urbanDictionaryRepository.getDefinition(nbaResponse?.full_name)
            return {
                ...nbaResponse,
                urbanDictionaryDefinitions: urbanDictionaryResponse?.list,
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    getAllTeams = async (page: string): Promise<{ data: TeamNBA[]; meta: Meta }> => {
        try {
            const nbaResponse = await this.freeNBARepository.getAllTeams(page)
            return nbaResponse
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}
