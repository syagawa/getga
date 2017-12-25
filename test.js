var google = require('googleapis');
var analytics = google.analyticsreporting('v4');

var credential = require('./settings/analytics-reporting-2e08f0451d6d.json');

var viewId = '166037574';

var startDate = '2017-12-01';
var endDate = '2017-12-20';

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
            "dimensions": [
              {
                "name": "ga:pagePath"
              }
            ]
          }
        ]
      },
      auth: jwtClient
    },
    function(error, response){
      if(error){
        console.log(error);
      }
      console.log(response)
    }
  );
});