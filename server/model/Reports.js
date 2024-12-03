const mongoose = require('mongoose');
const Players = require('../model/Players.js')

const reportsSchema = new mongoose.Schema({
 player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Players'
 },
 vote: mongoose.Schema.Types.Decimal128,
 comment: String
});

const Reports = mongoose.model('Reports', reportsSchema)
module.exports = Reports;