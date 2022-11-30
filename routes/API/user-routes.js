const router = require('express').Router();

const {
    getAlluser,
    getUserbyId,
    createuser,
    updateUser,
    deleteuser,
    addFriend,
    deleteFriend
  } = require('../../controllers/user-controller');

  router.route('/').get(getAlluser).post(createuser);

  router.route('/:id').get(getUserbyId).put(updateUser).delete(deleteuser);

  router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);

  module.exports = router;