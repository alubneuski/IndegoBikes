var express = require('express');
var router = express.Router();
var aggCtrl = require('../controllers/aggregationController');

var findCollection = function (req, res, startingDate) {
  var db = req.db;
  var collection = db.get('features');
  var isoDateString = new Date(startingDate);
  collection.find({
     "properties.timeStamp" : { $gt : isoDateString }
  },function(e,docs){
      console.error(e);
      res.json('Results', {
          "Results" : docs
      });
  });
}

var findCollectionWithId = function (req, res, startingDate, kioskId) {
  var db = req.db;
  var collection = db.get('features');
  var startingDate = new Date(startingDate);
  collection.find({
     "properties.timeStamp" : { "$gte": startingDate },
     "properties.kioskId" : kioskId
  },{},function(e,docs){
      console.error(e);
      var aggrCtrl = new aggCtrl(docs);
      console.info(aggrCtrl.getMetaData(docs));
      res.json('Results', {
          "meta"    : aggrCtrl.getMetaData(docs),
          "Results" : docs
      });
  });
}

var findCollectionZeroBikes = function (req, res, startingDate, kioskId) {
  var db = req.db;
  var collection = db.get('features');
  var startingDate = new Date(startingDate);
  collection.find({
     "properties.timeStamp" : { "$gte": startingDate },
     "properties.kioskId" : kioskId,
     "properties.bikesAvailable" : 0
  },{},function(e,docs){
    if (e !== null) {
      console.error(e);
    }
      res.json('Results', {
          "Results" : docs
      });
  });
}

var findCollectionZeroBikes = function (req, res, startingDate) {
  var db = req.db;
  var collection = db.get('features');
  var startingDate = new Date(startingDate);
  collection.find({
     "properties.timeStamp" : { "$gte": startingDate },
     "properties.bikesAvailable" : 0
  },{},function(e,docs){
      console.error(e);
      res.json('Results', {
          "Results" : docs
      });
  });
}

/* GET Userlist page. */
router.get('/api/yesterday', function(req, res) {
    findCollection(req, res, new Date(new Date().setDate(new Date().getDate()-1)));
});

router.get('/api/yesterday/:kioskId', function(req, res) {
  console.info(new Date(new Date().setDate(new Date().getDate()-1)));
  findCollectionWithId(req, res, new Date(new Date().setDate(new Date().getDate()-1)), parseInt(req.params.kioskId));
});

/* GET bike list for the past week page. */
router.get('/api/lastWeek', function(req, res) {
  findCollection(req, res, new Date(new Date().setDate(new Date().getDate()-7)));
});

router.get('/api/lastWeek/:kioskId', function(req,res) {
  findCollectionWithId(req, res, new Date(new Date().setDate(new Date().getDate()-7)), parseInt(req.params.kioskId));
});

router.get('/api/lastWeekBikesNotAvailable/:kioskId', function(req,res) {
  findCollectionZeroBikes(req, res, new Date(new Date().setDate(new Date().getDate()-7)), parseInt(req.params.kioskId));
});

router.get('/api/lastWeekBikesNotAvailable', function(req,res) {
  findCollectionZeroBikes(req, res, new Date(new Date().setDate(new Date().getDate()-7)));
});

module.exports = router;
