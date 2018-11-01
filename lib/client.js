
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
   * @param {number} id - event id
   * @param {FomoEvent} event
   */
  updateEvent (id, event) {
    return this._patch(`/events/${id}`, { event })
      .then(res => new FomoEvent(res.body))
  }

  /**
   * @param id
   */
  getEvent (id) {
    return this._get(`/events/${id}`)
      .then(res => new FomoEvent(res.body))
  }

  /**
   * @param id
   */
  deleteEvent (id) {
    return this._delete(`/events/${id}`)
      .then(res => res.body)
  }

  /**
   *
   * @param {Object} [options] - optional query params
   * @param {boolean} [options.show_meta] - Using this option returns different JSON output. total_count, total_pages, page and per_page are returned in meta attribute
   * @param {number} [options.per_page] - Returns only limited amount of events in response
   * @param {number} [options.page] - Page with events which will be returned
   * @param {string} [options.order_by] - Use created_at or event_type_id
   * @param {string} [options.order_direction] - Use asc for ascending and desc for descending ordering of returned events
   */
  getEvents (options) {
    return this._get(`/events`, options)
      .then(res => res.body.map(e => new FomoEvent(e)))
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

  _patch (path, data) {
    return request
      .patch(`${API_ENDPOINT}${path}`)
      .set('Authorization', `Token ${this.token}`)
      .send(data)
  }

  _delete (path) {
    return request
      .delete(`${API_ENDPOINT}${path}`)
      .set('Authorization', `Token ${this.token}`)
  }
}

FomoClient.Event = data => new FomoEvent(data)

module.exports = FomoClient
