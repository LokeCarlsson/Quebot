import express from 'express'
import resource from '../../resource.json'
import User from '../model/User'
import { createOrUpdateMessage } from '../libs/dbHelpers'

const router = express.Router()

router
  .get('/properties', async (req, res) => {
    const { resources } = resource.links.properties
    try {
      const messages = await User.find({}, '-_id message updatedAt createdAt')
      const newMessages = messages.map(message => ({
        timestamp: message.updatedAt || message.createdAt,
        message: `${message.message.firstRow} ${message.message.secondRow}`,
      }))
      const response = Object.keys(resources).reduce((array, resource) => {
        const prop = {
          id: resource,
          name: resource === 'LCD' ? resources[resource].name : undefined,
          values: messages,
        }
        return [...array, prop]
      }, [])
      res.status(200).json(response)
    } catch (error) {
      res.sendStatus(500)
    }
  })
  .get('/properties/lcdState', async (req, res) => {
    try {
      const messages = await User.find({}, '-_id message updatedAt createdAt')
      const newArray = messages.map(message => ({
        timestamp: message.updatedAt || message.createdAt,
        message: `${message.message.firstRow} ${message.message.secondRow}`,
      }))
      res.json(newArray)
    } catch (error) {
      res.sendStatus(500)
    }
  })

export default router
