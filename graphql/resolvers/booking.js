const Event = require('../../models/events')
const Booking = require('../../models/booking')
const { transformEvent, transformBooking } = require('./merge')

module.exports = {
  bookings: async(args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error('Unauthenticated!')
      }
      const bookings = await Booking.find()
      return bookings.map(booking => {
        return transformBooking(booking)
      })
    } catch (err) {
      throw err
    }
  },
  bookEvent: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error('Unauthenticated!')
      }
      const fetchedEvent = await Event.findOne({ _id: args.eventId })
      const booking = new Booking({
        user: '624bc5c616ce54e4dfbd4bd0',
        event: fetchedEvent
      })
      const result = await booking.save()
      return transformBooking(result)
    } catch (err) {
      throw err
    }
  },
  cancelBooking: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error('Unauthenticated!')
      }
      const booking = await Booking.findById(args.bookingId).populate('event')
      const event = transformEvent(booking.event)
      await Booking.deleteOne({ _id: args.bookingId })
      return event
    } catch (err) {
      throw err
    }
  }
}
