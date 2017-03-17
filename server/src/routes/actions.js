import express from 'express'
import mq from '../libs/things'
import resource from '../../resource'
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

  res.send(response)
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
      console.log(error)
      console.log('app post /message')
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
      console.log(error)
      console.log('app delete /message')
    })
})

export default router