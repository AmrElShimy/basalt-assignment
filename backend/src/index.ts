import express from 'express'
import dotenv from 'dotenv'
import urbanNBADictionaryRouter from './routes/UrbanNBADictionaryRouter'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use('/', urbanNBADictionaryRouter)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
