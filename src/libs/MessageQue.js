import User from '../model/User'

export default class MessageQue {  
  constructor(lcd) {
    this.messageQueInterval = null
    this.messageQueIndex = 0
    this.messageQueLength = 0
    this.lcd = lcd
    this.lcd.publish()
    this.messageList = []
    
  }

  async updateMessageQue() {
    console.log('updating message que')
    try {
      this.messageList = await User.find()
      this.messageQueLength = this.messageList.length

      console.log(`MessageQue ${this.messageQueLength}`)


      if (this.messageQueLength > 0) {
        console.log('Found messages!')
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
    console.log('Updating interval!')
    this.messageQueInterval === null ? 
    this.startInterval() : this.restartInterval()
  }

  startInterval() {
    console.log('Starting interval!')
    this.messageQueInterval = setInterval(() => {
      const {message} = this.messageList[this.messageQueIndex]
      console.log('Publishing to lcd')
      this.lcd.displayMessage(message)
      this.messageQueIndex = (this.messageQueIndex + 1) % this.messageQueLength
    }, 3000)
  }

  restartInterval() {
    console.log('Resetting interval!')
    clearInterval(this.messageQueInterval)
    this.messageQueInterval = null
    this.updateInterval()
  }

}

