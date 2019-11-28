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

module.exports = router;