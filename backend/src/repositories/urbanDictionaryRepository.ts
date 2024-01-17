import axios from 'axios'

export class UrbanDictionaryRepository {
    getDefinition = async (term: string) => {
        const options = {
            method: 'GET',
            url: `https://${process.env.URL_URBAN}/define`,
            params: { term },
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.URL_URBAN,
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
