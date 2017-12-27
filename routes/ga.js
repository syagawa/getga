var express = require('express');
var router = express.Router();



var google = require('googleapis');
var analytics = google.analyticsreporting('v4');

var util = require('util');

var config = require('../settings/config.js');

var credential = config.credential;
var viewId = config.viewId;
var startDate = config.startDate;
var endDate = config.endDate;
var dimensions = config.dimensions;
var orderBys = config.orderBys;

var jwtClient = new google.auth.JWT(credential.client_email, null, credential.private_key, ["https://www.googleapis.com/auth/analytics.readonly"], null);

var g_obj;

jwtClient.authorize(function(error, tokens){
  if(error){
    console.log(error);
    return;
  }
  analytics.reports.batchGet(
    {
      resource: {
        "reportRequests": [
          {
            "dateRanges": [
              {
                "startDate": startDate,
                "endDate": endDate
              }
            ],
            "viewId": viewId,
            "dimensions": dimensions,
            "orderBys": orderBys
          }
        ]
      },
      auth: jwtClient
    },
    function(error, response){
      if(error){
        console.log(error);
      }
      // console.log( util.inspect(response, false, null) );
      g_obj = response;
    }
  );
});


/* GET ga listing. */
router.get('/', function(req, res, next) {
  res.render(
    'ga',
    {
      title: 'Google Analytics',
      app_name: 'app_ga',
      json_obj: g_obj
    }
  );
});

module.exports = router;
