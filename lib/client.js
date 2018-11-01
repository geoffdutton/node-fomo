
const request = require('superagent')
const FomoEvent = require('./event')
const API_ENDPOINT = 'https://api.fomo.com/api/v1/applications/me'

class FomoClient {
  /**
   * Secret token
   * @param token
   */
  constructor (token) {
    this.token = token || process.env.FOMO_TOKEN
    this.endpoint = API_ENDPOINT
  }

  /**
   * The FomoEvent instance
   * @param {FomoEvent} event
   */
  createEvent (event) {
    return this.post('/events', { event })
      .then(res => new FomoEvent(res.body))
  }

  post (path, data) {
    return request
      .post(`${API_ENDPOINT}${path}`)
      .set('Authorization', `Token ${this.token}`)
      .send(data)
  }
}

FomoClient.Event = data => new FomoEvent(data)

module.exports = FomoClient
