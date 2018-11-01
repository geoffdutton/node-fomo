/**
 * FOMO_TOKEN=<your token> node examples/create-event.js
 */
const FomoClient = require('../')
const client = new FomoClient()

const event = FomoClient.Event({
  event_type_tag: 'new_order',
  ip: '135.84.167.43',
  email_address: 'g.dutton@gmail.com'
})

event.addCustomAttribute('order_type', 'Awesome!!')

client.createEvent(event).then(savedEvent => {
  console.log(savedEvent)
  // FomoEvent {
  //     id: 101763780,
  //     created_at: '2018-11-01T13:51:38.018Z',
  //     updated_at: '',
  //     message: 'Someone from just ordered Awesome!! from \n\n{{ time_ago }}',
  //     link: null,
  //     event_type_id: 112448,
  //     event_type_tag: '',
  //     url: '',
  //     first_name: '',
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
