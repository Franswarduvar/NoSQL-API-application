const {Users, Thoughts} = require('../models');

const thoughController = {

    createThought({params, body}, res) {
        Thoughts.create(body)
        .then(({_id}) => {
            return Users.findOneAndUpdate({_id: params.userId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(dbUsersData => {
            if(!dbUsersData){
                res.status(404).json({message: 'Dude got some bad news no user was found with this id :('})
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.json(err))
    },

    getAllThoughts(res) {
        Thoughts.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            consol.log(err);
            res.status(500).json(err);
        });
    },

    getThoughtsById(res) {
        Thoughts.findOne({_id: params.userId})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUsersData => {
            if(!dbUsersData){
                res.status(404).json({message: 'Dude got some bad news no user was found with this id :('})
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => {
            consol.log(err);
            res.sendStatus(400)
        });
    },

    updateThought({params, body}, res) {
        Thoughts.findOneAndUpdate({_id: params.id}, body, {new: true, runValidatores: true})
        .then(dbUsersData => {
            if(!dbUsersData){
                res.status(404).json({message: 'Dude got some bad news no user was found with this id :('})
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.json(err))
    },

    deleteThought({params }, res) {
        Thoughts.findOneAndDelete({_id: params.id})
        .then(dbUsersData => {
            if(!dbUsersData){
                res.status(404).json({message: 'Dude got some bad news no user was found with this id :('})
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.json(err))
    },

    addReaction({params, body}, res) {
        Thoughts.findOneAndUpdate({_id: params.id}, {$push: {reactions: body}}, {new: true, runValidatores: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => {
            if(!dbUsersData){
                res.status(404).json({message: 'Dude got some bad news no user was found with this id :('})
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.json(err))
    },

    deleteReaction({params}, res) {
        Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new: true})
        .then(dbUsersData => {
            if(!dbUsersData){
                res.status(404).json({message: 'Dude got some bad news no user was found with this id :('})
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.json(err))
    }
};

module.exports = thoughController;