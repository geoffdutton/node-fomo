
const FomoEvent = require('../lib/event')

describe('FomoEvent', () => {
  it('adds custom attributes', () => {
    const event = new FomoEvent()
    event.event_type_tag = 'some_template'
    event.addCustomAttribute('some', 'val')
    expect(event.custom_event_fields_attributes).toEqual([{
      key: 'some',
      value: 'val'
    }])
  })

  it('only sets defined props', () => {
    const event = new FomoEvent({ id: 123, wrong: 'thing' })
    expect(event.id).toBe(123)
    expect(event.wrong).toBeUndefined()
  })
})
