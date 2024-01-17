import axios from 'axios'
import dotenv from 'dotenv'
import { UrbanDictionaryRepository } from '../../repositories/urbanDictionaryRepository'

dotenv.config()

jest.mock('axios')

describe('UrbanDictionaryRepository Test', () => {
    const repository = new UrbanDictionaryRepository()

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('Get definition test', async () => {
        const mockData = {
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

        ;(axios.request as jest.Mock).mockResolvedValueOnce({ data: mockData })

        const result = await repository.getDefinition('test')
        expect(result).toEqual(mockData)
        expect(axios.request).toHaveBeenCalledWith(
            expect.objectContaining({
                url: expect.stringContaining(process.env.URL_URBAN as string),
            })
        )
    })

    it('Handle errors when getting specific team', async () => {
        ;(axios.request as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

        await expect(repository.getDefinition('test2')).rejects.toThrow('API Error')
        expect(axios.request).toHaveBeenCalledWith(
            expect.objectContaining({
                url: expect.stringContaining(process.env.URL_URBAN as string),
            })
        )
    })
})
