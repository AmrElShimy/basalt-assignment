import { UrbanDictionaryRepository } from '../repositories/urbanDictionaryRepository'
import { FreeNBARepository } from '../repositories/freeNBARepository'
import { TeamNBA, Meta, UrbanNBADefinition } from '../interfaces'

export class UrbanNBADictionaryService {
    //Inject repositories as a dependency
    constructor(
        private urbanDictionaryRepository: UrbanDictionaryRepository = new UrbanDictionaryRepository(),
        private freeNBARepository: FreeNBARepository = new FreeNBARepository()
    ) {}

    /*
        Function name: getCombinedData
        params: id => string
        return: UrbanNBADefinition
        Description: This function takes an id as a parameter and find the team corresponding to the id. After finding the team,
        the team name is taken and passed to the Urban Dictionary api to find a definition.
    */
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

    /*
        Function name: getAllTeams
        params: page => string
        Description: This function takes a page number as a parameter and returns a list of teams.
    */
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
