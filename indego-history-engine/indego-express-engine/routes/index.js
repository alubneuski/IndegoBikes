var express = require('express');
var router = express.Router();

/* GET Userlist page. */
router.get('/today', function(req, res) {
    var db = req.db;
    var date = Date(Date.now());
    var test = ({});
    console.info("TEST length " + Object.keys(test).length);
    console.info("getting info for Today at " + date);
    var collection = db.get('features');
    collection.find({
        "properties.dataStamp" : {"$gte": new Date(new Date().setDate(new Date().getDate()-1))}
    },{},function(e,docs){
        res.json('showAllDataForToday', {
            "showAlldataForToday" : docs
        });
    });
});

router.get('/todayAgregated', function(req, res) {
    var db = req.db;
    var date = Date(Date.now());
    console.info("getting info for Today at " + date);
    var collection = db.get('features');
    collection.find({
        "properties.dataStamp" : {"$gte": new Date(new Date().setDate(new Date().getDate()-1))}
    },{},function(e,docs){
        res.json('showAllDataForToday', {
            "showAlldataForToday" : docs
        });
    });
});

/* GET bike list for the past week page. */
router.get('/allLastWeekAgregated', function(req, res) {
    var db = req.db;
    var collection = db.get('features');
    collection.find({
      "properties.dataStamp" : {"$gte": new Date(new Date().setDate(new Date().getDate()-5))}
    },{},function(e,docs){
        res.json('allLastWeekAgregated', {
            "showAllLastWeekAgregated" : docs
        });
    });
});

router.get('/getStationLastWeek/:kioskId', function(req,res) {
    var db = req.db;
    var collection = db.get('features');
    collection.find({
      "properties.dataStamp" :  {"$gte": new Date(new Date().setDate(new Date().getDate()-5))},
      "properties.kioskId" : parseInt(req.params.kioskId)
    },{},function(e,docs){
      res.json('showStationsDataLastWeek', {
        "showStationsDataLastWeek" : docs
      })
    })
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
