import { TeamNBA, Meta } from '../../interfaces'
import { FreeNBARepository } from '../../repositories/freeNBARepository'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

jest.mock('axios')

describe('FreeNBARepository Test', () => {
    const repository = new FreeNBARepository()

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('Get all teams test', async () => {
        const mockData: { data: TeamNBA[]; meta: Meta } = {
            data: [
                {
                    id: 1,
                    abbreviation: 'ATL',
                    city: 'Atlanta',
                    conference: 'East',
                    division: 'Southeast',
                    full_name: 'Atlanta Hawks',
                    name: 'Hawks',
                },
                {
                    id: 2,
                    abbreviation: 'BOS',
                    city: 'Boston',
                    conference: 'East',
                    division: 'Atlantic',
                    full_name: 'Boston Celtics',
                    name: 'Celtics',
                },
            ],
            meta: {
                current_page: 1,
                next_page: 2,
                per_page: 30,
            },
        }

        ;(axios.request as jest.Mock).mockResolvedValueOnce({ data: mockData })

        const result = await repository.getAllTeams('1')
        expect(result).toEqual(mockData)
        expect(axios.request).toHaveBeenCalledWith(
            expect.objectContaining({
                url: expect.stringContaining(process.env.URL_NBA as string),
            })
        )
    })

    it('Get a specific team test', async () => {
        const mockData: TeamNBA = {
            id: 2,
            abbreviation: 'BOS',
            city: 'Boston',
            conference: 'East',
            division: 'Atlantic',
            full_name: 'Boston Celtics',
            name: 'Celtics',
        }

        ;(axios.request as jest.Mock).mockResolvedValueOnce({ data: mockData })

        const result = await repository.getSpecificTeam('1')
        expect(result).toEqual(mockData)
        expect(axios.request).toHaveBeenCalledWith(
            expect.objectContaining({
                url: expect.stringContaining(process.env.URL_NBA as string),
            })
        )
    })

    it('Handle errors when getting all teams', async () => {
        ;(axios.request as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

        await expect(repository.getAllTeams('test')).rejects.toThrow('API Error')
        expect(axios.request).toHaveBeenCalledWith(
            expect.objectContaining({
                url: expect.stringContaining(process.env.URL_NBA as string),
            })
        )
    })

    it('Get a specific team test', async () => {
        const mockData: TeamNBA = {
            id: 2,
            abbreviation: 'BOS',
            city: 'Boston',
            conference: 'East',
            division: 'Atlantic',
            full_name: 'Boston Celtics',
            name: 'Celtics',
        }

        ;(axios.request as jest.Mock).mockResolvedValueOnce({ data: mockData })

        const result = await repository.getSpecificTeam('1')
        expect(result).toEqual(mockData)
        expect(axios.request).toHaveBeenCalledWith(
            expect.objectContaining({
                url: expect.stringContaining(process.env.URL_NBA as string),
            })
        )
    })

    it('Handle errors when getting specific team', async () => {
        ;(axios.request as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

        await expect(repository.getSpecificTeam('test')).rejects.toThrow('API Error')
        expect(axios.request).toHaveBeenCalledWith(
            expect.objectContaining({
                url: expect.stringContaining(process.env.URL_NBA as string),
            })
        )
    })
})
