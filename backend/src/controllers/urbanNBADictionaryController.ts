import { Request, Response } from 'express'
import { UrbanNBADictionaryService } from '../services/urbanNBADictionaryService'
import { TeamNBA, Meta, UrbanNBADefinition } from '../interfaces'

export class UrbanNBADictionaryController {
    //Inject service as a dependency
    constructor(private urbanNBADictionary: UrbanNBADictionaryService = new UrbanNBADictionaryService()) {}

    /*
        Function name: getCombinedData
        params: id => string
        return: UrbanNBADefinition
        Description: This function is the controller function that receives the HTTP request and has an id as a parameter and find the team 
        corresponding to the id. After finding the team,the team name is taken and passed to the Urban Dictionary api to find a definition.
    */
    getCombinedData = async (req: Request, res: Response): Promise<Response<UrbanNBADefinition>> => {
        try {
            const response = await this.urbanNBADictionary.getCombinedData(req?.query?.id as string)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json(error)
        }
    }

    /*
        Function name: getAllTeams
        params: page => string
        Description: This function is the controller function that receives the HTTP request has a page number as a parameter and returns a 
        list of teams.
    */
    getAllTeams = async (req: Request, res: Response): Promise<Response<{ data: TeamNBA[]; meta: Meta }>> => {
        try {
            const response = await this.urbanNBADictionary.getAllTeams(req?.query?.page as string)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}
