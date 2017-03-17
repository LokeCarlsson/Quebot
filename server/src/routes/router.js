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
import resource from '../../resource'
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

app.post('/message', messageValidation, (req, res) => {
  const {student} = req.body
  createOrUpdateMessage(req.body)
    .then(data => {
      mq.updateMessageQue()
      return res.status(200).send()
    })
    .catch(error => {
      console.log(error)
      console.log('app post /message')
    })

  // try {
  //   await createOrUpdateMessage(req.body)
  //   mq.updateMessageQue()
  //   res.status(200).json()
  // } catch (e) {
  //   console.log(e)
  // }
})

app.delete('/message', (req, res) => {
  const {username} = req.body

  User.findOneAndRemove({username})
    .then(removedMessage => {
      if (!removedMessage) return res.status(400).send()
      
      mq.updateMessageQue()
      return res.status(204).send()
    })
    .catch(error => {
      console.log(error)
      console.log('app delete /message')
    })


  // try {
  //   const removedMessage = await User.findOneAndRemove({username})  
  //   if (removedMessage) {
  //     mq.updateMessageQue()
  //     return res.status(204).send()
  //   }

  //   return res.status(400).send()
  // } catch (e) {
  //   console.log(e)
  // }
})

app.get('/', (req, res) => {
  res.status(200).json({
    actions: `${BASE_URL}/actions`,
    properties: `${BASE_URL}/properties`,
    self: `${BASE_URL}`
  })
})

export default app