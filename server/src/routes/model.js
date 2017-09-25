import express from 'express'
import resource from '../../resource.json'

const router = express.Router()

router().get('/model', (req, res) => res.send(resource.links.actions))

export default router
