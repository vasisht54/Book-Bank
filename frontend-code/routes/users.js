var express = require('express');
var axios = require('axios');
var router = express.Router();
const userModel = require('../models/user');
var assert = require('assert');
/* GET user listing. */
router.get('/', function (req, res) {
  console.log(req.user);
  if (!req.user) {
    res.send('No auth');
  }
  userModel.findById(req.user._id).then(data => res.send(data));
});

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
router.post('/updateUser', (req, res, next) => {
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
    res.render('crudUsersTest', {users : resultArray, user : req.user});
      });
    
})

router.get('/get-books', (req, res, next) => {
  
  console.log('Get Book');
  console.log("User", req.user._id);
  var resultArray = [];
  var cursor;

  axios.get('http://localhost:5000/book/booksBySeller?q='+req.user._id)
  .then(function (res) {
    cursor = res.data;
    console.log(cursor);
    cursor.forEach(function(doc,err) {
        // assert(null,err);
        console.log('doc');
          console.log(doc.authors[0]);
        resultArray.push(doc);
    }) })
    .then (
    function() {
    // console.log("SS", resultArray[3].title);
    res.render('crudBooksBySeller', {book : resultArray, user : req.user});
      });
    
})

router.post('/delete', (req, res, next) => {
  console.log(req.body.username);
  let user = {'username': req.body.username};
  console.log(user.username);
  console.log('Delete Data');
  console.log(user);
  axios.delete('http://localhost:5000/user/deleteUser', { data : user })
  .then(() => res.send('If user exists, then deleted'))
  .catch(err =>  res.send({ status: 'failed', message: err }));
  
})

//update user profile
router.put('/updateUser1', (req, res, next) => {
  var resultArray = [];
  console.log("hi admin");
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
  .then(() => res.send('If username exists, then updated'))
  .catch(err =>  res.send({ status: 'failed', message: err }));


})

router.get('/viewCart', (req, res, next) => {
  
  // console.log('Get Cart');
  // console.log("User", req.user.username);
  var resultArray = [];
  var cursor;

  axios.get('http://localhost:5000/cart/getUserCart?q='+req.user.username)
  .then(function (res) {
    cursor = res.data;
    console.log("Cursor",cursor);
    cursor.forEach(function(doc,err) {
        // assert(null,err);
      //   console.log('doc');
      //     console.log(doc.authors[0]);
        resultArray.push(doc);
    }) })
    .then (
    function() {
    // console.log("SS", resultArray[3].title);
    res.render('manageCart', {cart: resultArray, user : req.user});
      });
    
});

//
router.get('/viewOrder', (req, res, next) => {
  
  console.log("User", req.user.username);
  var resultArray = [];
  var cursor;

  axios.get('http://localhost:5000/order/getUserOrders?q='+req.user.username)
  .then(function (res) {
    cursor = res.data;
    console.log("Cursor",cursor);
    cursor.forEach(function(doc,err) {
        // assert(null,err);
      //   console.log('doc');
      //     console.log(doc.authors[0]);
        resultArray.push(doc);
    }) })
    .then (
    function() {
    // console.log("SS", resultArray[3].title);
    res.render('manageOrder', {order: resultArray, user : req.user});
      });
    
});

router.get('/viewOrderSeller', (req, res, next) => {
  
  console.log("User", req.user.username);
  var resultArray = [];
  var cursor;

  axios.get('http://localhost:5000/order/getSellerOrders?q='+req.user.username)
  .then(function (res) {
    cursor = res.data;
    console.log("Cursor",cursor);
    cursor.forEach(function(doc,err) {
        // assert(null,err);
      //   console.log('doc');
      //     console.log(doc.authors[0]);
        resultArray.push(doc);
    }) })
    .then (
    function() {
    // console.log("SS", resultArray[3].title);
    res.render('manageOrderSeller', {order: resultArray, user : req.user});
      });
    
});


router.get('/addToOrders', (req, res, next) => {
  
  // console.log('Get Cart');
  // console.log("User", req.user.username);
  var resultArray = [];
  var cursor;

  axios.get('http://localhost:5000/cart/getUserCart?q='+req.user.username)
  .then(function (res) {
    cursor = res.data;
    console.log("Cursor",cursor);
    cursor.forEach(function(doc,err) {
      console.log("SS", doc);    
      resultArray.push(doc);
    }) })
    .then (
    function() {
    console.log("SS1", resultArray);
      }).then(
        resultArray.forEach(
          (ele, err)
        )
      )
      ;
    
});

module.exports = router;




