
/**
 * Credit: https://github.com/usefomo/fomo-nodejs-sdk/blob/master/lib/fomo_event.js
 */

class FomoEvent {
  constructor (data) {
    /**
     * Id of the event type (needed only for the update)
     * @type {string}
     */
    this.id = ''

    /**
     * Created timestamp (received info)
     * @type {string}
     */
    this.created_at = ''

    /**
     * Updated timestamp (received info)
     * @type {string}
     */
    this.updated_at = ''

    /**
     * Message template (received info)
     * @type {string}
     */
    this.message = ''

    /**
     * Full link (received info)
     * @type {string}
     */
    this.link = ''

    /**
     * Event type unique ID (required)
     * @type {string}
     */
    this.event_type_id = ''

    /**
     * Event type tag (optional|required if event_type_id = '')
     * @type {string}
     */
    this.event_type_tag = ''

    /**
     * Url to redirect on the event click. Size range: 0..255 (required)
     * @type {string}
     */
    this.url = ''

    /**
     * First name of the person on the event. Size range: 0..255
     * @type {string}
     */
    this.first_name = ''

    /**
     * Email address of the person on the event. Size range: 0..255
     * @type {string}
     */
    this.email_address = ''

    /**
     * IP address of the person on the event. Size range: 0..255
     * @type {string}
     */
    this.ip_address = ''

    /**
     * City where the event happened. Size range: 0..255
     * @type {string}
     */
    this.city = ''

    /**
     * Province where the event happened. Size range: 0..255
     * @type {string}
     */
    this.province = ''

    /**
     * Country where the event happened ISO-2 standard. Size range: 0..255
     * @type {string}
     */
    this.country = ''

    /**
     * Title of the event. Size range: 0..255
     * @type {string}
     */
    this.title = ''

    /**
     * Url of the image to be displayed. Size range: 0..255
     * @type {string}
     */
    this.image_url = ''

    /**
     * Array to create custom event fields
     * @type {[]}
     */
    this.custom_event_fields_attributes = []

    if (typeof data === 'object') {
      Object.keys(data).forEach(prop => {
        if (this.hasOwnProperty(prop)) {
          this[prop] = data[prop]
        }
      })
    }
  }

  addCustomAttribute (key, value) {
    this.custom_event_fields_attributes.push({ key, value })
  }
}

module.exports = FomoEvent
