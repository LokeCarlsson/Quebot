import settings from '../settings'
import Botkit from 'botkit'
import axios from 'axios'

export default class Bot {
  constructor(token) {
    this.token = token
  }

  init() {
    console.log('bot - init')
    const controller = Botkit.slackbot({
      debug: false,
      json_file_store: 'db'
    })

    axios.defaults.baseURL = 'http://dv-rpi4.lnu.se:20080'
    // axios.defaults.baseURL = 'http://localhost:20080'
    axios.defaults.headers.post['Content-Type'] = 'application/json'

    controller.spawn({ token: this.token }).startRTM()

    // controller.on(['direct_message, direct_mention, mention'], (bot, message) => {
    controller.on('direct_message', (bot, message) => {
      this.message(bot, message)
    })
  }

  message(bot, message) {
    console.log('bot - message')
    bot.api.users.info({user: message.user}, (error, response) => {
      let {name: username, real_name: name} = response.user
      
      if (message.text === 'clear') {
        axios.delete('/message', {
          data: {username}
        })
        .then((response) => {
          console.log('bot deleted ', username)
          console.log(response.data)
          bot.reply(message, response.data.msg)
        })
        .catch((err) => {
          console.log(err)
          bot.reply(message, err.code)
        })  
      } else {
        axios.post('/message', {
          student: message.text,
          name,
          username
        })
        .then((response) => {
          console.log('bot',response.data)
          bot.reply(message, response.data.msg)
        })
        .catch((err) => {
          console.log(err)
          bot.reply(message, err.code)
        })
      }
    })
  }
} 