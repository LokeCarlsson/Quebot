import messageValidation from './middlewares/messageValidation'
import MessageQue from '../libs/MessageQue'
import { createOrUpdateMessage } from '../libs/dbHelpers'
// import * as settings from '../settings'
import fsp from 'fs-promise'
import { BASE_URL } from '../utils/constants'
import User from '../model/User'
import express from 'express'
import LCD from '../libs/LCD'
import LED from '../libs/LED'

const app = express()

// const config = {
//   rs: settings.REGISTER,
//   e: settings.ENABLE,
//   data: [settings.D4, 
//          settings.D5, 
//          settings.D6, 
//          settings.D7],
//   cols: settings.COLS,
//   rows: settings.ROWS
// }

// const lcd = new LCD(config)
// const led = new LED()
// const mq = new MessageQue(lcd, led)

app.post('/message', messageValidation,  async (req, res) => {
  const {student} = req.body
  try {
    await createOrUpdateMessage(req.body)
    mq.updateMessageQue()
    // res.status(200).json({ msg: inviteMessage(student) })
    res.status(200).json()
  } catch (e) {
    console.log(e)
  }
})

app.delete('/message', async (req, res) => {
  const {username} = req.body

  try {
    const removedMessage = await User.findOneAndRemove({username})  
    if (removedMessage) {
      mq.updateMessageQue()
      return res.status(204).send()
    }
    return res.status(400).send()
  } catch (e) {
    console.log(e)
  }
})

app.get('/actions', async (req, res) => {
  return fsp.readJSON('server/resource.json')
    .then(resource => res.status(200).send(resource))
    .catch(error => console.log(error))
})


app.get('/', (req, res) => {
  res.status(200).json({
    actions: '/actions',
    properties: '/properties',
    self: `${BASE_URL}`
  })
})

export default app
