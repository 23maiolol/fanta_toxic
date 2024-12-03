const Players = require('../model/Players')

exports.retrieveAllPlayers = (req, res) => {
    Players.find({}).populate('matchList').then(data => {
        let modData = data.map((player) => {
            return {
                _id: player._id,
                name: player.name,
                surname: player.surname,
                nickname: player.nickname,
                role: player.role,
                matchList: player.matchList,
                votes: player.votes.map((obj) => parseFloat(obj)),
                mvp: player.mvp,
                toxic: player.toxic
            }
        })
        res.send(modData)
    })
};


exports.createPlayer = (req, res) => {
    Players.findOne({ name: req.body.name, surname: req.body.surname, nickname: req.body.nickname })
        .then(player => {
            if (!player)
                return Players.create([{
                    name: req.body.name,
                    surname: req.body.surname,
                    nickname: req.body.nickname,
                    role: req.body.role,
                    votes: [],
                    matchList: [],
                    toxic: [],
                    mvp: []
                }]).then(data => res.sendStatus(200))
            else
                return res.sendStatus(409)
        })
}