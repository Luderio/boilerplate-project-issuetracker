'use strict';

const { response } = require("../server");
const mongoose = require('mongoose');

module.exports = function (app) {

  //DATABASE SETUP
  const mySecret = process.env['MONGO_URI'];
  mongoose.connect(mySecret);

  //SCHEMA
  const issueTrackerSchema = mongoose.Schema({
    "issueTitle": String,
    "issueText": String,
    "createdOn": String,
    "updatedOn": String,
    "createdBy": String,
    "assignedTo": String,
    "statusText": String,
    "open": {"type": Boolean, "default": true},
    "project": String
  });

  //MODEL
  const IssueLogs = mongoose.model("IssueLogs", issueTrackerSchema);

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      IssueLogs.find({"project": project}, (error, issueRecords) => {
        if (error) return console.log(error);
        res.send([issueRecords]);//
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
        "issueTitle": issue_title,
        "issueText": issue_text,
        "createdOn": new Date().toISOString(),
        "updatedOn": new Date().toISOString(),
        "createdBy": created_by,
        "assignedTo": assigned_to,
        "statusText": status_text,
        "open": true,
        "project": project
      });

      newIssue.save((error, issueData) => {
        if (error) return console.log(error);
        res.json({
          "_id": issueData.id,
          "open": issueData.open,
          "issue_title": issueData.issueTitle,
          "issue_text": issueData.issueText,
          "created_by": issueData.createdBy,
          "assigned_to": issueData.assignedTo,
          "status_text": issueData.statusText,
          "created_on": issueData.createdOn,
          "updated_on": issueData.updatedOn
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
