var express = require('express');
var router = express.Router();

/* GET Userlist page. */
router.get('/yesterday', function(req, res) {
    var db = req.db;
    var date = Date(Date.now());
    var todayPeriod = new Date(new Date().setDate(new Date().getDate()-1));
    console.info(todayPeriod.toString());
    var collection = db.get('features');
    collection.find({
       "properties.timeStamp" : { "$gte": todayPeriod.toString() }
    },{},function(e,docs){
        console.error(e);
        res.json('AllDataForToday', {
            "showAlldataForToday" : docs
        });
    });
});

router.get('/todayAgregated', function(req, res) {
    var db = req.db;
    var date = Date();
    console.info("getting info for Today at " + date);
    var collection = db.get('features');
    collection.find({
        "properties.timeStamp" : {"$gte": new Date(new Date().setDate(new Date().getDate()-1)).toString()}
    },{},function(e,docs){
        res.json('AllDataForToday', {
            "showAlldataForToday" : docs
        });
    });
});

/* GET bike list for the past week page. */
router.get('/allLastWeekAgregated', function(req, res) {
    var db = req.db;
    var collection = db.get('features');
    collection.find({
      "properties.timeStamp" : {"$gte": new Date(new Date().setDate(new Date().getDate()-7)).toString()}
    },{},function(e,docs){
        res.json('allLastWeekAgregated', {
            "AllLastWeekAgregated" : docs
        });
    });
});

router.get('/getStationLastWeek/:kioskId', function(req,res) {
    var db = req.db;
    var collection = db.get('features');
    collection.find({
      "properties.timeStamp" :  {"$gte": new Date(new Date().setDate(new Date().getDate()-7)).toString()},
      "properties.kioskId" : parseInt(req.params.kioskId)
    },{},function(e,docs){
      res.json('showStationsDataLastWeek', {
        "StationsDataLastWeek" : docs
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
