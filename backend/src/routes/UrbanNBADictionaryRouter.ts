import express from 'express'
import { UrbanNBADictionaryController } from '../controllers/urbanNBADictionaryController'

const urbanNBADictionaryRouter = express.Router()
urbanNBADictionaryRouter.use(express.json())

const urbanNBADictionaryController = new UrbanNBADictionaryController()

urbanNBADictionaryRouter.get('/getTeam', urbanNBADictionaryController.getCombinedData)
urbanNBADictionaryRouter.get('/getAllTeams', urbanNBADictionaryController.getAllTeams)

export default urbanNBADictionaryRouter
