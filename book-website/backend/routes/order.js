const router = require('express').Router();
const axios = require('axios');

const order = require('../models/order/order.model.server');

require('dotenv').config();
let url = process.env.URL;


//get all user cart
router.route('/getUserOrders').get((req,res)=>{
    let query = req.query.q;
    order.find({buyer:query})
        .then(cart=>res.json(cart))
        .catch(err=>res.status(400).json('Error: '+err))
});



//add to cart
router.route('/addToOrder').post((req,res)=>{
    let body = req.body;
    const newOrder = new order(body);
    newOrder.save()
        .then(()=>res.json({status:'Order placed'}))
        .catch(err=>res.status(400).json('Error: '+err))
});


//to delete orders based on username and item
router.route('/deleteBooksFromOrder').delete(async(req,res)=>{
    // console.log("user", user.data);
    // console.log("length",user.data[0].length);
    let buyer = req.body.buyer;
    let book = req.body.book;
     order.deleteOne(
        {buyer:buyer,book:book},
     ).then((data) => {
        if(data.deletedCount==0){
            res.send({status:'this book is not in order'});
        }else{
            res.send({status:'book deleted from cart'});
        }
     })
     .catch(err => res.send({ status: 'failed to delete book from cart', message: err }));
  })



  router.route('/deleteOrderById').delete(async(req,res)=>{
    // console.log("user", user.data);
    // console.log("length",user.data[0].length);

     order.deleteOne(
        {buyer:buyer,book:book},
     ).then((data) => {
        if(data.deletedCount==0){
            res.send({status:'this book is not in order'});
        }else{
            res.send({status:'book deleted from cart'});
        }
     })
     .catch(err => res.send({ status: 'failed to delete book from cart', message: err }));
  })




module.exports = router;