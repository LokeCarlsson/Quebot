import express from 'express'
import resource from '../../resource.json'
import User from '../model/User'
import {createOrUpdateMessage} from '../libs/dbHelpers'
const router = express.Router()

router.route('/properties')
.get((req, res) => {
  const {resources} = resource.links.properties
  User.find({}, '-_id message updatedAt createdAt')
    .then(messages => {
      const msgs = messages.map(message => {
        return {
          timestamp: message.updatedAt || message.createdAt,
          message: `${message.message.firstRow} ${message.message.secondRow}`
        }
      })
      return msgs
    })
    .then(messages => {
      const response = Object.keys(resources).reduce((array, resource) => {
        if (resource === 'LCD') {
          let prop = {
            id: resource,
            name: resources[resource].name,
            values: messages
          }
          return [...array, prop]
        }
        let prop = {
          id: resource,
          name: resources[resource].name,
        }
        return [...array, prop]
      }, [])
      return res.status(200).json(response)
    })
    .catch(e => {
      console.log(e)
      return res.status(500).send('Intern Server error')
    })
})

router.route('/properties/lcdState')
.get((req, res) => {
  User.find({}, '-_id message updatedAt createdAt')
    .then(messages => {
      const newArray = messages.map(message => {
        return {
          timestamp: message.updatedAt || message.createdAt,
          message: `${message.message.firstRow} ${message.message.secondRow}`
        }
      })
      
      res.status(200).json(newArray)
    })
    .catch(error => {
      console.log(error)
    })
})

export default router