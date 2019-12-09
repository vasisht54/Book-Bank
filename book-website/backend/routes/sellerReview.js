const router = require('express').Router();
const axios = require('axios');
const review = require('../models/sellerReview/sellerReview.model.server');
require('dotenv').config();
let url = process.env.URL;


//get all accessories
router.route('/getAllReviews').get((req,res)=>{
    review.find()
        .then(review=>res.json(review))
        .catch(err=>res.status(400).json('Error: '+err))
});



//to save new review
router.route('/addReview').post(async(req, res) => {
    let body = req.body;
    let sellerRes  = await axios.get(url+'user/username?q='+req.body.seller);
    let buyerRes  = await axios.get(url+'user/username?q='+ req.body.buyer);

    try{
    if(buyerRes.data[0].usertype!= 'buyer'){
        return res.send({status: "Only buyer can review the book!!"});
    }

    if(sellerRes.data[0].usertype!= 'seller'){
        return res.send({status: "Only seller can be reviewed!!"});
    }

   let resCheck = await review.find({buyer:body.buyer, seller:body.seller});
    if(resCheck.length>0){
       return res.send({status:"Buyer can review the seller only once"})
    }
    const newReview = new review(body);
    newReview.save()
    .then(() => res.send({status:"review added!!"}))
    .catch(err => res.status(400).json('Error: ' + err))

}catch(e){
    res.send({status:"Wrong data entry"})
 }

  });


  //to find reviews by book
router.route('/findReviewBySeller').get((req, res) => {
    let query = req.query.q;   
    review.find({seller:query})
        .then(review=>{
            res.json(review);})
      .catch(err => res.status(400).json('Error: ' + err))
  });



  
  //to find reviews by book and user
router.route('/findReviewBySeller').get((req, res) => {
    let seller = req.body.seller;
    let buyer = req.body.buyer; 
    review.find({seller:seller, buyer:buyer})
        .then(review=>{ 
        res.json(review);})
      .catch(err => res.status(400).json('Error: ' + err))
  });


//to delete the review
router.route('/deleteReview').delete(async(req,res)=>{
    // console.log("user", user.data);
    // console.log("length",user.data[0].length);
    let buyer = req.body.buyer;
    let book = req.body.book;
     review.deleteOne(
        {buyer:buyer,book:book},
     ).then((data) => {
        if(data.deletedCount==0){
            res.send({status:'this book has no reviews by user'});
        }else{
            res.send({status:'reviews deleted'});
        }
     })
     .catch(err => res.send({ status: 'failed to delete reviews', message: err }));

  });


  //to delete the review
router.route('/deleteReviewById').delete(async(req,res)=>{
    let query = req.query.q;  
    
     review.deleteOne(
        {_id:query},
     ).then((data) => {
        if(data.deletedCount==0){
            res.send({status:'this book has no reviews by user'});
        }else{
            res.send({status:'reviews deleted'});
        }
     })
     .catch(err => res.send({ status: 'failed to delete reviews', message: err }));

  })



  module.exports = router;
