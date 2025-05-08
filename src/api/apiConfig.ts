import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://127.0.0.1:3333/',
  headers: {
    Authorization:
      'Bearer MQ.YuhK4MHke8Daqga9Oqj4jwhRL8MKQ3FIJ4rIVTGzcJ1xO4cY-j5A_m23m0OZ',
  },
})


