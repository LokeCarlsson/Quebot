import express from 'express'
import User from '../model/User'
import messageValidation from './middlewares/messageValidation'
import LCD from '../libs/LCD'
import MessageQue from '../libs/MessageQue'

const app = express()


const ENABLE = 19
const REGISTER = 26
const D4 = 13
const D5 = 6
const D6 = 5
const D7 = 11


const config = {
  largeFont: true,
  rs: REGISTER,
  e: ENABLE,
  data: [D4, D5, D6, D7],
  cols: 16,
  rows: 2
}

const lcd = new LCD(config)
const mq = new MessageQue(lcd)

app.post('/message', messageValidation,  async (request, response) => {
  
  try {
    await createOrUpdateMessage(request.body)
    mq.updateMessageQue()
    response.status(200).json({ msg: 'Message Published!' })
  } catch (e) {
    console.log(e)
  }
})


app.delete('/message', async (request, response) => {
  const {username} = request.body

  try {
    await User.findOneAndRemove({username})  
    mq.updateMessageQue()
    return response.status(200).json({
      msg: 'Your message has been removed'
    })
  } catch (e) {
    console.log(e)
  }
})


export default app

async function createOrUpdateMessage(botPayload) {
	const {username, name, student} = botPayload
  const firstRow = `${student} goto`
  const secondRow = name
	try {
		return await User.findOneAndUpdate(
			{username},
			{
        'message.firstRow': firstRow,
        'message.secondRow': secondRow,
        username, name
      },
			{new: true, setDefaultsOnInsert: true, upsert: true}
		)
	} catch (error) {
		throw error
	}
}

async function removeMessageFromQue(username) {
  await User.findOneAndRemove({username})
}