// import {GPIO_NUMBER, DURATION} from '../settings'
import resource from '../../resource'
import onoff from 'onoff'



export default class LED {
  constructor() {
    const {gpio} = resource.links.properties.resources.LED.values.customFields
    this.Gpio = onoff.Gpio
    this.led = new this.Gpio(gpio, 'out')
  }

  on() {
    this.led.write(1, (err) => {
      if (err)
      console.log(err)
    })
    setTimeout(() => {
      this.led.writeSync(0)
    }, 1500)
  }
}