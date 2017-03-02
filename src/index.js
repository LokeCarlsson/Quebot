import {TOKEN, PORT} from './settings'
import bodyParser from 'body-parser'
import routes from './routes/router'
import mongoose from 'mongoose'
import express from 'express'
import Bot from './libs/Bot'
import LED from './libs/LED'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())

app.use(routes)

app.use((error, request, response, next) => {
  response.status(500).json({ msg: error.message })
})

app.listen(PORT, error => {
  console.log(`Server is running! - localhost:${PORT}`)
  mongoose.connect('mongodb://localhost/botDB', (e) => {
    console.log('Connected to mongodb')
  })
  
  const bot = new Bot(TOKEN)
  bot.init()
})
