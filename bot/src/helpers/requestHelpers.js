import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:20080'
axios.defaults.headers.post['Content-Type'] = 'application/json'

export const deleteMessage = payload => {
  return axios.delete('/actions/lcdState', payload)
}

export const publishMessage = payload => {
  console.log(payload)
  // return axios.post('/actions/lcdState', payload)
}
