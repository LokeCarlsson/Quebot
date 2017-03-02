import lcdScreen from 'lcd'

export default class LCD {
  constructor(config) {
    this.lcd = new lcdScreen(config)
    this.attachTurnOffProcedures()
  }

  publish() {
    this.lcd.on('ready', error => {
      if (error) throw error
    })
  }

  displayMessage(message) {
    const {firstRow, secondRow} = message

    this.lcd.cursor()
    this.lcd.clear()
    this.lcd.print(firstRow)
    this.lcd.home(() => {
      this.lcd.setCursor(0, 1)
      this.lcd.print(secondRow)
    })
  }



  attachTurnOffProcedures() {
    process.on('SIGINT', (e) => {
      if (e) {
        throw e
      }
      this.lcd.clear()
      this.lcd.close()
      process.exit(0)
    })
  }
}


