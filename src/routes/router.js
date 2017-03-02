import messageValidation from './middlewares/messageValidation'
import MessageQue from '../libs/MessageQue'
import { createOrUpdateMessage } from '../libs/dbHelpers'
import * as settings from '../settings'
import User from '../model/User'
import express from 'express'
import LCD from '../libs/LCD'
import LED from '../libs/LED'


const app = express()

const config = {
  rs: settings.REGISTER,
  e: settings.ENABLE,
  data: [settings.D4, 
         settings.D5, 
         settings.D6, 
         settings.D7],
  cols: settings.COLS,
  rows: settings.ROWS
}

const lcd = new LCD(config)
const led = new LED()
const mq = new MessageQue(lcd, led)

app.post('/message', messageValidation,  async (request, response) => {
  
  try {
    await createOrUpdateMessage(request.body)
    mq.updateMessageQue()
    response.status(200).json({ msg: 'Message Published!' })
  } catch (e) {
    console.log(e)
  }
})

app.delete('/message', async (request, response) => {
  const {username} = request.body

  try {
    await User.findOneAndRemove({username})  
    mq.updateMessageQue()
    return response.status(200).json({
      msg: 'Your message has been removed'
    })
  } catch (e) {
    console.log(e)
  }
})

export default app