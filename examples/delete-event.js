/**
 * FOMO_TOKEN=<your token> node examples/delete-event.js
 */
const FomoClient = require('../')
const client = new FomoClient()

client.deleteEvent(101763491).then(event => {
  console.log(event)
  // { message: 'Event successfully deleted' }
})
  .catch(error => {
    console.log('Aww crap!', error)
  })
