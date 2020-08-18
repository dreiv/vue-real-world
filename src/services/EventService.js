import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000 // Throw an error if API call takes longer than 10s
})

export default {
  getEvents(perPage, page) {
    const params = {
      _limit: perPage,
      _page: page
    }

    return apiClient.get('/events', { params })
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  }
}
