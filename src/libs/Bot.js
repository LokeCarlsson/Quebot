import * as settings from '../settings'
import Botkit from 'botkit'
import axios from 'axios'

export default class Bot {
  constructor(token) {
    this.token = token
  }

  init() {
    const controller = Botkit.slackbot({
      debug: false,
      json_file_store: 'db'
    })

    axios.defaults.baseURL = 'http://dv-rpi4.lnu.se:20080'
    axios.defaults.headers.post['Content-Type'] = 'application/json'

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
      let {name: username, real_name: name} = response.user
      let messageText = message.text.toLowerCase()

      if (message.text.toLowerCase() === 'clear') {
        axios.delete('/message', {
          data: {username}
        })
        .then((response) => {
          bot.reply(message, response.data.msg)
        })
        .catch((err) => {
          bot.reply(message, err.code)
        })  
      } else {
        if (!this.isValidStudentName(messageText)) {
          return bot.reply(message, settings.invalidStudentErrorMessage)
        }
        axios.post('/message', {
          student: messageText,
          name,
          username
        })
        .then((response) => {
          bot.reply(message, response.data.msg)
        })
        .catch((err) => {
          bot.reply(message, err.code)
        })
      }
    })
  }

  isValidStudentName(message) {
    const regExp =  new RegExp('^[a-z]{2}(\\d{2}|\\d{3})[a-z]{2}$')  
    return regExp.test(message)
  }
} 