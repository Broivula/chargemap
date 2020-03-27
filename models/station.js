// https://docs.mongodb.com/manual/core/2dsphere/

const mongoose = require('mongoose');
const connection = require('./connection');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
  //TODO: schema
  Title: String,
  AddressLine1: String,
  Town: String,
  StateOrProvince: String,
  Postcode: String,
  Connections: [{type: Schema.Types.ObjectId, ref: 'Connection'}],
  Location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number], // first is long, second lat
      required: true,
    }
  },
});

module.exports = mongoose.model('Station', stationSchema);
