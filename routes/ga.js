const express = require('express');
const { GoogleApis } = require('googleapis');
const util = require('util');
const config = require('../settings/config.js');

const router = express.Router();
const google = new GoogleApis();
const analytics = google.analyticsreporting('v4');

const credential = config.credential;
const viewId = config.viewId;
const startDate = config.startDate;
const endDate = config.endDate;
const dimensions = config.dimensions;
const orderBys = config.orderBys;

const fs = require("fs");

const jwtClient = new google.auth.JWT(credential.client_email, null, credential.private_key, ["https://www.googleapis.com/auth/analytics.readonly"], null);

let g_obj;

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
      g_obj = response.data;
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
  const json = JSON.stringify(g_obj);
  try {
    fs.writeFile("./a.json", json);
    return true;
  } catch(err) {
    return false;
  }
});

module.exports = router;
