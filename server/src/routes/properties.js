import express from 'express'
import resource from '../../resource.json'
import User from '../model/User'
import {createOrUpdateMessage} from '../libs/dbHelpers'

const router = express.Router()

router.route('/properties')
.get((req, res) => {
  const {resources} = resource.links.properties
  const response = Object.keys(resources).reduce((array, resource) => {
    const prop = {
      id: resource,
      name: resources[resource].name,
      values: 'what is on display?'      
    }
    return [...array, prop]
  }, [])

  return res.status(200).json(response)
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