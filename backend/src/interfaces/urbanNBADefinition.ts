import { UrbanDictionaryDefinition } from './urbanDictionaryDefinition'

export type UrbanNBADefinition = {
    id: number
    abbreviation: string
    city: string
    conference: string
    division: string
    full_name: string
    name: string
    urbanDictionaryDefinitions: UrbanDictionaryDefinition[]
}
