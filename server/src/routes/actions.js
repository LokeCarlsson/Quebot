import express from 'express'
import mq from '../libs/things'
import {createOrUpdateMessage} from '../libs/dbHelpers'
import resource from '../../resource'
import User from '../model/User'
const router = express.Router()

router.route('/actions')
.get((req, res) => {
  const {resources} = resource.links.actions

  const response = Object.keys(resources).reduce((array, action) => {
    return [...array, {
      id: action,
      name: resources[action].description
    }]
  }, [])

  res.status(200).send(response)
})

router.route('/actions/lcdState')
.post((req, res) => {
  const {student} = req.body
  createOrUpdateMessage(req.body)
    .then(data => {
      mq.updateMessageQue()
      return res.status(204).send()
    })
    .catch(error => {
      res.status(500).send('Internal Server Error')
      console.log(error) // Keeping for logs
    })

})
.delete((req, res) => {
  const {username} = req.body

  User.findOneAndRemove({username})
    .then(removedMessage => {
      if (!removedMessage) return res.status(400).send()
      
      mq.updateMessageQue()
      return res.status(204).send()
    })
    .catch(error => {
      res.status(500).send('Internal Server Error')
      console.log(error) // Keeping for logs
    })
})

export default router