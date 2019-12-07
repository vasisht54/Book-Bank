const router = require('express').Router();
const axios = require('axios');

const book = require('../models/book/book.model.server');
require('dotenv').config();
let url = process.env.URL;

//get all books
router.route('/getAllBooks').get((req,res)=>{
    book.find()
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json('Error: '+err))
});


//get all books by seller
router.route('/booksBySeller').get((req,res)=>{
    let query = req.query.q;
    console.log(query);
    book.find({seller:query})
    .then(books=>res.json(books))
    .catch(err=>res.status(400).json('Error: '+err))
})

//add book
router.route('/addBook').post(async(req,res)=>{
    const body = req.body;
    let user = await axios.get(url+"user/username?q="+body.seller);

    if(user.data.length==1){
    body.seller = user.data[0]._id;
    const newBook = new book(body);
    newBook.save()
        .then(()=>res.json({status:'Book added!!'}))
        .catch(err=>res.status(400).json('Error: '+err))
    }else{
        res.send({status:'failed to find seller'});
    }

});

//update book
router.route('/updateBook').put(async(req,res)=>{
    let body = req.body
    let user = await axios.get(url+"user/username?q="+body.seller);
    if(user.data.length==1){
    body.seller = user.data[0]._id; 
     book.updateOne(
    { title: body.title},
    { $set:
       {
    publisher : body.publisher,
    publishedDate: body.publishedDate,
    description: body.description,
    pagecount: body.pagecount,
    categories:body.categories,
    price: body.price,  
       }
    }
 ) .then((data) => {
    if(data.nModified==0){
        res.send({status:'book not found'});
    }else{
        res.send({status:'book updated'});
    }
    })
 .catch(err => res.send({ status: 'updated book', message: err }));
}else{
    res.send({status:'failed to find seller'});
}
});


//delete book by title and user id
router.route('/deleteBook').delete(async(req,res)=>{
    let user = await axios.get(url+"user/username?q="+req.body.seller);
    // console.log("user", user.data);
    // console.log("length",user.data[0].length);
    if(user.data.length==1){   
        // console.log("here");     
    req.body.seller = user.data[0]._id; 

     book.deleteOne(
        { title: req.body.title, seller:req.body.seller},
     ) .then((data) => {
        if(data.deletedCount==0){
            res.send({status:'book not found'});
        }else{
            res.send({status:'book deleted'});
        }
     })
     .catch(err => res.send({ status: 'failed to delete book', message: err }));
    }else{
        res.send({status:'failed to find seller'});
    }
  })


//delete ALLbook by userId
  router.route('/deleteBookByUserId').delete(async(req,res)=>{
    // console.log("user", user.data);
    // console.log("length",user.data[0].length);
    let query = req.query.q;    
     book.deleteMany(
        {seller:query},
     ).then((data) => {
        if(data.deletedCount==0){
            res.send({status:'book not found'});
        }else{
            res.send({status:'books deleted'});
        }
     })
     .catch(err => res.send({ status: 'failed to delete books', message: err }));

  })






  router.route('/search').get((req,res)=>{
      let query = req.query.q;
     book.find({$or:[{title: {"$regex": query,"$options":"i"}},
     {authors:{"$elemMatch":{"$regex":query,"$options":"i"}}},{categories:{"$elemMatch":{"$regex":query,"$options":"i"}}}]})
      .then(books=>res.json(books))
      .catch(err=>res.status(400).json('Error: '+err));
  });


module.exports = router;