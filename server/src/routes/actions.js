import express from 'express'
import mq from '../libs/things'
import { createOrUpdateMessage } from '../libs/dbHelpers'
import resource from '../../resource'
import User from '../model/User'
const router = express.Router()

router
  .get('/actions', (req, res) => {
    const { resources } = resource.links.actions
    
    const response = Object.keys(resources).reduce((array, action) => {
      const newAction = { id: action, name: resources[action].description }
      return [...array, newAction]
    }, [])

    res.status(200).send(response)
  })
  .post('/actions/lcdState', async (req, res) => {
    const { student } = req.body
    try {
      const updatedMessage = await createOrUpdateMessage(req.body)
      mq.updateMessageQue()
      res.sendStatus(204)
    } catch (error) {
      res.sendStatus(500)
    }
  })
  .delete('/actions/lcdState', async (req, res) => {
    const { username } = req.body
    try {
      const removedMessage = await User.findOneAndRemove({ username })
      if (!removedMessage) return res.sendStatus(400)
      mq.updateMessageQue()
      res.sendStatus(204)
    } catch (error) {
      res.status(500).send('Internal Server Error')
    }
  })

export default router
