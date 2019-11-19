const router = require('express').Router();

const user = require('../models/user/user.model.server');

//only for testing ednpoint. This end point has no use in UI
router.route('/').get((req,res)=>{
    user.find()
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json('Error: '+err))
});


//to save new users
router.route('/add').post((req,res)=>{
    const body = req.body.user;
    const newUser = new user(body);

    newUser.save()
        .then(()=>res.json('User added!!'))
        .catch(err=>res.status(400).json('Error: '+err))
});

//to validate the user
router.route('/validate').post((req,res)=>{
     const body = req.body.userDetails;
    console.log(body.username);
        user.find({username:body.username,password:body.password})
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json('Error: '+err))

})

module.exports = router;

