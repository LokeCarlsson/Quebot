import express from 'express'
import resource from '../../resource.json'

const router = express.Router()

router.route('/model')
.get((req, res) => {
  res.status(200).send(resource.links.actions)
})

export default router