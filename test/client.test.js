
const fakeToken = 'some-fomo-token'
const FomoEvent = require('../lib/event')
const FomoClient = require('../lib/client')
const request = require('superagent')
jest.mock('superagent')

describe('FomoClient', () => {
  let client

  beforeEach(() => {
    request.__reset()
    client = new FomoClient(fakeToken)
  })

  it('creates client', () => {
    expect(client.token).toBe(fakeToken)
  })

  it('optionally uses process.env.FOMO_TOKEN', () => {
    process.env.FOMO_TOKEN = 'different-token'
    const c = new FomoClient()
    expect(c.token).toBe('different-token')
    delete process.env.FOMO_TOKEN
  })

  it('POSTs', () => {
    client.post('/path', { some: 'data' })
    expect(request.post).toHaveBeenCalledWith(`${client.endpoint}/path`)
    expect(request.set).toHaveBeenCalledWith('Authorization', `Token ${client.token}`)
    expect(request.send).toHaveBeenCalledWith({ some: 'data' })
  })

  describe('routes', () => {
    beforeEach(() => {
      jest.spyOn(client, 'post')
    })

    it('POSTs an event', () => {
      request.__setMockResponseBody({
        'id': 1,
        'external_id': 'adf23r',
        'event_type_id': '123',
        'url': 'http://fomo.com',
        'first_name': 'John',
        'city': 'New York',
        'country': 'US',
        'title': 'San Francisco Dealership',
        'image_url': 'http://newevent.com',
        'created_at_to_seconds_from_epoch': 1123123123,
        'message': 'John from New York just got a new Corvette at our San Francisco Dealership',
        'link': 'http://fomo.com/some-awesome-link?utm_source=fomo&utm_medium=notification',
        'custom_event_fields_attributes': [
          {
            'key': 'model',
            'value': 'Corvette'
          }
        ]
      })

      const event = new FomoEvent({
        'event_type_id': '123',
        'external_id': 'adf23r',
        'first_name': 'John',
        'email_address': 'john@fomo.com',
        'ip_address': '128.177.108.102',
        'city': 'New York',
        'country': 'USA',
        'title': 'Manhattan Dealership',
        'image_url': 'http://some-car-image.png',
        'url': 'http://dealership.com/some-great-car',
        'custom_event_fields_attributes': [
          { 'key': 'model', 'value': 'Corvette' }
        ]
      })

      return client.createEvent(event)
        .then(savedEvent => {
          expect(client.post).toHaveBeenCalledWith('/events', { event })
          expect(savedEvent).toBeInstanceOf(FomoEvent)
        })
    })
  })
})
