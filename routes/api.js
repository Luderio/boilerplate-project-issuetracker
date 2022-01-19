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
      let id = req.query.id;
      let issue_title = req.query.issue_title;
      let issue_text = req.query.issue_text;
      let created_by = req.query.created_by;
      let assigned_to = req.query.assigned_to;
      let status_text = req.query.status_text;


      //to dispplay all issue records on '/api/issues//api/issues/apitest/
      IssueLogs.find({"project": project},
      (error, issueRecords) => {
        if (error) return console.log(error);

        let responseObject = {};

        responseObject = issueRecords;
        
        if (id || issue_title || issue_text || created_by || assigned_to || status_text) {
          
          let issueLogSearch = issueRecords.filter(logs => {
            return logs == id || logs == issue_title || logs == issue_text || logs == created_by || logs == assigned_to || logs == status_text;
          });

          responseObject = issueLogSearch;

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
