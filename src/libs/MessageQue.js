import User from '../model/User'

export default class MessageQue {  
  constructor(lcd, led) {
    this.messageQueInterval = null
    this.messageQueIndex = 0
    this.messageQueLength = 0
    this.lcd = lcd
    this.led = led
    this.lcd.publish()
    this.messageList = []
    
  }

  async updateMessageQue() {
    try {
      this.messageList = await User.find()
      this.messageQueLength = this.messageList.length

      if (this.messageQueLength > 0) {
        this.updateInterval()
      } else {
        clearInterval(this.messageQueInterval)
        this.messageQueInterval = null
        this.lcd.lcd.clear()
      }

    } catch (error) {
      console.log(error)
    }
  }

  updateInterval() {
    this.messageQueInterval === null ? 
    this.startInterval() : this.restartInterval()
  }

  startInterval() {
    this.messageQueInterval = setInterval(() => {
      const {message} = this.messageList[this.messageQueIndex]
      this.led.on()
      this.lcd.displayMessage(message)
      this.messageQueIndex = (this.messageQueIndex + 1) % this.messageQueLength
    }, 15000)
  }

  restartInterval() {
    clearInterval(this.messageQueInterval)
    this.messageQueInterval = null
    this.updateInterval()
  }

}

