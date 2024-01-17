import axios from 'axios'

export class UrbanDictionaryRepository {
    /*
    Function name: getDefinition
    params: term => string
    Description: This function takes a term as a parameter and finds definitions on Urban Dictionary. It calls the
    Urban Dictionary API directly.
    */
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
