import { login, register } from '../libs/auth'
import messageValidation from './middlewares/messageValidation'
import MessageQue from '../libs/MessageQue'
import { createOrUpdateMessage } from '../libs/dbHelpers'
// import * as settings from '../settings'
import fsp from 'fs-promise'
import passport from 'passport'
import { BASE_URL } from '../utils/constants'
import User from '../model/User'
import express from 'express'
import LCD from '../libs/LCD'
import LED from '../libs/LED'
import resource from '../../resource'
const app = express()

app.get('/', (req, res) => {
  res.status(200).json({
    actions: `${BASE_URL}/actions`,
    properties: `${BASE_URL}/properties`,
    self: `${BASE_URL}`
  })
})

export default app