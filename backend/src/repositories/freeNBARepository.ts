import axios from 'axios'
import { Meta, TeamNBA } from '../interfaces'

export class FreeNBARepository {
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
