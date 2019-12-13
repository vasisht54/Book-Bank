var express = require('express');
var axios = require('axios');
var router = express.Router();

router.get('/viewCart', (req, res, next) => {
  
    console.log('Get Cart');
    console.log("User", req.body.username);
    var resultArray = [];
    var cursor;
  
    axios.get('http://localhost:5000/cart/getUserCart?q='+req.user._id)
    .then(function (res) {
      cursor = res.data;
    //   console.log(cursor);
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
  

module.exports = router;