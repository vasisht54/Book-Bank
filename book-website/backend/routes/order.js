const router = require('express').Router();
const axios = require('axios');

const order = require('../models/order/order.model.server');

require('dotenv').config();
let url = process.env.URL;


//get all user order
router.route('/getUserOrders').get((req,res)=>{
    let query = req.query.q;
    order.find({buyer:query})
        .then(cart=>res.json(cart))
        .catch(err=>res.status(400).json('Error: '+err))
});


//get all seller order
router.route('/getSellerOrders').get((req,res)=>{
    let query = req.query.q;
    order.find({seller:query})
        .then(cart=>res.json(cart))
        .catch(err=>res.status(400).json('Error: '+err))
})


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
            res.send({status:'Order is not available!'});
        }else{
            res.send({status:'Order deleted!'});
        }
     })
     .catch(err => res.send({ status: 'Failed to delete', message: err }));
  })



  router.route('/deleteOrderById').delete(async(req,res)=>{
    // console.log("user", user.data);
    // console.log("length",user.data[0].length);
    let param = req.query.q;
     order.deleteOne(
        {_id:param},
     ).then((data) => {
        if(data.deletedCount==0){
            res.send({status:'Order is not available!'});
        }else{
            res.send({status:'Order deleted!'});
        }
     })
     .catch(err => res.send({ status: 'Failed to delete', message: err }));
  })





module.exports = router;