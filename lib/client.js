
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
   * @param {FomoEvent} event
   */
  createEvent (event) {
    return this._post('/events', { event })
      .then(res => new FomoEvent(res.body))
  }

  /**
   * @param id
   */
  getEvent (id) {
    return this._get(`/events/${id}`)
      .then(res => new FomoEvent(res.body))
  }

  findEvent (field, q) {
    return this._get(`/events/find`, { field, q })
      .then(res => new FomoEvent(res.body))
  }

  /**
   * @param path
   * @param params
   * @private
   */
  _get (path, params) {
    const req = request
      .get(`${API_ENDPOINT}${path}`)
      .set('Authorization', `Token ${this.token}`)

    if (typeof params === 'object') {
      req.query(params)
    }

    return req
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
