var express = require('express');
var router = express.Router();

/* GET Userlist page. */
router.get('/showAllDataForToday', function(req, res) {
    var db = req.db;
    var collection = db.get('features');
    collection.find({},{},function(e,docs){
        res.json('showAllDataForToday', {
            "showAlldataForToday" : docs
        });
    });
});

// router.get('/adduser', function(req, res) {
//     res.jsonp('adduser', { title : "New User Add" });
// });

/* POST to Add User Service */
// router.post('/adduser', function(req, res) {
//
//     // Set our internal DB variable
//     var db = req.db;
//
//     // Get our form values. These rely on the "name" attributes
//     var userName = req.body.username;
//     var userEmail = req.body.useremail;
//
//     // Set our collection
//     var collection = db.get('usercollection');
//     var featuresCollection = db.get('features');
//
//     // Submit to the DB
//     collection.insert({
//         "username" : userName,
//         "email" : userEmail
//     }, function (err, doc) {
//         if (err) {
//             // If it failed, return error
//             res.send("There was a problem with adding the information to the database.");
//         }
//         else {
//             // And forward to success page
//             res.redirect("userlist");
//         }
//     });
// });

// router.get('update',function(req, res) {
//     // get our internal db variable
//     var db = req.db;
//     var userName = req.body.username;
//     var userEmail = req.body.useremail;
//
// });

module.exports = router;
