const router = require('express').Router();
const axios = require('axios');

const accessories = require('../models/accesories/accessories.model.server');
require('dotenv').config();
let url = process.env.URL;


//get all accessories
router.route('/getAllAccessories').get((req,res)=>{
    accessories.find()
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json('Error: '+err))
});



//add Accessories
//add book
router.route('/addAccessory').post(async(req,res)=>{
    const body = req.body;
    let user = await axios.get(url+"user/username?q="+body.seller);
    if(user.data.length==1){
    body.seller = user.data[0]._id;
    const newAcc = new accessories(body);
    newBook.save()
        .then(()=>res.json({status:'Book added!!'}))
        .catch(err=>res.status(400).json('Error: '+err))
    }else{
        res.send({status:'failed to find seller'});
    }

});