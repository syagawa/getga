var google = require('googleapis');
var analytics = google.analyticsreporting('v4');

var util = require('util');

var config = require('./settings/config.js');

var credential = config.credential;
var viewId = config.viewId;
var startDate = config.startDate;
var endDate = config.endDate;
var dimensions = config.dimensions;

var jwtClient = new google.auth.JWT(credential.client_email, null, credential.private_key, ["https://www.googleapis.com/auth/analytics.readonly"], null);

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
            "dimensions": dimensions
          }
        ]
      },
      auth: jwtClient
    },
    function(error, response){
      if(error){
        console.log(error);
      }
      console.log( util.inspect(response, false, null) );
    }
  );
});