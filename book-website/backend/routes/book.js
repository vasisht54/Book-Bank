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


router.route('/updateBook').put((req,res)=>{
    let body = req.body
   book.updateOne(
    { title: body.title},
    { $set:
       {
    authors:body.authors,
    publisher : body.publisher,
    publishedDate: body.publishedDate,
    description: body.description,
    industryIdentifiers: body.industryIdentifiers,
    pagecount: body.pagecount,
    categories:body.categories,
    image : body.image,
    language: body.language,
    price: body.price,   
       }
    }
 ) .then(() => res.send('book updated'))
 .catch(err => res.send({ status: 'updated book', message: err }));
});


router.route('/deleteBook').delete((req,res)=>{
     book.deleteOne(
      { title: req.body.title},
   ) .then(() => res.send('book deleted'))
   .catch(err => res.send({ status: 'failed to delete book', message: err }));
  
  })


//   router.route('/search').get((req,res)=>{
//       let query = req.query.q;

//     //   book.find()
//       .then(books=>res.json(books))
//       .catch(err=>res.status(400).json('Error: '+err))


//   })

module.exports = router;