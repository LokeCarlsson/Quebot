import Bot from './Bot'
import dotenv from 'dotenv'
dotenv.config()

const b = new Bot(process.env.SLACK_TOKEN)
b.init()