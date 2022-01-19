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
      
    })
    
    .post(function (req, res){
      let project = req.params.project;
      let issue_title = req.body.issue_title;
      let issue_text = req.body.issue_text;
      let created_by = req.body.created_by;
      let assigned_to = req.body.assigned_to;
      let status_text = req.body.status_text;

      const newIssue = new IssueLogs({
        "issue_title": issue_title,
        "issue_text": issue_text,
        "created_on": new Date().toISOString(),
        "updated_on": new Date().toISOString(),
        "created_by": created_by,
        "assigned_to": assigned_to || '',
        "status_text": status_text || '',
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
