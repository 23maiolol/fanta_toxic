const mongoose = require('mongoose');
const Players = require('./Players')
const Reports = require('./Reports')

const matchesSchema = new mongoose.Schema({
 date: String,
 mvp: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Players'
 },
 toxic: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Players'
 },
 reports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Reports'
 }],
 matchComment: String
});

const Matches = mongoose.model('Matches', matchesSchema)
module.exports = Matches;