import resource from '../../resource'
import LCD from './LCD'
import LED from './LED'
import MessageQue from './MessageQue'

const {
  enable,
  register,
  d4,
  d5, 
  d6, 
  d7,
  cols,
  rows
} = resource.links.properties.resources.LCD.values

const config = {
  rs: register,
  e: enable,
  data: [d4, d5, d6, d7],
  cols,
  rows 
}

// const led = new LED()
// const lcd = new LCD(config)
// const mq = new MessageQue(lcd, led)

// export default mq