const Users = require('../models');

const userController = {
    createUser({body}, res) {
        Users.create(body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => res.status(400).json(err));
    },



   getAllUsers(req, res) {
        Users.find({})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            consol.log(err);
            res.statue(500).json(err);
        });
    },

getUserbyId({params}, res) {
    Users.User.findOne({_id: params.id})
    .populate({
        path: 'thoughts',
        select: '-__v'
    })
    .populate({
        path: 'friends',
        select: '-__v'
    })
    .then(dbUsersData => {
        if(!dbUsersData){
            res.status(404).json({message: 'Dude got some bad news no user was found with this id :('})
            return;
        }
        res.json(dbUsersData);
    })
    .catch(err => {
        consol.log(err);
        res.statue(400).json(err);
    });
},

updateUser({params, body}, res) {
    Users.User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidatores: true})
    .then(dbUsersData => {
        if(!dbUsersData){
            res.status(404).json({message: 'Dude got some bad news no user was found with this id :('})
            return;
        }
        res.json(dbUsersData);
    })
    .catch(err => res.json(err))
},

deleteUsers({params}, res) {
    Users.findOneAndDelete({_id: params.id})
    .then(dbUsersData => {
        if(!dbUsersData){
            res.status(404).json({message: 'Dude got some bad news no user was found with this id :('})
            return;
        }
        res.json(dbUsersData);
    })
    .catch(err => res.json(err))
},

addFriend({params}, res) {
    User.findOneAndUpdate({_id: params.id}, {$push: {friends: params.friendId}}, {new: true})
    .then((dbUsersData) => {
        if(!dbUsersData){
            res.status(404).json({message: 'Dude got some bad news no user was found with this id :('})
            return;
        }
        res.json(dbUsersData);
    })
    .catch(err => res.json(err))
},

deleteFriend({params}, res) {
    User.findOneAndUpdate({_id: params.id}, {$push: {friends: params.friendId}}, {new: true})
    .then((dbUsersData) => {
        if(!dbUsersData){
            res.status(404).json({message: 'Dude got some bad news no user was found with this id :('})
            return;
        }
        res.json(dbUsersData);
    })
    .catch((err) => res.status(400).json(err));
}
};

module.exports = userController;
