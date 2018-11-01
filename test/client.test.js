
const fakeToken = 'some-fomo-token'
const FomoEvent = require('../lib/event')
const FomoClient = require('../lib/client')
const request = require('superagent')
jest.mock('superagent')

const exampleResponse = {
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
}

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

  it('GETs', () => {
    client._get('/something/3')
    expect(request.get).toHaveBeenCalledWith(`${client.endpoint}/something/3`)
    expect(request.set).toHaveBeenCalledWith('Authorization', `Token ${client.token}`)
  })

  it('GETs with query params', () => {
    client._get('/something', { some: 'querything' })
    expect(request.get).toHaveBeenCalledWith(`${client.endpoint}/something`)
    expect(request.set).toHaveBeenCalledWith('Authorization', `Token ${client.token}`)
    expect(request.query).toHaveBeenCalledWith({ some: 'querything' })
  })

  it('PATCHes', () => {
    client._patch('/path', { some: 'data' })
    expect(request.patch).toHaveBeenCalledWith(`${client.endpoint}/path`)
    expect(request.set).toHaveBeenCalledWith('Authorization', `Token ${client.token}`)
    expect(request.send).toHaveBeenCalledWith({ some: 'data' })
  })

  it('DELETEs', () => {
    client._delete('/something/3')
    expect(request.delete).toHaveBeenCalledWith(`${client.endpoint}/something/3`)
    expect(request.set).toHaveBeenCalledWith('Authorization', `Token ${client.token}`)
  })

  describe('routes', () => {
    beforeEach(() => {
      jest.spyOn(client, '_post')
      jest.spyOn(client, '_patch')
      client._get = jest.fn().mockResolvedValue({ body: exampleResponse })
      client._delete = jest.fn().mockResolvedValue({
        body: {
          message: 'Event successfully deleted'
        }
      })
      request.__setMockResponseBody(exampleResponse)
    })

    test('createEvent', () => {
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
          expect(client._post).toHaveBeenCalledWith('/events', { event })
          expect(savedEvent).toBeInstanceOf(FomoEvent)
          expect(savedEvent.city).toBe('New York')
        })
    })

    test('getEvent', () => {
      return client.getEvent(1)
        .then(savedEvent => {
          expect(client._get).toHaveBeenCalledWith('/events/1')
          expect(savedEvent).toBeInstanceOf(FomoEvent)
          expect(savedEvent.id).toBe(1)
        })
    })

    test('findEvent', () => {
      return client.findEvent('email_address', 'john@fomo.com')
        .then(savedEvent => {
          expect(client._get)
            .toHaveBeenCalledWith('/events/find', { field: 'email_address', q: 'john@fomo.com' })
          expect(savedEvent).toBeInstanceOf(FomoEvent)
        })
    })

    test('getEvents', () => {
      // For brevity, just return the ids, but it will return an array of FomoEvents
      client._get = jest.fn().mockResolvedValue({ body: [{ id: 3 }, { id: 78 }] })
      return client.getEvents()
        .then(events => {
          expect(client._get).toHaveBeenCalledWith('/events', undefined)
          expect(events).toHaveLength(2)
          expect(events[0]).toBeInstanceOf(FomoEvent)
          expect(events[1].id).toBe(78)
        })
    })

    test('getEvents with options', () => {
      // For brevity, just return the ids, but it will return an array of FomoEvents
      client._get = jest.fn().mockResolvedValue({ body: [{ id: 3 }, { id: 78 }] })
      return client.getEvents({ per_page: 10, order_by: 'event_type_id' })
        .then(events => {
          expect(client._get)
            .toHaveBeenCalledWith('/events', { per_page: 10, order_by: 'event_type_id' })
          expect(events).toHaveLength(2)
          expect(events[0]).toBeInstanceOf(FomoEvent)
          expect(events[1].id).toBe(78)
        })
    })

    test('updateEvent', () => {
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

      return client.updateEvent(1, event)
        .then(savedEvent => {
          expect(client._patch).toHaveBeenCalledWith('/events/1', { event })
          expect(savedEvent).toBeInstanceOf(FomoEvent)
          expect(savedEvent.external_id).toBe('adf23r')
        })
    })

    test('deleteEvent', () => {
      return client.deleteEvent(1)
        .then(res => {
          expect(client._delete).toHaveBeenCalledWith('/events/1')
          expect(res.message).toBe('Event successfully deleted')
        })
    })
  })
})
