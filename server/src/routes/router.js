import messageValidation from './middlewares/messageValidation'
import MessageQue from '../libs/MessageQue'
import { createOrUpdateMessage } from '../libs/dbHelpers'
import { BASE_URL } from '../utils/constants'
import User from '../model/User'
import express from 'express'
import LCD from '../libs/LCD'
import LED from '../libs/LED'
import resource from '../../resource'
const router = express()

router.get('/', (req, res) => {
  res.json({
    actions: `${BASE_URL}/actions`,
    properties: `${BASE_URL}/properties`,
    self: `${BASE_URL}`,
  })
})

export default router
