
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
    return this._post('/events', { event })
      .then(res => new FomoEvent(res.body))
  }

  getEvent (id) {
    return this._get(`/events/${id}`)
      .then(res => new FomoEvent(res.body))
  }

  _get (path) {
    return request
      .get(`${API_ENDPOINT}${path}`)
      .set('Authorization', `Token ${this.token}`)
  }

  /**
   *
   * @param path
   * @param data
   * @returns {Request|*|void}
   * @private
   */
  _post (path, data) {
    return request
      .post(`${API_ENDPOINT}${path}`)
      .set('Authorization', `Token ${this.token}`)
      .send(data)
  }
}

FomoClient.Event = data => new FomoEvent(data)

module.exports = FomoClient
