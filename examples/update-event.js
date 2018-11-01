
/**
 * Note: You need to pass the entire event with the updated field
 * FOMO_TOKEN=<your token> node examples/update-event.js
 */
const FomoClient = require('../')
const client = new FomoClient()

const eventId = 101763780

client.getEvent(eventId).then(savedEvent => {
  savedEvent.first_name = 'Geoff'
  return client.updateEvent(eventId, savedEvent)
})
  .then(updatedEvent => {
    console.log(updatedEvent)
    // FomoEvent {
    //     id: 101763780,
    //     external_id: null,
    //     created_at: '2018-11-01T13:51:38.018Z',
    //     updated_at: '',
    //     message: 'Someone from just ordered Awesome!! from \n\n{{ time_ago }}',
    //     link: null,
    //     event_type_id: 112448,
    //     event_type_tag: '',
    //     url: '',
    //     first_name: 'Geoff',
    //     email_address: 'g.dutton@gmail.com',
    //     ip_address: '',
    //     city: '',
    //     province: '',
    //     country: null,
    //     title: '',
    //     image_url: 'https://s3.amazonaws.com/fomo-static-assets/template-defaults/shoutout.jpg',
    //     custom_event_fields_attributes: [ { key: 'order_type', value: 'Awesome!!' } ] }
  })
  .catch(error => {
    console.log('Aww crap!', error)
  })
