const router = require('express').Router();

const user = require('../models/user/user.model.server');

//find all users
router.route('/').get((req, res) => {
  //console.log("deepak");  
  user.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
});



//find by username
router.route('/username').get((req, res) => {
  let query = req.query.q;
  console.log(query)
  user.find({ username: query })
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
});



//to save new users
router.route('/register').post((req, res) => {
  const body = req.body;
  const newUser = new user(body);

  newUser.save()
    .then(() => res.json('User added!!'))
    .catch(err => res.status(400).json('Error: ' + err))
});

//to update the user
router.route('/updateUser').put((req, res) => {
  console.log("update-server");
  console.log(req.body);
  console.log(req.body.user.username);
  console.log(req.body.user.first_name);
  console.log(req.body.user.address.country);
  user.updateOne(
    { username: req.body.user.username },
    {
      $set:
      {
        first_name: req.body.user.first_name,
        last_name: req.body.user.last_name,
        password: req.body.user.password,
        address: {
          address: req.body.user.address.address,
          pincode: req.body.user.address.pincode,
          city: req.body.user.address.city,
          state: req.body.user.address.state,
          country: req.body.user.address.country
        }

      }
    }
  ).then((data) => {
    if (data.nModified <= 0)
      res.send({ status: 'Username does not exist.' });
    else if (data.nModified > 0)
      res.send({ status: 'User update.' });
  })
    .catch(err =>
      res.send({ status: 'failed to updateuser', message: err })
    );

});

router.route('/deleteUser').delete((req, res) => {
  user.findOne({ username: req.body.username })
    .then(users => {
      console.log(users);
      // console.log("HH1", users.usertype);
      if(users === null)
        res.status(200).json({ 'status': 200, 'message': 'User not found' });
      else if (users.usertype === "admin")
        res.status(200).json({ 'status': 200, 'message': 'Cannot delete admin' });
      else {
        user.deleteOne(
          { username: req.body.username }, (err, data) => {
            if (err)
              res.statusCode(500).json({ status: 'fail', info: error });
            if (data.deletedCount <= 0)
              res.status(202).json({
                'status': 202,
                'message': `user ${req.body.username} does not exist.`
              });
            else
              res.status(201).json({ 'status': 201, 'message': `user ${req.body.username} deleted.` });
          }
        )
      }
    });
})

module.exports = router;