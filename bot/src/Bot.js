import Botkit from 'botkit'
import {
  deleteMessage, 
  publishMessage
} from './helpers/requestHelpers'

export default class Bot {
  constructor(token) {

    if (!token) throw new Error(`Token cannot be ${token}`)

    this.token = token
    this.removeMessage = 'Your message has been removed'
    this.removeErrorMessage = 'You did not have a messages to remove!'
    this.invalidStudentErrorMessage = 'That\'s not a student! Use xx00(0)xx :wink:'
  }

  init() {
    const controller = Botkit.slackbot({
      debug: false,
      json_file_store: 'db'
    })

    controller.spawn({ token: this.token }).startRTM()

    controller.on('direct_message', (bot, message) => {
      this.message(bot, message)
    })

    controller.on('direct_mention', (bot, message) => {
      this.message(bot, message)
    })

    controller.on('mention', (bot, message) => {
      this.message(bot, message)
    })
  }

  message(bot, message) {
    bot.api.users.info({user: message.user}, (error, response) => {
      const {name: username, real_name: name} = response.user
      const messageText = message.text.toLowerCase()

      switch (messageText) {
        case 'clear':
          this.handleClearMessage(bot, message, username)
          break
        default:
          this.handleNewMessge(bot, message, {username, name, messageText})
          break
      }
    })
  }

  async handleClearMessage(bot, message, username) {
    try {
      const response = await deleteMessage({data: {username}})
      bot.reply(message, this.removeMessage)
    } catch (e) {
      bot.reply(message, 'Internal Bot Error - a trained AI has been sent to investigate')
      console.log(e) // Keeping for error logging
    }
  }

  async handleNewMessge(bot, message, messageConfig) {
    if (!this.isValidStudentName(messageConfig.messageText)) 
      return bot.reply(message, this.invalidStudentErrorMessage)

    try {
      await publishMessage(messageConfig)
      return bot.reply(message, this.invitedMessage(messageConfig.messageText))
    } catch (e) {
      bot.reply(message, 'Internal Bot Error - a trained AI has been sent to investigate')
      console.log(e) // Keeping for error logging
    }
  }

  isValidStudentName(message) {
    const regExp =  new RegExp('^[a-z]{2}(\\d{2}|\\d{3})[a-z]{2}$')  
    return regExp.test(message)
  }

  invitedMessage(student) {
    return `${student} has been summoned`
  } 
}