const Event = require('../../models/events')
const { transformEvent } = require('./merge')
const User = require('../../models/user')

module.exports = {
  events: async () => {
    try {
      const events = await Event.find({})
      return events.map(event => {
        return transformEvent(event)
      })
    } catch (err) {
      throw err
    }
  },
  createEvent: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error('Unauthenticated!')
      }
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: '624bc5c616ce54e4dfbd4bd0'
      })
      const result = await event.save()
      const createdEvent = transformEvent(result)
      const creator = await User.findById('624bc5c616ce54e4dfbd4bd0')
      if (!creator) {
        throw new Error('User not found')
      }
      creator.createdEvents.push(event)
      await creator.save()
      return createdEvent
    } catch (err) {
      throw err
    }
  }
}
