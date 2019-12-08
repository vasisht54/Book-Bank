const router = require('express').Router();
const axios = require('axios');

const cart = require('../models/order/order.model.server');

require('dotenv').config();
let url = process.env.URL;


//get all user cart
router.route('/getUserOrders').get((req,res)=>{
    let query = req.query.q;
    cart.find({buyer:query})
        .then(cart=>res.json(cart))
        .catch(err=>res.status(400).json('Error: '+err))
});



//add to cart
router.route('/addToCart').post((req,res)=>{
    let body = req.body;
    const newCart = new cart(body);
    newCart.save()
        .then(()=>res.json({status:'Book added to cart!!'}))
        .catch(err=>res.status(400).json('Error: '+err))
});


//to delete the books from cart
router.route('/deleteBooksFromCart').delete(async(req,res)=>{
    // console.log("user", user.data);
    // console.log("length",user.data[0].length);
    let buyer = req.body.buyer;
    let book = req.body.book;
     cart.deleteOne(
        {buyer:buyer,book:book},
     ).then((data) => {
        if(data.deletedCount==0){
            res.send({status:'this book is not in cart'});
        }else{
            res.send({status:'book deleted from cart'});
        }
     })
     .catch(err => res.send({ status: 'failed to delete book from cart', message: err }));

  })


  //to delete the all items from cart of a user
router.route('/clearCart').delete(async(req,res)=>{
    let query = req.query.q;
     cart.deleteMany(
        {buyer:query},
     ).then((data) => {
        if(data.deletedCount==0){
            res.send({status:'Cart is empty for the user'});
        }else{
            res.send({status:'cart cleared for user'});
        }
     })
     .catch(err => res.send({ status: 'failed to clear cart of the user', message: err }));

  })


module.exports = router;