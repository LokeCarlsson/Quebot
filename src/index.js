import express from 'express'
import routes from './routes/router'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Bot from './libs/Bot'

const app = express()
const PORT = process.env.PORT || 20080
const token = 'xoxb-148227054180-j901TGSDCTXT5OkjIbjQbbzb'

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
  
  const bot = new Bot(token)
  bot.init()
})






