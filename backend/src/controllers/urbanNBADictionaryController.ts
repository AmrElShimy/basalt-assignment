import { Request, Response } from 'express'
import { UrbanNBADictionaryService } from '../services/urbanNBADictionaryService'
import { TeamNBA, Meta, UrbanNBADefinition } from '../interfaces'

export class UrbanNBADictionaryController {
    constructor(private urbanNBADictionary: UrbanNBADictionaryService = new UrbanNBADictionaryService()) {}

    getCombinedData = async (req: Request, res: Response): Promise<Response<UrbanNBADefinition>> => {
        try {
            const response = await this.urbanNBADictionary.getCombinedData(req?.query?.id as string)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json(error)
        }
    }

    getAllTeams = async (req: Request, res: Response): Promise<Response<{ data: TeamNBA[]; meta: Meta }>> => {
        try {
            const response = await this.urbanNBADictionary.getAllTeams(req?.query?.page as string)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}
