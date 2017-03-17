import bodyParser from 'body-parser'
import routes from './routes/router'
import mongoose from 'mongoose'
import express from 'express'
import LED from './libs/LED'
import morgan from 'morgan'
import cors from 'cors'
import properties from './routes/properties'
import model from './routes/model'
import actions from './routes/actions'
import index from './routes/router'

const PORT = process.env.PORT || 20080

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())

app.use(actions)
app.use(model)
app.use(properties)
app.use(index)

app.use((error, request, response, next) => {
  response.status(500).json({ msg: error.message })
})

app.listen(PORT, error => {
  console.log(`Server is running! - localhost:${PORT}`)
  mongoose.connect('mongodb://localhost/botDB', (e) => {
    console.log('Connected to mongodb')
  })
})


