import axios from 'axios'
import { Meta, TeamNBA } from '../interfaces'

export class FreeNBARepository {
    /*
        Function name: getAllTeams
        params: page => string
        Description: This function takes a page number as a parameter and returns a list of teams. It directly calls the
        freeNBA API.
    */
    getAllTeams = async (page: string): Promise<{ data: TeamNBA[]; meta: Meta }> => {
        const options = {
            method: 'GET',
            url: `https://${process.env.URL_NBA}/teams`,
            params: { page },
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.URL_NBA,
            },
        }
        try {
            const response = await axios.request(options)
            return response?.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    /*
        Function name: getSpecificTeam
        params: id => string
        return: TeamNBA
        Description: This function takes an id as a parameter and find the team corresponding to the id. It directly calls the freeNBA API.
    */
    getSpecificTeam = async (id: string): Promise<TeamNBA> => {
        const options = {
            method: 'GET',
            url: `https://${process.env.URL_NBA}/teams/${id}`,
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.URL_NBA,
            },
        }
        try {
            const response = await axios.request(options)
            return response?.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}
