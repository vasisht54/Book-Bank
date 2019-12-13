
var express = require('express');
var axios = require('axios');
var router = express.Router();

router.post('/search', (req, res) => {
    console.log("SS", req.user);
    if(req.body.searchText.trim() === '' ) {
        res.render('crudBooksByAdmin', { book: resultArray, user: req.user });
    }
    var resultArray = [];
    var cursor;
    axios.get("http://localhost:5000/book/search?q=" + req.body.searchText)
        .then(function (res) {
            //console.log('response::', res.data);

            cursor = res.data;
            // console.log(cursor);
            cursor.forEach(function (doc, err) {
                console.log("DOC",doc.seller);
                resultArray.push(doc);
            })

        })
        .then(
            function () {
                // console.log("Here", resultArray[0].title);

                res.render('crudBooksByAdmin', { book: resultArray, user: req.user });
            }
        )
});

router.post('/bookPage', (req, res) => {
    console.log("BP1", req.body.user);
    var q = req.body.user;
    var user1;
    axios.get('http://localhost:5000/user/username', q)
        .then((user) => user1 = user);
    console.log("SS", user1);
    res.render('bookPage', { book: req.body, user: req.user })
});

router.post('/get-reviews', async(req, res) => {
    var reviewsArray = [];
    var cursor;
    let bookRes;

    try {
    //Getting book by title to fetch its ID
    //console.log(req.body.bookForReviews);
    bookRes = await axios.get('http://localhost:5000/book/booksByTitle?q='+ req.body.bookForReviews);
    let revRes = await axios.get('http://localhost:5000/review/findReviewByBook?q=' + req.body.bookForReviews);
        cursor = revRes.data;
        cursor.forEach(function (doc, err) {
         // console.log(doc.title);
            reviewsArray.push(doc);
        })
        //console.log(reviewsArray[0].review);
    }
    catch(e) {
        console.log(e); 
    }
    //console.log(bookRes.data[0].title);
    res.render('crudReviews', {reviews: reviewsArray, user: req.user, book: bookRes.data[0]});
});

router.post('/get-reviews-for-buyer', async(req, res) => {
    var reviewsArray = [];
    var cursor;
    let bookRes;

    try {
    //console.log("Button press = " + req.body.bookTitle);
    bookRes = await axios.get('http://localhost:5000/book/booksByTitle?q='+ req.body.bookTitle);
    let revRes = await axios.get('http://localhost:5000/review/findReviewByBook?q=' + req.body.bookTitle);
        cursor = revRes.data;
        cursor.forEach(function (doc, err) {
          //console.log(doc.title);
            reviewsArray.push(doc);
        })
    }
    catch(e) {
        console.log(e); 
    }
    res.render('bookReviews', {reviews: reviewsArray, user: req.user, book: bookRes.data[0]});
});

router.post('/get-seller-reviews', async(req, res) => {
    var reviewsArray = [];
    var cursor;
    let bookRes;
    var userRes;
    var sellerId;
    
    try {
    //console.log("Button press = " + req.body.bookTitle);
    bookRes = await axios.get('http://localhost:5000/book/booksByTitle?q='+ req.body.bookTitle);
    console.log("Seller id=" + bookRes.data[0].seller);
    userRes = await axios.get('http://localhost:5000/user/id?q=' + bookRes.data[0].seller);
    console.log(userRes.data[0]);
    console.log("Seller username=" + userRes.data[0].username);
    let revRes = await axios.get('http://localhost:5000/sellerReview/findReviewBySeller?q=' + userRes.data[0].username);
        cursor = revRes.data;
        cursor.forEach(function (doc, err) {
          //console.log(doc.title);
            reviewsArray.push(doc);
        })
    }
    catch(e) {
        console.log(e); 
    }
    res.render('crudSellerReviewsByBuyer', {reviews: reviewsArray, user: req.user, seller: userRes.data[0]});
});


/*
router.post('/register', (req, res) => {
    let user = req.body;
    user.address = {
        'address': user.address,
        'pincode': user.pincode,
        'city': user.city,
        'state': user.state,
        'country': user.country
    };
    if (req.body.usertype == "seller") {
        user.usertype = "seller";
        user.seller = {
            'sellerAgreement': true
        }
    } else if (req.body.usertype == "buyer") {
        user.usertype = "buyer";
        user.buyer = {
            'buyerAgreement': true
        }
    }

    // const newUser = new userModel(user);

    console.log(user);

    axios.post('http://localhost:5000/user/register', user)
        .then(() => res.send('user saved'))
        .catch(err => res.send({ status: 'failed', message: err }));

    // console.log(newUser);

    // newUser.save()
    //   .then(() => res.send('user saved'))
    //   .catch(err => res.send({ status: 'failed', message: err }));


});


//update user profile
router.put('/updateUser', (req, res, next) => {
    console.log("hi");
    //console.log(req.body.user);
    console.log(req.body.first_name);
    console.log(req.body.username);
    let user = req.body;
    // user.address = {
    //   'address': user.address,
    //   'pincode': user.pincode,
    //   'city': user.city,
    //   'state': user.state,
    //   'country': user.country
    // };
    user = {
        'username': req.body.username,
        'first_name': req.body.first_name,
        'last_name': req.body.last_name,
        'password': req.body.password,
        'address': {
            'address': req.body.address,
            'pincode': req.body.pincode,
            'city': req.body.city,
            'state': req.body.state,
            'country': req.body.country
        }

    }

    console.log(user);

    axios.put('http://localhost:5000/user/updateUser', user)
        .then(() => res.jsonp('user updated'))
        .catch(err => res.send({ status: 'failed', message: err }))
        .then(res.render('updateUser', { user: user }));

});

router.get('/get-data', (req, res, next) => {

    console.log('Get Data');
    var resultArray = [];
    var cursor;
    axios.get('http://localhost:5000/user/')
        .then(function (res) {
            cursor = res.data;
            console.log(cursor);
            cursor.forEach(function(doc,err) {
                // assert(null,err);
                console.log('doc');
                console.log(doc.username);
                resultArray.push(doc);
            }) })
        .then (
            function() {
                console.log("SS", resultArray[3].first_name);
                res.render('crudUsersTest', {user : resultArray});
            });

    //  function() {
    //     console.log("Result Array");
    //     console.log(resultArray[4].username);
    //     res.render('\crudUsersTest', {items : resultArray});
    // });





    //console.log(cursor);
});

router.post('/delete', (req, res, next) => {
    console.log(req.body.username);
    let user = {'username': req.body.username};
    console.log(user.username);
    console.log('Delete Data');
    console.log(user);
    axios.delete('http://localhost:5000/user/deleteUser', { data : user })
        .then(() => res.send('If user exists, then deleted'))
        .catch(err =>  res.send({ status: 'failed', message: err }));

});
*/

//Get book page
router.get('/', (req, res, next) => {
    //use axios to get book data here.
    const bookId = req.params.id;
    const url = req.url;
    const vars = url.split("?");
    var id = vars[1];
    id = id.substring(3);
    console.log(id);
    axios.get('http://localhost:5000/book/booksByID?q=' + id)
        .then(function (res) {
            book = res.data;
            console.log("BOOK", book);
            

        })
        .then (
            function() {
            
                res.render('bookPage', { user: req.user, book: book });
              });
        // .then(
        //     function () {
                
        //     })
            

});

module.exports = router;




