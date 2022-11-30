const {user, thoughts} = require('../models');

const userController = {

   getAlluser(res) {
        user.find({})
        .select('-__v')
        .sort({_id: -1})
        .then(dbuserData => res.json(dbuserData))
        .catch(err => {
            consol.log(err);
            res.sendStatus(400);
        });
    },

getUserbyId({params}, res) {
    user.findOne({_id: params.id})
    .populate({
        path: 'thoughts',
        select: '-__v'
    })
    .populate({
        path: 'friends',
        select: '-__v'
    })
    .then(dbuserData => {
        if(!dbuserData){
            res.status(404).json({message: 'Dude got some bad news no user was found with this id'});
            return;
        }
        res.json(dbuserData);
    })
    .catch(err => {
        consol.log(err);
        res.sendStatus(400);
    });
},

    createuser({body}, res) {
        user.create(body)
        .then(dbuserData => res.json(dbuserData))
        .catch(err => res.json(err));
        },

updateUser({params, body}, res) {
    user.findOneAndUpdate({_id: params.id}, body, {new: true, runValidatores: true})
    .then(dbuserData => {
        if(!dbuserData){
            res.status(404).json({message: 'Dude got some bad news no user was found with this id :('})
            return;
        }
        res.json(dbuserData);
    })
    .catch(err => res.json(err))
},

deleteuser({params}, res) {
    user.findOneAndDelete({_id: params.id})
    .then(dbuserData => {
        if(!dbuserData){
            res.status(404).json({message: 'Dude got some bad news no user was found with this id :('})
            return;
        }
        res.json(dbuserData);
    })
    .catch(err => res.json(err))
},

addFriend({params}, res) {
    user.findOneAndUpdate({_id: params.id}, {$push: {friends: params.friendId}}, {new: true})
    .then((dbuserData) => {
        if(!dbuserData){
            res.status(404).json({message: 'Dude got some bad news no user was found with this id :('})
            return;
        }
        res.json(dbuserData);
    })
    .catch(err => res.json(err))
},

deleteFriend({params}, res) {
    user.findOneAndUpdate({_id: params.id}, {$push: {friends: params.friendId}}, {new: true})
    .then((dbuserData) => {
        if(!dbuserData){
            res.status(404).json({message: 'Dude got some bad news no user was found with this id :('})
            return;
        }
        res.json(dbuserData);
    })
    .catch((err) => res.status(400).json(err));
}
};

module.exports = userController;
