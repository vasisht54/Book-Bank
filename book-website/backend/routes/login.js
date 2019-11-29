const router = require('express').Router();

const user = require('../models/user/user.model.server');

//find all users
router.route('/').get((req,res)=>{
    user.find()
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json('Error: '+err))
});


//to save new users
router.route('/register').post((req,res)=>{
    const body = req.body.user;
    const newUser = new user(body);

    newUser.save()
        .then(()=>res.json('User added!!'))
        .catch(err=>res.status(400).json('Error: '+err))
});

//to update the user
router.route('/updateUser').put((req,res)=>{
    console.log("hi");
  console.log(req.body.user);
   userModel.updateOne(
    { username: req.body.user.username},
    { $set:
       {
         first_name: req.body.user.first_name,
         last_name: req.body.user.last_name,
         password: req.body.user.password,
         address: {
           address : req.body.user.address.address,
           pincode : req.body.user.address.pincode,
           city  : req.body.user.address.city,
           state : req.body.user.address.state,
           country: req.body.user.address.country
         }

       }
    }
 ) .then(() => res.send('user updated'))
 .catch(err => res.send({ status: 'failed to updateuser', message: err }));

});

router.route('/deleteUser').delete((req,res)=>{
  console.log(req.body.user);
   user.deleteOne(
    { username: req.body.user.username},
 ) .then(() => res.send('user deleted'))
 .catch(err => res.send({ status: 'failed to delete', message: err }));

})

module.exports = router;

