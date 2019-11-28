const router = require('express').Router();

const book = require('../models/book/book.model.server');

//get all books
router.route('/getAllBooks').get((req,res)=>{
    book.find()
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json('Error: '+err))
});


//add book
router.route('/addBook').post((req,res)=>{
    const body = req.body;
    const newBook = new book(body);

    newBook.save()
        .then(()=>res.json('Book added!!'))
        .catch(err=>res.status(400).json('Error: '+err))
});


router.route('/deleteBook').delete((req,res)=>{
    console.log(req.body.user);
     book.deleteOne(
      { title: req.body.title},
   ) .then(() => res.send('book deleted'))
   .catch(err => res.send({ status: 'failed to delete book', message: err }));
  
  })

module.exports = router;