const mongoose = require('mongoose');
const Matches = require('../model/Matches');

const playersSchema = new mongoose.Schema({
 name: String,
 surname: String,
 nickname: String,
 role: String,
 matchList: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Matches'
    }
 ],
 votes: [mongoose.Schema.Types.Decimal128],
 toxic: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Matches'
    }
 ],
 mvp: [
   {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Matches'
   }
 ]
});

const Players = mongoose.model('Players', playersSchema)
module.exports = Players;