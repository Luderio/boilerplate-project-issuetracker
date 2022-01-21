'use strict';

const { response } = require("../server");
const mongoose = require('mongoose');

module.exports = function (app) {

  //DATABASE SETUP
  const mySecret = process.env['MONGO_URI'];
  mongoose.connect(mySecret);

  //SCHEMA
  const issueTrackerSchema = mongoose.Schema({
    "issue_title": String,
    "issue_text": String,
    "created_on": String,
    "updated_on": String,
    "created_by": String,
    "assigned_to": String,
    "status_text": String,
    "open": {"type": Boolean, "default": true},
    "project": String
  });

  //MODEL
  const IssueLogs = mongoose.model("IssueLogs", issueTrackerSchema);

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;

      let _id = req.query._id;
      let issue_title = req.query.issue_title;
      let issue_text = req.query.issue_text;
      let created_by = req.query.created_by;
      let assigned_to = req.query.assigned_to;
      let status_text = req.query.status_text;
      let open = req.query.open;
      let created_on = req.query.created_on;
      let updated_on = req.query.updated_on;


      //to dispplay all issue records on '/api/issues//api/issues/apitest/
      IssueLogs.find({"project": project},
      (error, issueRecords) => {
        if (error) return console.log(error);

        let logs = issueRecords;
        let logResult = logs.map(log => {

          let id = log.id;
          let issue_title = log.issue_title;
          let issue_text = log.issue_text;
          let created_on = log.created_on;
          let updated_on = log.updated_on;
          let created_by = log.created_by;
          let assigned_to = log.assigned_to;
          let open = log.open;
          let status_text = log.status_text;

          let issueLogs = {
            "_id": id,
            "issue_title": issue_title,
            "issue_text": issue_text,
            "created_on": created_on,
            "updated_on": updated_on,
            "created_by": created_by,
            "assigned_to": assigned_to,
            "open": open,
            "status_text": status_text
          };

          return issueLogs;
        });

        let responseObject = {};

        //outputs all issue logs from apitest.
        responseObject = logResult;

        if (_id || issue_title || issue_text || created_on || updated_on || created_by || assigned_to || open || status_text) {

          //stores the search queries from the search bar of the browser. 
          let searchQuery = {};

          if (_id) {searchQuery['_id'] = _id;}

          if (issue_title) {searchQuery['issue_title'] = issue_title;}

          if (issue_text) {searchQuery['issue_text'] = issue_text;}

          if (created_on) {searchQuery['created_on'] = created_on;}

          if (updated_on) {searchQuery['updated_on'] = updated_on;}

          if (created_by) {searchQuery['created_by'] = created_by;}

          if (assigned_to) {searchQuery['assigned_to'] = assigned_to;}

          if (open) {
            //condition to handle the ?open=true or ?open=false values from string to boolean value. 
              if (open == "true") {
                open = true;
                }else if (open == "false") {
                open = false;
                }
                searchQuery['open'] = open;
              }

          if (status_text) {searchQuery['status_text'] = status_text;}

          //extrtacts the serach queries by key and value.
          let searchKeys = Object.keys(searchQuery);
          let searchValues = Object.values(searchQuery);

          let logSearch = logResult.filter(logs => {
            let searchKeysItems = searchKeys.map(keys => {
              let searchValuesItems = searchValues.map(values => {
                if (logs[keys].includes(values)) {
                  return logs;
                }
              });
              return searchValuesItems;
            });
            return searchKeysItems;
          });

          console.log(logSearch);

        
        }

        res.json(responseObject);
      });



    })
    
    .post(function (req, res){
      let project = req.params.project;
      let issue_title = req.body.issue_title || res.json({"error": "required field(s) missing"});
      let issue_text = req.body.issue_text || res.json({"error": "required field(s) missing"});
      let created_by = req.body.created_by || res.json({"error": "required field(s) missing"});
      let assigned_to = req.body.assigned_to || '';
      let status_text = req.body.status_text || '';

      const newIssue = new IssueLogs({
        "issue_title": issue_title,
        "issue_text": issue_text,
        "created_on": new Date().toISOString(),
        "updated_on": new Date().toISOString(),
        "created_by": created_by,
        "assigned_to": assigned_to,
        "status_text": status_text,
        "open": true,
        "project": project
      });

      newIssue.save((error, issueData) => {
        if (error) return console.log(error);
        res.json({
          "_id": issueData.id,
          "open": issueData.open,
          "issue_title": issueData.issue_title,
          "issue_text": issueData.issue_text,
          "created_by": issueData.created_by,
          "assigned_to": issueData.assigned_to,
          "status_text": issueData.status_text,
          "created_on": issueData.created_on,
          "updated_on": issueData.updated_on
        });
      });

    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });

    //the code below is used to clear the database. 

    /*IssueLogs.remove({}, (error, records) => {
      if (error) return console.log(error);
      console.log(records)
    });*/
    
};
