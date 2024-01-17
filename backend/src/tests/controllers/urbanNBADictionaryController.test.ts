import { Request, Response } from 'express'
import { UrbanNBADictionaryController } from '../../controllers/urbanNBADictionaryController'
import { UrbanNBADictionaryService } from '../../services/urbanNBADictionaryService'
import { TeamNBA, Meta, UrbanNBADefinition } from '../../interfaces'

jest.mock('../../services/urbanNBADictionaryService')

describe('UrbanNBADictionaryController', () => {
    let urbanNBADictionaryController: UrbanNBADictionaryController
    let urbanNBADictionaryService: jest.Mocked<UrbanNBADictionaryService>

    beforeEach(() => {
        urbanNBADictionaryService = {
            getCombinedData: jest.fn(),
            getAllTeams: jest.fn(),
        } as unknown as jest.Mocked<UrbanNBADictionaryService>
        urbanNBADictionaryController = new UrbanNBADictionaryController(urbanNBADictionaryService)
    })

    describe('getCombinedData', () => {
        it('return combined data successfully', async () => {
            const mockRequest = {
                query: {
                    id: '1',
                },
            } as unknown as Request

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response<UrbanNBADefinition>

            const mockUrbanNBADefinition: UrbanNBADefinition = {
                id: 1,
                abbreviation: 'ATL',
                city: 'Atlanta',
                conference: 'East',
                division: 'Southeast',
                full_name: 'Atlanta Hawks',
                name: 'Hawks',
                urbanDictionaryDefinitions: [
                    {
                        definition: 'A very underrated team now, full of young rising stars like [Joe Johnson], Josh Smith, and [Jamal Crawford], all [the fucks] above me are wrong.',
                        permalink: 'http://atlanta-hawks.urbanup.com/4541864',
                        thumbs_up: 110,
                        author: 'ATLvagmaster',
                        word: 'Atlanta Hawks',
                        defid: 4541864,
                        current_vote: '',
                        written_on: '2010-01-31T23:43:08.000Z',
                        example: 'Man, you see [Jamal] Crawfor J that 3, man [the Atlanta] [Hawks] good',
                        thumbs_down: 24,
                    },
                ],
            }

            urbanNBADictionaryService.getCombinedData.mockResolvedValueOnce(mockUrbanNBADefinition)

            await urbanNBADictionaryController.getCombinedData(mockRequest, mockResponse)

            expect(urbanNBADictionaryService.getCombinedData).toHaveBeenCalledWith('1')
            expect(mockResponse.status).toHaveBeenCalledWith(200)
            expect(mockResponse.json).toHaveBeenCalledWith(mockUrbanNBADefinition)
        })

        it('handle errors during combined data retrieval', async () => {
            const mockRequest = {
                query: {
                    id: '1',
                },
            } as unknown as Request

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response

            const mockError = new Error('Mock error')
            urbanNBADictionaryService.getCombinedData.mockRejectedValueOnce(mockError)

            await urbanNBADictionaryController.getCombinedData(mockRequest, mockResponse)

            expect(urbanNBADictionaryService.getCombinedData).toHaveBeenCalledWith('1')
            expect(mockResponse.status).toHaveBeenCalledWith(400)
            expect(mockResponse.json).toHaveBeenCalledWith(mockError)
        })
    })

    describe('getAllTeams', () => {
        it('return all teams successfully', async () => {
            const mockRequest = {
                query: {
                    page: '1',
                },
            } as unknown as Request

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response<{ data: TeamNBA[]; meta: Meta }>

            const mockTeamNBAData: { data: TeamNBA[]; meta: Meta } = {
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

            urbanNBADictionaryService.getAllTeams.mockResolvedValueOnce(mockTeamNBAData)

            await urbanNBADictionaryController.getAllTeams(mockRequest, mockResponse)

            expect(urbanNBADictionaryService.getAllTeams).toHaveBeenCalledWith('1')
            expect(mockResponse.status).toHaveBeenCalledWith(200)
            expect(mockResponse.json).toHaveBeenCalledWith(mockTeamNBAData)
        })

        it('handle errors during all teams retrieval', async () => {
            const mockRequest = {
                query: {
                    page: '1',
                },
            } as unknown as Request

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response

            const mockError = new Error('Mock error')
            urbanNBADictionaryService.getAllTeams.mockRejectedValueOnce(mockError)

            await urbanNBADictionaryController.getAllTeams(mockRequest, mockResponse)

            expect(urbanNBADictionaryService.getAllTeams).toHaveBeenCalledWith('1')
            expect(mockResponse.status).toHaveBeenCalledWith(400)
            expect(mockResponse.json).toHaveBeenCalledWith(mockError)
        })
    })
})
