const router = require('express').Router();

const user = require('../models/user/user.model.server');

//find all users
router.route('/').get((req,res)=>{
    user.find()
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json('Error: '+err))
});



//find by username
router.route('/username').get((req,res)=>{
    let query = req.query.q;
    console.log(query)
    user.find({username:query})
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json('Error: '+err))
});



//to save new users
router.route('/register').post((req,res)=>{
    const body = req.body;
    const newUser = new user(body);

    newUser.save()
        .then(()=>res.json('User added!!'))
        .catch(err=>res.status(400).json('Error: '+err))
});

//to update the user
router.route('/updateUser').put((req,res)=>{
    console.log("hi");
  console.log(req.body);
   userModel.updateOne(
    { username: req.body.username},
    { $set:
       {
         first_name: req.body.first_name,
         last_name: req.body.last_name,
         password: req.body.password,
         address: {
           address : req.body.address.address,
           pincode : req.body.address.pincode,
           city  : req.body.address.city,
           state : req.body.address.state,
           country: req.body.address.country
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

