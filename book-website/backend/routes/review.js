const router = require('express').Router();
const axios = require('axios');
const review = require('../models/review/review.model.server');
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
    try{
    let bookRes  = await axios.get(url+'book/booksById?q='+req.body.book);
    if(bookRes.data.hasOwnProperty('title')){
    let response = await axios.get(url+'review/findReviewByBookUser',{
       data:{
        book:req.body.book,
        buyer:req.body.buyer
       }
    })
   if(response.data.length==0){
    const body = req.body;
    const newReview = new review(body);
    newReview.save()
      .then(() => res.json('review added!!'))
      .catch(err => res.status(400).json('Error: ' + err))
   }else{
      return res.send({status:"User can only write one review for a book!!"})
   }
}else{
    return res.send({status:"book is not present!!"})
}
}catch(e){
    console.log(e);
}
  });


//edit review
router.route('/editReview').put((req,res)=>{
    const body = req.body;
    review.updateOne(
        { book: body.book, buyer: body.buyer},
        { $set:
           {
            review:body.review
           }
        }
     ).then((data) => {
        if(data.nModified==0){
            res.send({status:'review not found'});
        }else{
            res.send({status:'review updated'});
        }
        })
     .catch(err => res.send({ status: 'failed to update review', message: err }));
})




  //to find reviews by book
router.route('/findReviewByBook').get((req, res) => {
    let query = req.query.q;   
    review.find({book:query})
        .then(review=>{
            res.json(review);})
      .catch(err => res.status(400).json('Error: ' + err))
  });



  
  //to find reviews by book and user
router.route('/findReviewByBookUser').get((req, res) => {
    console.log("here",req.body)
    let buyer = req.body.buyer;
    let book = req.body.book; 
    review.find({book:book, buyer:buyer})
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
