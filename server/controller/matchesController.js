const Matches = require('../model/Matches')
const Players = require('../model/Players')
const Reports = require('../model/Reports')

const createReports = (reports) => {
    let reportsList = []

    console.log(reportsList)
    return reportsList
}


exports.retrieveAllMatches = (req, res) => {
    Matches.find({}).populate({
        path: 'reports',
        populate: { path: 'player', select: 'name surname nickname' }
    }).populate(
        {
            path: 'mvp',
            select: 'name surname nickname'
        }).populate(
            {
                path: 'toxic',
                select: 'name surname nickname'
            }).then(data => {
                let newData = data.map((match) => {
                    return {
                        _id: match._id,
                        date: match.date,
                        mvp: match.mvp,
                        toxic: match.toxic,
                        matchComment: match.matchComment,
                        reports: match.reports.map((report) => {
                            return {
                                _id: report._id,
                                player: report.player,
                                vote: parseFloat(report.vote),
                                comment: report.comment,
                            }
                        })
                    }
                })
                res.send(newData)
            })
};


exports.createMatch = (req, res) => {
    Matches.findOne({ date: req.body.date }).then(match => {
        console.log(match)
        if (!match)
            return Matches.create({
                date: req.body.date,
                mvp: req.body.mvp,
                toxic: req.body.toxic,
                matchComment: req.body.matchComment,
                reports: []
            }).then(match => {
                Players.findByIdAndUpdate(match.toxic, { $push: { toxic: match._id } }).then(data => console.log('toxic inserted'))
                Players.findByIdAndUpdate(match.mvp, { $push: { mvp: match._id } }).then(data => console.log('mvp inserted'))
                req.body.playersList.map((id) => {
                    Players.findByIdAndUpdate(id, { $push: { matchList: match._id } }).then(data => console.log('match inserted'))
                })
                req.body.reports.map((report) => {
                    Reports.create({
                        player: report.playerId,
                        vote: report.vote,
                        comment: report.comment
                    }).then(newReport => {
                        Players.findByIdAndUpdate(report.playerId, { $push: { votes: report.vote } }).then(data => console.log('report inserted'))
                        Matches.findByIdAndUpdate(match._id, { $push: { reports: newReport._id } }).then(data => console.log('report updated'))
                    })

                })
            }).then(data => res.sendStatus(200))
        else 
            return res.sendStatus(409)
    })



}