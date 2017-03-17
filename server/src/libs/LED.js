// import {GPIO_NUMBER, DURATION} from '../settings'
import onoff from 'onoff'

export default class LED {
  constructor() {
    this.Gpio = onoff.Gpio
    this.led = new this.Gpio(GPIO_NUMBER, 'out')
  }

  on() {
    this.led.write(1, (err) => {
      if (err)
      console.log(err)
    })
    setTimeout(() => {
      this.led.writeSync(0)
    }, DURATION)
  }
}