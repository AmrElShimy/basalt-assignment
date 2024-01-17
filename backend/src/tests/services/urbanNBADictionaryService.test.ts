import { UrbanNBADictionaryService } from '../../services/urbanNBADictionaryService'
import { UrbanDictionaryRepository } from '../../repositories/urbanDictionaryRepository'
import { FreeNBARepository } from '../../repositories/freeNBARepository'
import { TeamNBA, Meta } from '../../interfaces'

jest.mock('../../repositories/urbanDictionaryRepository')
jest.mock('../../repositories/freeNBARepository')

describe('UrbanNBADictionaryService', () => {
    let urbanDictionaryRepository: jest.Mocked<UrbanDictionaryRepository>
    let freeNBARepository: jest.Mocked<FreeNBARepository>
    let urbanNBADictionaryService: UrbanNBADictionaryService

    beforeEach(() => {
        urbanDictionaryRepository = {
            getDefinition: jest.fn(),
        } as jest.Mocked<UrbanDictionaryRepository>

        freeNBARepository = {
            getSpecificTeam: jest.fn(),
            getAllTeams: jest.fn(),
        } as unknown as jest.Mocked<FreeNBARepository>

        urbanNBADictionaryService = new UrbanNBADictionaryService(urbanDictionaryRepository, freeNBARepository)
    })

    describe('getCombinedData', () => {
        it('should get combined data successfully', async () => {
            const mockNbaResponse = { full_name: 'Test' } as TeamNBA
            const mockUrbanDictionaryResponse = {
                list: [
                    {
                        definition:
                            '1. the main cause of [explosions]. 2. any thing [dreaded] that your "teachers" say is "good" for you. soon after, you explode for no reason. 3. what scientists do to make stuff explode. 4. when a sheet of paper explodes into [flames].',
                        permalink: 'http://test.urbanup.com/1876232',
                        thumbs_up: 168,
                        author: 'monn-unit',
                        word: 'test',
                        defid: 1876232,
                        current_vote: '',
                        written_on: '2006-07-23T03:47:04.000Z',
                        example: '1. test [sodium] and water. 2. SAT is a test. 3. [Monkeys]. 4. you brought your [lighter] to test.',
                        thumbs_down: 47,
                    },
                ],
            }

            freeNBARepository.getSpecificTeam.mockResolvedValueOnce(mockNbaResponse)
            urbanDictionaryRepository.getDefinition.mockResolvedValueOnce(mockUrbanDictionaryResponse)

            const result = await urbanNBADictionaryService.getCombinedData('1')

            expect(result).toEqual({
                ...mockNbaResponse,
                urbanDictionaryDefinitions: mockUrbanDictionaryResponse.list,
            })
        })

        it('should handle errors during combined data retrieval', async () => {
            freeNBARepository.getSpecificTeam.mockRejectedValueOnce(new Error('NBA API Error'))

            await expect(urbanNBADictionaryService.getCombinedData('1')).rejects.toThrow('NBA API Error')
        })
    })

    describe('getAllTeams', () => {
        it('should get all teams successfully', async () => {
            const mockNbaResponse = {
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
            } as { data: TeamNBA[]; meta: Meta }

            freeNBARepository.getAllTeams.mockResolvedValueOnce(mockNbaResponse)

            const result = await urbanNBADictionaryService.getAllTeams('1')

            expect(result).toEqual(mockNbaResponse)
        })

        it('should handle errors during all teams retrieval', async () => {
            freeNBARepository.getAllTeams.mockRejectedValueOnce(new Error('NBA API Error'))

            await expect(urbanNBADictionaryService.getAllTeams('1')).rejects.toThrow('NBA API Error')
        })
    })
})
