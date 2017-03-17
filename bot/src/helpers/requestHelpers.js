import axios from 'axios'

axios.defaults.baseURL = 'http://dv-rpi4.lnu.se:20080'
axios.defaults.headers.post['Content-Type'] = 'application/json'



export const deleteMessage = payload => {
  // return axios.delete('path', payload)
  throw new Error('Ae de funkante')
}


export const publishMessage = payload => {
  // return axios.post('path', payload)
  throw new Error('Ae de funkante')
}
